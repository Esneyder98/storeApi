const { check,body ,param} = require('express-validator');
const validateLoginUser =[
    check('username')
    .notEmpty().withMessage('El parametro nombre usuario es requerido'),
    check('password')
    .notEmpty().withMessage('Debes completar el campo contraseña')
];

module.exports = validateLoginUser;