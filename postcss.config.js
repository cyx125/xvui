const plugins = [
  require('autoprefixer')({
    browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
  })
];
if (process.env.RUN_TYPE !== 'WECHATMP') {
  plugins.push(require('postcss-plugin-weex')());
  plugins.push(
    require('postcss-plugin-px2rem')({
      rootValue: 75,
      minPixelValue: 1.01
    })
  )
}
module.exports = { plugins: plugins }
