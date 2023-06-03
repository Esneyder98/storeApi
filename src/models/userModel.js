const db = require("../datebase/models");

const userModel = {
  create: async (dates) => {
    try {
      const create = await db.usuario.create({
        ...dates,
      });
      return create;
    } catch (error) {
      throw new Error("user not create" + error.message);
    }
  },
  findByUser: async function (username) {
    try {
      const user = await db.usuario.findOne({
        where: {
          username: username,
        },
      });
      return user;
    } catch (err) {
      throw new Error("user not found " + err.message);
    }
  },
};
module.exports = userModel;
