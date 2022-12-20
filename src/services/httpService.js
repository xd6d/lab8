import request from "axios";
import f from "vue-select";

const link = "http://localhost:8080/"

export async function getAll(entity, page = 0, elementsPerPage = 10, sortDirection, sortField) {
    try {
        return (await request.get(link + entity, {
            params:
                {page: page, elementsPerPage: elementsPerPage, sortDirection: sortDirection, sortField: sortField}
        })).data;
    } catch (e) {
        throw new Error(e.response?.data?.message || e.message);
    }
}
export async function searchAll(entity, field='name', params){
    try {
        return (await request.get(link + entity +'/search/' + field, {
            params:{...params}})).data
    } catch (e) {
        throw new Error(e.response?.data?.message || e.message);
    }
}

export async function getOne(entity, id) {
    try {
        const res = (await request.get(link + entity + '/' + id)).data;
        if (res.length === 0) {
            throw new Error({entyty: entity, message: 'Сутності з таким id не існує', id: id});
        }
    } catch (e) {
        throw new Error({entyty: entity, message: e.response.data.message, id: id});
    }
}

export async function updateOne(entity, id, data) {
    try {
        return (await request.put(link + entity + '/' + id, data)).data;
    } catch (e) {
        const messageList = e.response.data.message;
        const res = [];
        for(let message of messageList) {
            const field = message.split(" ")[0];
            res.push({entity:entity, id:id, message:translate[entity][field][message]});
        }
        throw new Error(JSON.stringify(res));
    }
}

export async function createOne(entity, data) {
    try {
        return (await request.post(link + entity, data)).data;
    } catch (e) {
        const messageList = e.response.data.message;
        const res = [];
        for(let message of messageList) {
            const field = message.split(" ")[0];
            res.push({entity:entity, id:null, message:translate[entity][field][message]});
        }
        throw new Error(JSON.stringify(res));
    }
}

export async function deleteOne(entity, id) {
    try {
        return await request.delete(link + entity + '/' + id);
    } catch (e) {
        throw new Error(JSON.stringify({entity:entity, id: id, message:e.response.data.message}));
    }
}

const $nameRequired = {'name is required': 'Назву необхідно вказати'};
const $nameWrongLetters = {'name should contain only english/ukrainian letters': 'Назва повинна містити лише українські та англійські літери'};
const $shortNameRequired = {'shortName is required': 'Скорочену назву необхідно вказати'};
const $shortNameWrongLetters = {
    'shortName should contain only english/ukrainian letters': 'Скорочена назва повинна містити лише українські та англійські літери'
};
const translate = {
    departments: {
        faculty: {'faculty is required': 'факультет необхідно обрати',},
        name: {...$nameRequired, ...$nameWrongLetters},
        shortName: {...$shortNameRequired, ...$shortNameWrongLetters}
    },
    disciplines: {
        name: {...$nameRequired, ...$nameWrongLetters},
    },
    faculties: {
        name: {...$nameRequired, ...$nameWrongLetters},
        shortName: {...$shortNameRequired, ...$shortNameWrongLetters}
    },
    groups: {
        name: {...$nameRequired, ...$nameWrongLetters},
        department: {'department is required': 'Департамент необхідно обрати'},
        course: {'course should be from 1 to 6': 'Курс повинен бути від 1 до 6'}
    },
    student: {
        group: {'group is required': 'Групу необхідно обрати'},
        name: {
            'name is required': 'Ім\'я необхідно вказати',
            'name should contain only english/ukrainian letters': 'Ім\'я повинне містити лише українські та англійські літери'
        },
        surname: {
            'name is required': 'Прізвище необхідно вказати',
            'name should contain only english/ukrainian letters': 'Прізвище повинне містити лише українські та англійські літери'
        },

        email: {'email is invalid': 'Некореткна пошта'},
        phone: {'number is invalid': 'Некореткний телефон'}
    },
    teacher: {
        name: {
            'name is required': 'Ім\'я необхідно вказати',
            'name should contain only english/ukrainian letters': 'Ім\'я повинне містити лише українські та англійські літери'
        },
        surname: {
            'name is required': 'Прізвище необхідно вказати',
            'name should contain only english/ukrainian letters': 'Прізвище повинне містити лише українські та англійські літери'
        },

        email: {'email is invalid': 'Некореткна пошта'},
        phone: {'number is invalid': 'Некореткний телефон'}

    },
    schedule: {
        name: {...$nameWrongLetters},
        teacher: {'teacher is required': 'Викладача необхідно обрати'},
        discipline: {'discipline is required': 'Предмет необхідно обрати'},
        group: {'group is required': 'Групу необхідно обрати'},
        lesson: {'lesson is required': 'Час необхідно вказати', 'lesson should be from 1 to 6': 'Некоректний час'},
        dayOfWeek: {
            'dayOfWeek is required': 'День тижня необхідно вказати',
            'dayOfWeek should be from 1 to 7': 'Некоректний день тижня'
        }
    }
}

