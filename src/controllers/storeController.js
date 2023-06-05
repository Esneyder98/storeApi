const path = require("path");
const storeModel = require("../models/storeModel");
const articleModel = require("../models/articleModel");
const fs = require("fs");
const { validationResult } = require("express-validator");
const { log } = require("console");

const storeApiController = {
  create: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      let { name } = req?.params;
      if (resultValidation.errors.length > 0) {
        res.status(404).json({
          errors: resultValidation.mapped(),
        });
      } else {
        let exist = await storeModel?.findOne(name);
        if (exist !== null && exist !== "undefined" && exist !== "") {
          res.status(404).json({
            errors: "ya existe tienda con ese nombre",
          });
        } else {
          let create = await storeModel.create(name);
          res.status(201).json({
            create,
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
        let store = await storeModel.findOne(name);
        if (store !== null && store !== "undefined" && store !== "") {
          res.status(200).json({
            store,
          });
        } else {
          res.status(404).json({
            error: "no exite tienda con ese nombre",
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
  delete: async (req, res) => {
    try {
      let nameStore = req.params?.name;
      if (nameStore !== null && nameStore !== "undefined" && nameStore !== "") {
        let store = await storeModel.findOne(nameStore);
        if (store !== null && store !== "undefined" && store !== "") {
          let idStore = store.id;
          let article = await articleModel.findByStore(idStore);
          if (
            article !== null &&
            article !== "undefined" &&
            article !== "" &&
            article?.length !== 0
          ) {
            res.status(404).json({
              error: "Existen articulos asociados a esta tienda ",
            });
          } else {
            let storeDelete = await storeModel.delete(nameStore);
            if (storeDelete > 0) {
              res.status(200).json({
                message: storeDelete + " tienda eliminada corectamente",
              });
            } else {
              res.status(404).json({
                error: "tienda no eliminada",
              });
            }
          }
        } else {
          res.status(404).json({
            error: "No exite la tienda solicitada",
          });
        }
      } else {
        res.status(404).json({
          error: "Parametro invalido",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  list: async (req, res) => {
    try {
      let listStore = await storeModel.findAll();
      if (listStore !== null && listStore !== "undefined" && listStore !== "") {
        res.status(200).json({ listStore });
      } else {
        res.status(404).json({
          error: "no existen registros de tiendas",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = storeApiController;
