const res = require("express/lib/response");
const db = require("../datebase/models");

const storeModel = {
    create: async (name)=>{
        try {
            const create = await db.store.create({
              name
            })
            return create;
        } catch (error) {
          console.log(error)
          throw new Error("store not create")
        }
    },
    find: async() =>{
        try {
            const list = await db.store.findAll();
            return list;
        } catch (error) {
            throw new Error("store not found: "+error.message);
        }
    },
    findAll: async() =>{
        try {
            const list = await db.store.findAll({
                include: [{ association: "articles" }],
            });
            return list;
        } catch (error) {
            throw new Error("store not found: "+error.message);
        }
    },
    findOne: async(name) =>{
        try{
            const store = await db.store.findOne({
                include: [{ association: "articles" }],
                where: { name: name }
            })
            return store;
        }catch (error) {
            throw new Error("error"+error.getMessage());
        }
    },
    findById: async(id) =>{
        try {
            const store = await db.store.findByPk(id)
            return store;
        }catch(error){
            console.log(error)
            throw new Error("store not found"+error.message)
        }
    },
    delete: async(name) =>{
        try {
            const deletee = await db.store.destroy({
                where: {
                    name:name,   
                },
            });
            return deletee
        } catch (error) {
            throw new Error("store not delete")
        }
    }


};

module.exports = storeModel;