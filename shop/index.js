var mongoose = require('mongoose'),

    _ = require('underscore'),

    NotebookSchema = require('./helpers/ShopInterface.js').NotebookSchema,
    NotebookFieldsForFilter = require('./helpers/ShopInterface.js').NotebookFieldsForFilter,
    NotebookFieldsForSort = require('./helpers/ShopInterface.js').NotebookFieldsForSort,

    filter_keys, sort_keys;

// Конектимся к базе
mongoose.connect('mongodb://localhost/test');

Notebook = mongoose.model('Notebook', NotebookSchema);

// Получаем все возможные ключи по которым будет идти фильтрация
filter_keys = _.union(
    _.compact(_.pluck(NotebookFieldsForFilter, 'query_key')),
    _.compact(_.pluck(NotebookFieldsForFilter, 'key_min')),
    _.compact(_.pluck(NotebookFieldsForFilter, 'key_max'))
);

// Получаем все возможные значения поля key_sort по которым будет идти сотрировка
sort_keys = _.pluck(NotebookFieldsForSort, 'key_sort');

module.exports = function(server) {
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

        if(_.include(sort_keys, req.query.key_sort)){
            sort_by = {
                [req.query.key_sort] : req.query.sort_direction || -1
            };
        }

        format = {
            sort: sort_by,
            skip: req.query.skip || 0
        };

        if(req.query.skip != 0 ){
            format.limit = req.query.limit || 0;
        }

        Notebook.find(query, null, format, function(e, notes){
            json.count = notes.length;

            if(req.query.skip == 0 && req.query.limit != 0) {
                notes = notes.slice(0, req.query.limit);
            }

            json.data = notes;

            res.json(json);
        });
    });  
};
