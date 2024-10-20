const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081 // 修改 Vue 開發伺服器的端口為 8081
  }
})