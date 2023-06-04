const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const boom = require("@hapi/boom");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../datebase/config/config");

const userController = {
  create: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        res.status(400).json({
          errors: resultValidation.mapped(),
        });
      } else {
        let username = await userModel.findByUser(req.body.username);
        if (username) {
          res.status(400).json({
            message: "Usuario ya existe",
          });
        } else {
          let { username, password } = req.body;
          password = bcrypt.hashSync(password, 10);
          const create = await userModel.create({ username, password });
          res.status(201).json({
            messaje: "User created successfully",
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        res.status(400).json({
          errors: resultValidation.mapped(),
        });
      } else {
        let userToLogin = await userModel.findByUser(req.body.username);

        if (userToLogin) {
          let isOkThePassword = bcrypt.compareSync(
            req.body.password,
            userToLogin.password
          );
          if (isOkThePassword) {
            //elimino la clave por seguridad
            delete userToLogin.password;
            //conservar la sesion del usuario
            req.session.userLogged = userToLogin;
            //-----------------------

            const userJWT = req.session.userLogged;
            const payload = {
              sub: userJWT.id,
              role: "admin",
            };
            const token = await jwt.sign(payload, config.development.jwtSecret);
            req.session.token = token;
            //.-------------------
            res.status(200).json({
              acces_tokend: token,
            });
          } else {
            return res.status(404).json({
              message: "Credenciales invalidas",
            });
          }
        } else {
          return res.status(404).json({
            message: "404 user Not Found",
          });
        }
      }
    } catch (error) {
      return error.message;
    }
  },
  logout: (req, res) => {
    try {
      // borro lo que este en sesion
      if (req.session.userLogged) {
        if (req.session.destroy()) {
          return res.status(200).json({
            message: "session ended",
            logout: true,
          });
        }
      } else {
        return res.status(404).json({
          message: "No hay sesion activa",
        });
      }
    } catch (error) {
      return error.message;
    }
  },
};

module.exports = userController;
