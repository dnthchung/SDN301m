const createHttpError = require("http-errors");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { TokenExpiredError } = require("jsonwebtoken");
const {user: User, role: Role} = db;

async function verifyToken(req, res, next){
    try {
        const requestToken = req.headers["x-access-token"];
        if(!requestToken){
            throw createHttpError.Unauthorized("No token provided");
        }

        jwt.verify(requestToken, config.secret, (err, decode) => {
            if(err){
                const message = err instanceof TokenExpiredError ? "This token expired" : err.message;
                throw createHttpError.Forbidden(message);
            }
            req.userId = decode.id;
            next();
        });
    } catch (error) {
        next(error);
    }
}

async function isModerator(req, res, next){
    try {
        const existUser = await User.findById(req.userId).exec();
        if(!existUser)
            throw createHttpError.NotFound("User not found");

        const roles = await Role.find({_id : {$in: existUser.roles}}).exec();
        if(!roles)
            throw createHttpError.Forbidden("Forbidden access");
        
        for(let i = 0; i< roles.length; i++){
            if(roles[i].name == "mod"){
                next();
                return;
            }
        }
        throw createHttpError.Forbidden("Role Moderator is required");
    } catch (error) {
        next(error);
    }
}

async function isAdministrator(req, res, next){
    try {
        const existUser = await User.findById(req.userId).exec();
        if(!existUser)
            throw createHttpError.NotFound("User not found");

        const roles = await Role.find({_id : {$in: existUser.roles}}).exec();
        if(!roles)
            throw createHttpError.Forbidden("Forbidden access");
        
        for(let i = 0; i< roles.length; i++){
            if(roles[i].name == "admin"){
                next();
                return;
            }
        }
        throw createHttpError.Forbidden("Role Administrator is required");
    } catch (error) {
        next(error);
    }
}

const verifyJWT = {verifyToken, isModerator, isAdministrator};
module.exports = verifyJWT;