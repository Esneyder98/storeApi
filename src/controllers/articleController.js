const path = require("path");
const articleModel = require("../models/articleModel");
const storeModel = require("../models/storeModel");
const fs = require("fs");
const { validationResult } = require("express-validator");

const articleApiController = {
  create: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      let { name } = req?.params;
      let { price, store_id } = req?.body;
      if (resultValidation.errors.length > 0) {
        res.status(404).json({
          error: resultValidation.mapped(),
        });
      } else {
        let store = await storeModel.findById(store_id);
        if (store !== null && store !== "undefined" && store !== "") {
          let exist = await articleModel?.findByOne(name, store_id);
          if (exist !== null && exist !== "undefined" && exist !== "") {
            res.status(404).json({
              error: "ya existe article con ese nombre para esa tienda",
            });
          } else {
            let create = await articleModel?.create({ name, price, store_id });
            res.status(201).json({
              create,
            });
          }
        } else {
          res.status(404).json({
            error: "No existe tienda con el id ingresado",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  detail: async (req, res) => {
    try {
      let { name } = req?.params;
      if (name !== null && name !== "undefined" && name !== "") {
        let article = await articleModel.findByname(name);
        if (article !== null && article !== "undefined" && article !== "") {
          res.status(200).json({
            article,
          });
        } else {
          res.status(404).json({
            error: "no exite articulo con ese nombre",
          });
        }
      } else {
        res.status(404).json({
          error: "parametro invalido",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  update: async (req, res) => {
    const resultValidation = validationResult(req);
    let { name } = req?.params;
    let { price, store_id } = req.body;
    if (resultValidation.errors.length > 0) {
      res.status(404).json({
        error: resultValidation.mapped(),
      });
    } else {
      let store = await storeModel.findById(store_id);
      if (store !== null && store !== "undefined" && store !== "") {
        let article = await articleModel.findByOne(name, store_id);
        if (article !== null && article !== "undefined" && article !== "") {
          let update = await articleModel.update(name, { price, store_id });
          if (update[0] == 1) {
            let newArticle = await articleModel.findByOne(name, store_id);
            res.status(200).json({
              message: "Update",
              data: newArticle,
            });
          } else {
            res.status(404).json({
              error: "El articulo ya tiene los atributos ingresados",
            });
          }
        } else {
          res.status(404).json({
            error: `No existe articulo con el nombre: ${name} en esta tienda`,
          });
        }
      } else {
        res.status(404).json({
          error: "Tienda ingresada no existe",
        });
      }
    }
  },
  delete: async (req, res) => {
    try {
      let { name } = req?.params;
      let deletee = await articleModel.delete(name);
      if (deletee == 1) {
        res.status(200).json({
          messaje: "Article deleted",
        });
      } else {
        res.status(404).json({
          error: "No existe articulo con ese nombre",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: `${error.messaje}`,
      });
    }
  },
  listArticles: async (req, res) => {
    try {
      let listArticles = await articleModel.findAll();
      if (
        listArticles !== null &&
        listArticles !== "undefined" &&
        listArticles !== ""
      ) {
        res.status(200).json({ listArticles });
      }
    } catch (error) {
      res.status(404).json({
        error: "no existen registros de articulos",
      });
    }
  },
};

module.exports = articleApiController;
