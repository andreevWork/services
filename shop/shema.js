var mongoose = require('mongoose'),

    NAME_ARRAY_1 = ['Robo', 'Mega', 'Super', 'Mac'],
    NAME_ARRAY_2 = ['ultra', 'awesome', 'great', 'asus'],
    NAME_ARRAY_3 = ['with blue eyes', 'baby', 'dogy style', 'amazon'],
    PRICE_MIN = 15000,
    PRICE_MAX = 135000,
    MATERIAL_ARRAY = ['metall', 'plastic', 'antimaterie', 'timber'],
    WEIGHT_ARRAY = [2, 2.5, 3, 3.5, 4, 4.5, 5],
    SCREEN_SIZE_MIN = 10,
    SCREEN_SIZE_MAX = 28,
    PROCESSOR_ARRAY = ['intel core i3','intel core i5','intel core i7','AMD Opteron 6300', 'AMD Opteron 5300'],
    ORM_ARRAY = [2, 4, 8, 16, 32],
    VIDEO_MEMORY_ARRAY = ['512 MB', '1 GB', '2 GB', '4 GB'],
    COLOR_ARRAY = ['black', 'red', 'white', 'blue', 'green'],

    keys = {
        PRICE_MIN: 'price_from',
        PRICE_MAX: 'price_to',
        WEIGHT_MIN: 'weight_from',
        WEIGHT_MAX: 'weight_to',
        SCREEN_SIZE_MIN: 'screen_size_from',
        SCREEN_SIZE_MAX: 'screen_size_to',
        MATERIAL: 'material',
        PROCESSOR: 'processor',
        ORM: 'ORM'
    },

    types = {
        RANGE: 'range',
        CHECK: 'checkbox'
    };

exports.NotebookSchema = mongoose.Schema({
    name: String,
    price: Number,
    material: Array,
    weight: Number,
    screen_size: Number,
    processor: String,
    ORM: Number,
    MORM: Number,
    lighting_keyboard: Boolean,
    video_memory: String,
    color: Array
});


exports.NotebookAllFieldsValue = {
    NAME_ARRAY_1 : NAME_ARRAY_1,
    NAME_ARRAY_2 : NAME_ARRAY_2,
    NAME_ARRAY_3 : NAME_ARRAY_3,
    PRICE_MIN : PRICE_MIN,
    PRICE_MAX : PRICE_MAX,
    MATERIAL_ARRAY : MATERIAL_ARRAY,
    WEIGHT_ARRAY : WEIGHT_ARRAY,
    SCREEN_SIZE_MIN : SCREEN_SIZE_MIN,
    SCREEN_SIZE_MAX : SCREEN_SIZE_MAX,
    PROCESSOR_ARRAY : PROCESSOR_ARRAY,
    ORM_ARRAY : ORM_ARRAY,
    VIDEO_MEMORY_ARRAY : VIDEO_MEMORY_ARRAY,
    COLOR_ARRAY : COLOR_ARRAY
};

exports.NotebookFieldsForDrawingFilter = [
    {
        type: types.RANGE,
        min: PRICE_MIN,
        max: PRICE_MAX,
        key_min: keys.PRICE_MIN,
        key_max: keys.PRICE_MAX,
        text: 'Цена',
        unit: 'руб.'
    },
    {
        type: types.CHECK,
        values: MATERIAL_ARRAY,
        key: keys.MATERIAL,
        text: 'Материал'
    },
    {
        type: types.RANGE,
        min: WEIGHT_ARRAY[0],
        max: WEIGHT_ARRAY[WEIGHT_ARRAY.lenght - 1],
        key_min: keys.WEIGHT_MIN,
        key_max: keys.WEIGHT_MAX,
        text: 'Вес',
        unit: 'кг'
    },
    {
        type: types.RANGE,
        min: SCREEN_SIZE_MIN,
        max: SCREEN_SIZE_MAX,
        key_min: keys.SCREEN_SIZE_MIN,
        key_max: keys.SCREEN_SIZE_MAX,
        text: 'Диагональ экрана',
        unit: 'дюйм'
    },
    {
        type: types.CHECK,
        values: PROCESSOR_ARRAY,
        key: keys.PROCESSOR,
        text: 'Процессор'
    },
    {
        type: types.CHECK,
        values: ORM_ARRAY,
        key: keys.ORM,
        text: 'Оперативная память'
    }
];