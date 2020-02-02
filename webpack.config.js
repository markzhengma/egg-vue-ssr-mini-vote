'use strict';

module.exports = {
  entry: {
    'main': 'app/web/main.js',
    'app': 'app/web/app.vue',
    'index/index': 'app/web/page/index/index.vue',
    'home/home': 'app/web/page/home/home.vue',
  },
  plugins: [
    { imagemini: false }
  ]
};