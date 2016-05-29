var express = require('express'),
    server = express(),

    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/test').connection,

    _ = require('underscore'),

    argv = require('minimist')(process.argv),
    PORT = argv.port || argv.p || 3002,

    NotebookSchema = require('./data/ShopInterface.js').NotebookSchema,
    NotebookFieldsForFilter = require('./data/ShopInterface.js').NotebookFieldsForFilter,
    NotebookFieldsForSort = require('./data/ShopInterface.js').NotebookFieldsForSort,

    filter_keys, sort_keys;

// db.once('open', function() {
//
// });

Notebook = mongoose.model('Notebook', NotebookSchema);

filter_keys = getFilterFeys();
sort_keys = geSortFeys();

server.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

server.get('/notebooks/filter_fields', function (req, res) {
    res.json(NotebookFieldsForFilter);
});

server.get('/notebooks/sort_fields', function (req, res) {
    res.json(NotebookFieldsForSort);
});

server.get('/notebooks', function (req, res) {
    var query = {},
        sort_by = null,
        format,
        json = {},
        q;

    filter_keys.forEach((key) => {
        q = req.query[key];

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
    
    if(_.include(sort_keys, req.query.sort)){
        sort_by = { 
            [req.query.sort] : req.query.sort_direction || -1
        };
    }

    format = {
        sort: sort_by,
        skip: req.query.skip || 0,
        limit: req.query.limit || 0
    };

    Notebook.find(query, null, format, function(e, notes){
        json.count = notes.length;

        if(req.query.skip == 0 && req.query.limit != 0) {
            notes = notes.slice(0, req.query.limit);
        }

        json.data = notes;

        res.json(json);
    });
});

server.listen(PORT, function () {
    console.log('API started on ' + PORT + ' port!');
});

function getFilterFeys() {
    return _.union(
        _.compact(_.pluck(NotebookFieldsForFilter, 'key')),
        _.compact(_.pluck(NotebookFieldsForFilter, 'key_min')),
        _.compact(_.pluck(NotebookFieldsForFilter, 'key_max'))
    );
}

function geSortFeys() {
    return _.pluck(NotebookFieldsForSort, 'key_sort');
}
