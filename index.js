var express = require('express'),
    server = express(),

    _ = require('underscore'),

    argv = require('minimist')(process.argv),
    PORT = argv.port || argv.p || 3002,

    shop_service = require('./shop/index.js');

// Чтобы аяксы и прочая ерунда работали
server.use(corsMiddleware('localhost'));

// Инициализируем магазинчик
shop_service(server);

server.listen(PORT, function () {
    console.log('API started on ' + PORT + ' port!');
});

// Небольшой middleware чтобы разрешал всем переданным хостам работать с сервером через любые порты, поскольку в поле req.headers.origin присутствует порт, протокол и хост.
function corsMiddleware(...origins) {
    return function(req, res, next) {
        if(~origins.indexOf(req.hostname)){
            res.header("Access-Control-Allow-Origin", req.headers.origin);
        }
        next();
    }
}