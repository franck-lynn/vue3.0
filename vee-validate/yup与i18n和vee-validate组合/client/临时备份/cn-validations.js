/*eslint-disable no-template-curly-in-string*/

import printValue from './helpers';
// import { LocaleObject, FormatErrorParams } from 'yup';

// Based on https://github.com/jquense/yup/blob/2973d0a/src/locale.js
export const mixed = {
    default: '${path} 不可使用.',
    required: '${path} 是必填字段',
    oneOf: '${path} 必须是这些值中的一个: ${values}',
    notOneOf: '${path} 不能是以下值: ${values}',
    notType: ({ path, type, value, originalValue }) => {
        const isCast = originalValue != null && originalValue !== value;
        let msg =
            `${path} debe ser un \`${type}\` Tipo, ` +
            `pero el valor final fue: \`${printValue(value, true)}\`` +
            (isCast ?
                ` (Obtenido del valor \`${printValue(originalValue, true)}\`).` :
                '.');

        if (value === null) {
            msg +=
                `\n Si "nulo" es intencionalmente un valor vacío, asegúrese de marcar el esquema como` +
                ' `.nullable()`';
        }

        return msg;
    },
};

export const string = {
    length: '${path} debe ser exactamente ${length} caracteres',
    min: '${path} 不小于 ${min}',
    max: '${path} 不大于 ${max}',
    matches: '${path} debe coincidir con lo siguiente: "${regex}"',
    email: '${path} debe ser un correo electrónico válido',
    url: '${path} debe ser una URL válida',
    trim: '${path} debe ser una cadena recortada',
    lowercase: '${path} debe ser una cadena en minúsculas',
    uppercase: '${path} debe ser una cadena en mayúsculas',
};

export const number = {
    min: '${path} debe ser mayor que o igual a ${min}',
    max: '${path} debe ser menor que o igual a ${max}',
    lessThan: '${path} debe ser menor a ${less}',
    moreThan: '${path} debe ser mayor a ${more}',
    positive: '${path} debe ser un número positivo',
    negative: '${path} debe ser un número negativo',
    integer: '${path} debe ser un entero',
};

export const date = {
    min: '${path} campo debe ser posterior a ${min}',
    max: '${path} campo debe ser anterior a ${max}',
};

export const boolean = {};

export const object = {
    noUnknown: '${path} campo tiene llaves no especificadas en el objeto',
};

export const array = {
    min: '${path} campo debe tener al menos ${min} artículos',
    max: '${path} campo debe ser menor o igual a ${max} artículos',
};