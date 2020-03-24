'use strict';

const { kebabCaseIt } = require('case-it');
const { mkdir, writeFile } = require('fs').promises;
const got = require('got');
const path = require('path');
const promiseAllProps = require('promise-all-props');

const {
  elem,
  equals,
  filter,
  justs,
  map,
  prop,
  props,
  pipe,
  reject,
} = require('sanctuary');

const paperApi = require('./paper-api.js');

const dropboxPaperApi = apiToken => got.extend({
  method: 'POST',
  baseUrl: 'https://api.dropbox.com/2/paper/',
  json: true,
  headers: {
    Authorization: `Bearer ${apiToken}`,
  },
});

const jsonToFrontmatter = json => `---\n${ JSON.stringify(json, null, 2) }\n---\n`;

const isDeletedDoc = pipe([
  props(['metaData', 'status', '.tag']),
  equals('deleted'),
]);

const saveDocsLocally = docs => Promise.all(docs.map(doc =>
  mkdir(doc.directory, { recursive: true })
    .then(() => writeFile(
      doc.location,
      `${jsonToFrontmatter(doc.metaData)}${doc.content.body}`
    ))
));

const formatDocsMetaData = docs => docs.map(
  ({ id, folders, content: { metaData }, location }) => ({
    id,
    folders,
    content: {
      metaData,
    },
    location,
  })
);

module.exports = ({ apiToken, directoryId }) => {
  const {
    fetchAllDocIds,
    fetchDocFolders,
    fetchDocContent,
    fetchDocMetaData,
    foldersToPath,
  } = paperApi(dropboxPaperApi(apiToken));

  const appendMetaData = docs => Promise.all(
    docs.map(([ id, folders ]) => promiseAllProps({
      id,
      folders,
      directory: path.join('docs', foldersToPath(folders.slice(1))),
      metaData: fetchDocMetaData(id),
    }))
  );

  const appendDocContent = docs => Promise.all(
    docs.map(doc =>
      promiseAllProps({
        ...doc,
        content: fetchDocContent(doc.id),
      })
        .then(doc => ({
          ...doc,
          location: path.join(
            doc.directory,
            `${kebabCaseIt(doc.content.metaData.title)}.md`
          ),
        }))
    )
  );

  return fetchAllDocIds()
    .then(docIds => docIds.reduce((docs, id) => ({
      ...docs,
      [id]: fetchDocFolders(id),
    }), {}))
    .then(promiseAllProps)
    .then(justs)
    .then(filter (pipe([
      map(prop('id')),
      elem(directoryId),
    ])))
    .then(Object.entries)
    .then(appendMetaData)
    .then(reject(isDeletedDoc))
    .then(appendDocContent)
    .then(docs =>
      saveDocsLocally(docs)
        .then(() => formatDocsMetaData(docs))
    )
    .catch(console.error);
};
