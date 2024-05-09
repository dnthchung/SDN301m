import express from "express"
import createHttpError from "http-errors"
import Genre from "../models/Genre.js"
import { verifyAccessToken } from "../helpers/jwt_helper.js"

const GenreRouter = express.Router()

GenreRouter.get('/', async (req, res, next)=>{
    try {
        const genres = await Genre.find({})
        if(!genres) throw createHttpError.NotFound()
        res.send(genres)
    } catch (error) {
        next(error)
    }
})

GenreRouter.post('/create', verifyAccessToken,  async (req, res, next) => {
    try {
        const {name} = req.body
        if(!name) throw createHttpError.BadRequest()

        const existGenre = await Genre.findOne({name: name})
        if(existGenre) throw createHttpError.Conflict(`${title} already existing.`)

        const savedGenre = await Genre.create({name})
        res.send(savedGenre)
    } catch (error) {
        next(error)
    }
})

export default GenreRouter