# Vuepress Paper
[![Travis Build Status][travis-icon]][travis]
[![LGTM Grade][lgtm-icon]][lgtm]
[![Depfu Status][depfu-icon]][depfu]

Node.js package to fetch content from [Dropbox Paper](https://paper.dropbox.com/), generate a sidebar and enhance the markdown for [Vuepress](vuepress.vuejs.org/).

## Usage
`npm install vuepress-paper --save-dev`

### Configuration
Generally using Vuepress Paper will take place in Vuepress configuration, for example using all three functionalities:
```js
const { fetchPapers, generateSidebar, paperPlugin } = require('vuepress-paper');

module.exports = () => fetchPapers({
  apiToken: process.env.DROPBOX_API_TOKEN,
  directoryId: process.env.DROPBOX_PAPER_DIRECTORY_ID,
})
  .then((documentsMetaData) => ({
    themeConfig: {
      sidebar: generateSidebar(documentsMetaData),
    },
    plugins: [
      [ paperPlugin, { documentsMetaData } ]
    ],
  }));
```

## API
### fetchPapers({ apiToken, directoryId })

#### apiToken
Type: `String`

The Dropbox API access token generated from the [Dropbox App Console](https://www.dropbox.com/developers/apps).

#### directoryId
Type: `Boolean`

The directory to fetch content from, the ID is present at the end of a directory URL in Dropbox Paper. For example the `Playbook` directory URL ends with:
`Playbook-e.1gg8Yut8`. Where `e.1gg8Yut8` is the ID.

### generateSidebar(documentsMetaData)

#### documentsMetaData
Type: `Array`

Information about each document that is fetched from Dropbox Paper, used to create a tree based on their location.

### paperPlugin({ documentsMetaData })
#### documentsMetaData
Type: `Array`

Information about each document that is fetched from Dropbox Paper, used rewrite links that point to other generated documents.

## Development

### Quick start
#### Initial setup
```sh
git clone git@github.com:voorhoede/vuepress-paper.git
cd vuepress-paper
npm ci
```

### Codebase overview

#### Testing
Unit tests are present in each file matching the implementation filename ending with `.test.js` and are ran with: `npm test`.

#### Style
The code is written in a functional style using [Sanctuary](https://sanctuary.js.org/) to provide simple, pure functions with no need for `null` checks.

[travis]: https://travis-ci.com/voorhoede/vuepress-paper/branches
[travis-icon]: https://img.shields.io/travis/com/voorhoede/vuepress-paper/master.svg?style=flat-square
[lgtm]: https://lgtm.com/projects/g/voorhoede/vuepress-paper/
[lgtm-icon]: https://img.shields.io/lgtm/grade/javascript/g/voorhoede/vuepress-paper.svg?style=flat-square
[depfu]: https://depfu.com/repos/github/voorhoede/vuepress-paper/
[depfu-icon]: https://img.shields.io/depfu/voorhoede/vuepress-paper?style=flat-square
