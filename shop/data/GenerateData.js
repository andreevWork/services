var mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/test').connection,
    NotebookSchema = require('./ShopInterface.js').NotebookSchema,
    Fields = NotebookAllFieldsValue = require('./ShopInterface.js').NotebookAllFieldsValue;
    

db.once('open', function() {
    var orm, note;

    Notebook = mongoose.model('Notebook', NotebookSchema);

    for(var i = 0; i < 1000; i++){
        orm = getRandomArrayItem(Fields.ORM_ARRAY);

        note = new Notebook({
            name: getRandomArrayItem(Fields.NAME_ARRAY_1).value + ' ' + getRandomArrayItem(Fields.NAME_ARRAY_2).value + ' ' + getRandomArrayItem(Fields.NAME_ARRAY_3).value,
            price: getRandom(Fields.PRICE_MIN, Fields.PRICE_MAX),
            material: getRandomArrayFromArray(Fields.MATERIAL_ARRAY, getRandom(1, 2)),
            weight: getRandomArrayItem(Fields.WEIGHT_ARRAY).value,
            screen_size: getRandom(Fields.SCREEN_SIZE_MIN, Fields.SCREEN_SIZE_MAX),
            processor: getRandomArrayItem(Fields.PROCESSOR_ARRAY).value,
            ORM: orm.value,
            MORM: getRandomArrayItem(Fields.ORM_ARRAY, orm.index).value,
            lighting_keyboard: !!getRandom(0, 1),
            rating: getRandom(Fields.RATING_MIN, Fields.RATING_MAX),
            video_memory: getRandomArrayItem(Fields.VIDEO_MEMORY_ARRAY).value,
            color: getRandomArrayFromArray(Fields.COLOR_ARRAY, getRandom(1, 3))
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

