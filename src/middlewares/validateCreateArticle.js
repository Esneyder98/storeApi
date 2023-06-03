const { check,body ,param} = require('express-validator');
const path = require('path');
const validateCreateArticle =[
    param('name')
    .notEmpty().withMessage('El parametro nombre es requerido').bail()
    .isLength({min: 2,max: 100}).withMessage('El nombre del articulo debe tener min:2 max:100 caracteres'),
    
    check("price")
    .notEmpty()
    .withMessage("Debes completar el campo precio")
    .bail()
    .isDecimal()
    .withMessage("Debes ingresar un numero decimal")
    .bail()
    .isLength({ min: 1, max: 20 })
    .withMessage("El precio base debe tener min:1 max:20 caracteres"),

    check("store_id")
    .notEmpty()
    .withMessage("Debes completar el campo store_id")
    .bail()
    .isInt()
    .withMessage("Debes ingresar un numero")
    .bail()
    .isLength({ min: 1 ,max:11})
    .withMessage("El precio base debe tener min:1 max:11 caracteres"),
];

module.exports = validateCreateArticle;