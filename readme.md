# Vuepress Paper
[![Travis Build Status][travis-icon]][travis]
[![LGTM Grade][lgtm-icon]][lgtm]
[![Depfu Status][depfu-icon]][depfu]

**This project is a proof of concept**, it is a quick split of [the playbook](https://github.com/voorhoede/playbook/), check out the [playbook before the split](https://github.com/voorhoede/playbook/tree/e516faab25f6dd13976b9005973c29b74ce33a1d) for more information. In the future this will probably evolve into either a Vuepress plugin or command line tool. For now this module is installed from GitHub and requires some extra setup:
```sh
npm install git://github.com/voorhoede/vuepress-paper.git
npm install @vuepress/plugin-register-components
env DROPBOX_API_TOKEN=EXMAPLEaePpvhsJ6LopZIZZw
env DROPBOX_PAPER_DIRECTORY_ID=e.1gg8YzoPiut8example
```

Fetch content:
```sh
node ./node_modules/vuepress-paper/src/fetch-papers.js
```

Vuepress config:
```js
const vuepressPaperPath = require.resolve('vuepress-paper');

const generateSidebar = require(`${vuepressPaperPath}/../generate-sidebar.js`);
const { transformMarkdown } = require(`${vuepressPaperPath}/../transform.js`);

modules.exports = {
  themeConfig: {
    sidebar: generateSidebar(documentsMetaData),
  },
  extendMarkdown: transformMarkdown,
  plugins: [
    [
      '@vuepress/plugin-register-components',
      {
        components: [
          {
            name: 'youtube-embed',
            path: path.resolve(
              `${vuepressPaperPath}/../youtube-embed.vue`
            ),
          }
        ]
      }
    ],
  ],
}
```

## Development

### Quick start
#### Initial setup
```sh
git clone git@github.com:voorhoede/vuepress-paper.git
cd vuepress-paper
npm ci
```

### Codebase overview
#### Structure
Because Vuepress does not support asynchronous configuration the content fetching and building the website is seperated. Which means the needed sidebar data is written to a temporary file so it can be synchronously read from the vuepress config.

#### Testing
Unit tests are present in each file matching the implementation filename ending with `.test.js` and are ran with: `npm test`.

#### Style
The code is written in a functional style using [Sanctuary](https://sanctuary.js.org/) to provide simple, pure functions with no need for `null` checks.

[travis]: https://travis-ci.org/voorhoede/vuepress-paper/branches
[travis-icon]: https://img.shields.io/travis/voorhoede/vuepress-paper/master.svg?style=flat-square
[lgtm]: https://lgtm.com/projects/g/voorhoede/vuepress-paper/
[lgtm-icon]: https://img.shields.io/lgtm/grade/javascript/g/voorhoede/vuepress-paper.svg?style=flat-square
[depfu]: https://depfu.com/repos/github/voorhoede/vuepress-paper/
[depfu-icon]: https://img.shields.io/depfu/voorhoede/vuepress-paper?style=flat-square
