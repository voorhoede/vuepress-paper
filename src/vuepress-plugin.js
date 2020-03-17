const path = require('path');

module.exports = {
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
};
