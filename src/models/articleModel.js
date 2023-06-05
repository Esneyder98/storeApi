const res = require("express/lib/response");
const db = require("../datebase/models");

const articleModel = {
  findAll: async () => {
    try {
      const list = await db.article.findAll({});
      return list;
    } catch (error) {
      throw new Error("article not found");
    }
  },
  create: async (data) => {
    try {
      const create = await db.article.create({
        ...data,
      });
      return create;
    } catch (error) {
      console.log(error);
      throw new Error("article not create");
    }
  },
  findByStore: async (store_id) => {
    try {
      const list = await db.article.findAll({
        where: {
          store_id: store_id,
        },
      });
      return list;
    } catch (error) {
      throw new Error("article not found: " + error.message);
    }
  },
  findByOne: async (name, store_id) => {
    try {
      const article = await db.article.findOne({
        where: {
          name: name,
          store_id: store_id,
        },
      });
      return article;
    } catch (error) {
      throw new Error("error" + error.getMessage());
    }
  },
  findByname: async (name) => {
    try {
      const article = await db.article.findOne({
        where: {
          name: name,
        },
      });
      return article;
    } catch (error) {
      throw new Error("error: " + error.getMessage());
    }
  },
  update: async (name, dates) => {
    try {
      let update;
      update = await db.article.update(
        {
          ...dates,
        },
        {
          where: { name: name },
        }
      );
      return update;
    } catch (error) {
      throw new Error("User not update");
    }
  },
  delete: async (name) => {
    try {
      const deletee = await db.article.destroy({
        where: {
          name: name,
        },
      });
      return deletee;
    } catch (error) {
      throw new Error("article not delete");
    }
  },
};

module.exports = articleModel;
