const createHttpError = require("http-errors");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

// signUp action
async function signUp(req, res, next) {
    try {
        if (req.body) {
            const newUser = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, parseInt(process.env.PASSWORD_KEY)),
                type: req.body.type
            });

            if (req.body.roles) {
                // Admin create new User
                const roles = await Role.find({ name: { $in: req.body.roles } }).exec();
                // Update roles field -> newUser
                newUser.roles = roles.map(r => r._id);
                await User.create(newUser)
                    .then(addedUser => res.status(201).json(addedUser));
            } else {
                // Visitor create new User
                const role = await Role.findOne({ name: "member" }).exec();
                newUser.roles = [role._id];
                await User.create(newUser)
                    .then(addedUser => res.status(201).json(addedUser));
            }
        }
    } catch (error) {
        next(error);
    }
}

async function signIn(req, res, next) {
    try {
        const existUser = await User.findOne({ email: req.body.email }).populate("roles", "-__v").exec();
        if (!req.body.email || !req.body.password)
            throw createHttpError.BadRequest("Email or password is required");
        if (!existUser)
            throw createHttpError.NotFound(`Email '${req.body.email}' not registered`);
        const isMatchPassword = bcrypt.compareSync(req.body.password, existUser.password);
        if (!isMatchPassword)
            throw createHttpError.Unauthorized("Password incorrect");

        const token = jwt.sign({ id: existUser._id }, config.secret, {
            algorithm: "HS256",
            expiresIn: config.jwtExpiration
        });

        const authorities = [];
        for (let i = 0; i < existUser.roles.length; i++) {
            authorities.push("ROLE_" + existUser.roles[i].name.toUpperCase());
        }

        res.status(200).json({
            id: existUser._id,
            email: existUser.email,
            accessToken: token,
            roles: authorities
        })
    } catch (error) {
        next(error);
    }
}

const AuthController = {
    signUp,
    signIn
};

module.exports = AuthController;

