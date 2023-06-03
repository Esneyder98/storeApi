const res = require("express/lib/response");
const db = require("../datebase/models");

const articleModel={
    findByStore: async(store_id) =>{
        try {
            const list = await db.article.findAll({
                where:{
                    store_id : store_id,
                },
            });
            return list;
        } catch (error) {
            throw new Error("article not found: "+error.message);
        }
    },
}