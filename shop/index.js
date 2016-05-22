var express = require('express'),
    server = express(),
    mongoose = require('mongoose'),
    PORT = 80,
    NotebookSchema = require('./shema.js').NotebookSchema;
    db = mongoose.connect('mongodb://localhost/test').connection,
    NotebookFieldsForDrawingFilter = require('./shema.js').NotebookFieldsForDrawingFilter;

// db.once('open', function() {
//
// });

Notebook = mongoose.model('Notebook', NotebookSchema);

server.get('/notebooks/attributes', function (req, res) {
    res.json(NotebookFieldsForDrawingFilter);
});

server.get('/notebooks', function (req, res) {
    var query = {};
    
    Object.keys(req.query).forEach((key) => {
        var q = req.query[key];
        if(!q) return;
        if(~key.indexOf('_from') || ~key.indexOf('_to')){
            if(~key.indexOf('_from')){
                key = key.replace('_from', '');
                query[key] || (query[key] = {});
                query[key].$gte = q;
            } else {
                key = key.replace('_to', '');
                query[key] || (query[key] = {});
                query[key].$lte = q;
            }
        } else {
            query[key] = { $in : q}
        }
    });
    
    Notebook.find(query, function(e, notes){
        res.json(notes);
    });
});

server.listen(PORT, function () {
    console.log('API started on ' + PORT + ' port!');
});
