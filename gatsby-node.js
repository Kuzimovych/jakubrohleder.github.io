import webpackConf from './webpack.config.js'

exports.modifyWebpackConfig = (config) => config.merge(webpackConf)
