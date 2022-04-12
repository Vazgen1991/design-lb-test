const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // module: {
  //   rules: [
  //     {
  //       test: /\.sass$/,
  //       use: [
  //         'vue-style-loader',
  //         'css-loader',
  //         {
  //           loader: 'sass-loader',
  //           options: {
  //             indentedSyntax: true,
  //             // sass-loader >= 8
  //             sassOptions: {
  //               indentedSyntax: true
  //             }
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
})
