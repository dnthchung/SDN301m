const createHttpError = require("http-errors");
const db = require("../models");
const User = db.user;
const Role = db.role;
const ROLES = db.ROLES;

async function checkExistUser(req, res, next){
    try {
        if(!req.body.email || !req.body.password || !req.body.type){
            throw createHttpError.BadRequest("Email or password, or type is required");
        }
        if(await User.findOne({email: req.body.email})){
            throw createHttpError.BadRequest("This is email existing");
        }
        next();
    } catch (error) {
        next(error);
    }
}

async function checkExistRoles(req, res, next){
    try {
        if(req.body.roles){
            for(let i=0; i< req.body.roles.length; i++){
                if(!ROLES.includes(req.body.roles[i]))
                    throw createHttpError.BadRequest(`Role '${req.body.roles[i]}' does not exist!`);
            }
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    checkExistUser,
    checkExistRoles
}