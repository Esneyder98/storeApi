const { check,body ,param} = require('express-validator');
const validateCreateUser =[
    check('username')
    .notEmpty().withMessage('El parametro nombre usuario es requerido').bail()
    .isLength({min: 2,max: 45}).withMessage('El usuario debe tener min:2 max:45 caracteres'),
    check('password')
    .notEmpty().withMessage('Debes completar el campo contraseña').bail()
    .isLength({min: 8,max: 45}).withMessage('La contraseña debe tener min:8 max:45 caracteres'),   
];

module.exports = validateCreateUser;