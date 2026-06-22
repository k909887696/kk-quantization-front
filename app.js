const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// ========== 应用配置 ==========
const APP_NAME = '{serviceName}';   // 应用名称（PM2 进程名）
const PORT = {servicePort};              // 端口号

// ========== Express 服务逻辑 ==========

// 静态资源
app.use(express.static(path.resolve(__dirname, './dist')));

// 缓存 index.html
const indexHtml = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8');

// SPA 路由兜底
app.get('*', function(req, res) {
    res.send(indexHtml);
});

// 启动服务
app.listen(PORT, () => {
    console.log(`${APP_NAME} running at http://localhost:${PORT}`);
});

// ========== PM2 配置 ==========
module.exports = {
    apps: [
        {
            name: APP_NAME,
            script: './app.js',
            instances: 1,
            max_memory_restart: '512M',
            env: {
                NODE_ENV: '{activeProfiles}'
            }
        }
    ]
};