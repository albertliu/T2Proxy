
const compression = require('compression');
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()
const url = require('url');
const https = require('https');
const httpProxy = require('http-proxy');
const { HttpsProxyAgent } = require('https-proxy-agent');
const fs = require('fs');
// import { HttpsProxyAgent } from 'https-proxy-agent';
// import * as https from 'https';
// import { HttpsProxyAgent } from 'https-proxy-agent';
// 创建一个代理服务器实例
// const agent = new HttpsProxyAgent("https://localhost:8081")
/*
const options = {
    key: fs.readFileSync('key.key', 'utf8'),
    cert: fs.readFileSync('pem.pem', 'utf8')
  };
  const server = https.createServer(options, app);
  
  // 代理服务器配置
  const proxyAgent = new HttpsProxyAgent('https://localhost'); // 代理服务器的地址
  
  app.use('/api', createProxyMiddleware({
      target: 'https://localhost:8081', // 远程后端服务
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
      agent: proxyAgent
  }));
  
  // 其他路由和中间件配置
  // ...
  // 将前端项目所在文件夹设置为静态资源
app.use('/', express.static('./index', {
    cacheControl: false,
    etag: false,
    lastModified: false,
    expires: '1y',
    maxAge: '1y'
}))

  server.listen(3000, () => {
      console.log('Server is running on https://localhost:3000');
  });
*/  


// 对/api开头请求进行转发处理
app.use('/api', createProxyMiddleware({
    // 转发到5000端口
    // target: 'http://localhost:8085',
    target: process.env.NODE_ENV_UPLOAD_URL,
    // 转发时重写路径
    pathRewrite: { 
        '^/api': '' 
    },
    changeOrigin: true,
    secure:false,
    // cert: 'users/public/SSL/pem.pem'
}));


app.use(compression());

// 将前端项目所在文件夹设置为静态资源
app.use('/', express.static('./index', {
    cacheControl: false,
    etag: false,
    lastModified: false,
    expires: '1y',
    maxAge: '1y'
}))
// node proxy.js
app.listen(3000)
