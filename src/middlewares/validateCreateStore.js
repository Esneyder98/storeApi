const { check,body ,param} = require('express-validator');
const path = require('path');
const validateCreateUsers =[
    param('name')
    .notEmpty().withMessage('El parametro nombre es requerido').bail()
    .isLength({min: 2,max: 100}).withMessage('El nombre de tienda debe tener min:2 max:100 caracteres'),
]

module.exports = validateCreateUsers;