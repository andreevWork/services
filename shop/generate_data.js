var mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/test').connection,
    NotebookSchema = require('./shema.js').NotebookSchema,
    NotebookAllFieldsValue = require('./shema.js').NotebookAllFieldsValue;
    

db.once('open', function() {
    var orm, note;

    Notebook = mongoose.model('Notebook', NotebookSchema);

    for(var i = 0; i < 1000; i++){
        orm = getRandomArrayItem(NotebookAllFieldsValue.ORM_ARRAY);
        note = new Notebook({
            name: getRandomArrayItem(NotebookAllFieldsValue.NAME_ARRAY_1).value + ' ' + getRandomArrayItem(NotebookAllFieldsValue.NAME_ARRAY_2).value + ' ' + getRandomArrayItem(NotebookAllFieldsValue.NAME_ARRAY_3).value,
            price: getRandom(NotebookAllFieldsValue.PRICE_MIN, NotebookAllFieldsValue.PRICE_MAX),
            material: getRandomArrayFromArray(NotebookAllFieldsValue.MATERIAL_ARRAY, getRandom(1, 2)),
            weight: getRandomArrayItem(NotebookAllFieldsValue.WEIGHT_ARRAY).value,
            screen_size: getRandom(NotebookAllFieldsValue.SCREEN_SIZE_MIN, NotebookAllFieldsValue.SCREEN_SIZE_MAX),
            processor: getRandomArrayItem(NotebookAllFieldsValue.PROCESSOR_ARRAY).value,
            ORM: orm.value,
            MORM: getRandomArrayItem(NotebookAllFieldsValue.ORM_ARRAY, orm.index).value,
            lighting_keyboard: !!getRandom(0, 1),
            video_memory: getRandomArrayItem(NotebookAllFieldsValue.VIDEO_MEMORY_ARRAY).value,
            color: getRandomArrayFromArray(NotebookAllFieldsValue.COLOR_ARRAY, getRandom(1, 3))
        });
        note.save();
    }
});

function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function getRandomArrayItem(arr, minIndex) {
    var randomIndex = getRandom(minIndex || 0, arr.length - 1);
    return {
        index: randomIndex,
        value: arr[randomIndex]
    };
}

function getRandomArrayFromArray(arr, maxItems) {
    var newArr = [], randomIndex, arr = arr.slice();
    while(maxItems--){
        randomIndex = getRandom(0, arr.length - 1);
        newArr.push(arr[randomIndex]);
        arr.splice(randomIndex, 1)
    }
    return newArr;
}

