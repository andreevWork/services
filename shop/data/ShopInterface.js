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
    RATING_MIN = 0,
    RATING_MAX = 7,
    PROCESSOR_ARRAY = ['intel core i3','intel core i5','intel core i7','AMD Opteron 6300', 'AMD Opteron 5300'],
    ORM_ARRAY = [2, 4, 8, 16, 32],
    VIDEO_MEMORY_ARRAY = ['512 MB', '1 GB', '2 GB', '4 GB'],
    COLOR_ARRAY = ['black', 'red', 'white', 'blue', 'green'],

    KEYS = {
        PRICE_MIN: 'price_from',
        PRICE_MAX: 'price_to',
        WEIGHT_MIN: 'weight_from',
        WEIGHT_MAX: 'weight_to',
        SCREEN_SIZE_MIN: 'screen_size_from',
        SCREEN_SIZE_MAX: 'screen_size_to',
        MATERIAL: 'material',
        PROCESSOR: 'processor',
        ORM: 'ORM',
        
        PRICE_SORT: 'price',
        RATING_SORT: 'rating',
        NAME_SORT: 'name'
    },

    TYPES = {
        RANGE: 'range',
        CHECK: 'check'
    };

/*
 * Монго-схема документа
 */

exports.NotebookSchema = mongoose.Schema({
    name: String,
    price: Number,
    material: Array,
    weight: Number,
    rating: Number,
    screen_size: Number,
    processor: String,
    ORM: Number,
    MORM: Number,
    lighting_keyboard: Boolean,
    video_memory: String,
    color: Array
});

/*
 * Просто набор значений(массивов, чисел) для всех полей в базе, необходим для генерации значений.
 */

exports.NotebookAllFieldsValue = {
    NAME_ARRAY_1,
    NAME_ARRAY_2,
    NAME_ARRAY_3,
    PRICE_MIN,
    PRICE_MAX,
    MATERIAL_ARRAY,
    WEIGHT_ARRAY,
    SCREEN_SIZE_MIN,
    SCREEN_SIZE_MAX,
    PROCESSOR_ARRAY,
    ORM_ARRAY,
    VIDEO_MEMORY_ARRAY,
    COLOR_ARRAY,
    RATING_MIN,
    RATING_MAX
};

/*
 * Массив объектов из которых будет делаться сортировка на клиенте
 *
 * Формат объекта:
 * {
 *  key_sort: значение для поля sort в запросе,
 *  text: текст для отображения
 * }
 *
 * Сортировка состоит из двух свойств:
 *
 *  Первое - это по какому полю необходимо сортировать, за это отвечает ключ sort в GET запросе.
 *
 *  Второе направление сортировки, ключ sort_direction.
 *  Принимает значения 1 и -1, где 1 сортировка от меньшего к большему, -1 наоборот.
 *  При использовании только ключа sort, дефолтное значение sort_direction  -1, то есть от большего к меньшему.
 *
 */

exports.NotebookFieldsForSort = [
    {
        key_sort: KEYS.PRICE_SORT,
        text: 'По цене'
    },
    {
        key_sort: KEYS.RATING_SORT,
        text: 'По рейтингу'
    },
    {
        key_sort: KEYS.NAME_SORT,
        text: 'По названию'
    }
];

/*
 * Массив объектов из которых будет делаться фильтрация на клиенте
 *
 * Есть два типа фильтрации, в зависимости от типа, объект выглядит по разному
 *
 * №1 Тип TYPES.RANGE - тип для диапозонов значенией, то есть фильтр для полей, в формате диапозона: "от" и "до".
 * Например цена или вес. Всегда числовой диапозон.
 *
 * Формат объекта:
 * {
 *  min: минимальное значение параметра, ниже бессмысленно
 *  max: максимальное значение
 *  key_min: название поля в GET запросе, для начальной точки диапозона
 *  key_max: название для максимальной точки
 *  text: текст для фильтра
 *  unit: единицы измерения
 * }
 *
 *  №2 Тип TYPES.CHECK - тип для выбора одного и/или нескольких значений поля.
 * Например материал или процессор. Всегда массив строк-значений.
 *
 * Формат объекта:
 * {
 *  query_key: название поля в GET запросе, может принимать массив значений
 *  values: значение(я) для поля
 *  text: текст для фильтра
 * }
 */

exports.NotebookFieldsForFilter = [
    {
        type: TYPES.RANGE,
        min: PRICE_MIN,
        max: PRICE_MAX,
        key_min: KEYS.PRICE_MIN,
        key_max: KEYS.PRICE_MAX,
        text: 'Цена',
        unit: 'руб.'
    },
    {
        type: TYPES.CHECK,
        values: MATERIAL_ARRAY,
        query_key: KEYS.MATERIAL,
        text: 'Материал'
    },
    {
        type: TYPES.RANGE,
        min: WEIGHT_ARRAY[0],
        max: WEIGHT_ARRAY[WEIGHT_ARRAY.length - 1],
        key_min: KEYS.WEIGHT_MIN,
        key_max: KEYS.WEIGHT_MAX,
        text: 'Вес',
        unit: 'кг'
    },
    {
        type: TYPES.RANGE,
        min: SCREEN_SIZE_MIN,
        max: SCREEN_SIZE_MAX,
        key_min: KEYS.SCREEN_SIZE_MIN,
        key_max: KEYS.SCREEN_SIZE_MAX,
        text: 'Диагональ экрана',
        unit: 'дюйм'
    },
    {
        type: TYPES.CHECK,
        values: PROCESSOR_ARRAY,
        query_key: KEYS.PROCESSOR,
        text: 'Процессор'
    },
    {
        type: TYPES.CHECK,
        values: ORM_ARRAY,
        query_key: KEYS.ORM,
        text: 'Оперативная память'
    }
];