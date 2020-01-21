'use strict';
hexo.extend.filter.register('after_post_render', data => {
  var theme = hexo.theme.config;
  if (!theme.lazyload.enable) return;

  const cheerio = require('cheerio');

  const $ = cheerio.load(data.content, {decodeEntities: false});
  const images = $('img').not($('.justified-gallery img'));
  if (!images.length) return;

  images.each((i, o) => {
    let src = $(o).attr('src');
    $(o).attr('data-src', src);
    $(o).attr('src','/img/loading.gif')
    $(o).addClass('lazyload');
  });

  data.content = $.html();
}, 100);