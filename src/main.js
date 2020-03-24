const path = require('path');

const fetchPapers = require('./fetch-papers');
const generateSidebar = require('./generate-sidebar');
const transformMarkdown = require('./transform');

module.exports = {
  fetchPapers,
  generateSidebar,
  paperPlugin: ({ documentsMetaData }) => ({
    name: 'vuepress-paper',
    extendMarkdown: transformMarkdown(documentsMetaData),
    plugins: [
      [
        '@vuepress/plugin-register-components',
        {
          components: [
            {
              name: 'youtube-embed',
              path: path.join(__dirname, 'youtube-embed.vue'),
            }
          ]
        }
      ],
    ],
  })
};
