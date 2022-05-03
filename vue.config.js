const {
  defineConfig
} = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  // devServer: {  
  //   historyApiFallback:true
  // },
  configureWebpack: {
    resolve: {
      alias: { //自訂一個路徑別名  ps:要使用必須在別名前面+ ~
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'utils': '@/utils', 
        'views': '@/views'
      } 
    },
 
  },
 publicPath:'/easyshop'
  // publicPath: process.env.NODE_ENV  === 'production'? '/easyshop/': '/',

}