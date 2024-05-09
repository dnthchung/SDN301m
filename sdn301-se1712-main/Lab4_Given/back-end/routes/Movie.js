import express from "express"
import createHttpError from "http-errors"
import Movie from "../models/Movie.js"
import { verifyAccessToken } from "../helpers/jwt_helper.js"

const MovieRouter = express.Router()

// Get all
MovieRouter.get('/', async(req, res, next)=>{
    try {
        const movies = await Movie.find({}).populate('genre')
        if(!movies) throw createHttpError.NotFound()
        res.send(movies)
    } catch (error) {
        next(error)
    }
})

// Get by _id
MovieRouter.get('/:id', async(req,res, next)=>{
    try {
        const movie = await Movie.findOne({_id:req.params.id}).populate('genre')
        if(!movie) throw createHttpError.NotFound()
        res.send(movie)
    } catch (error) {
        next(error)
    }
})

// Find by title
MovieRouter.get('/search/:title', async (req, res, next) => {
    try {
        const title = req.params.title
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(title);

        const searchResult = await Movie.find({title: { $regex: searchRgx, $options: "i" }}).populate('genre')
        if(!searchResult) throw createHttpError.NotFound()
        res.send(searchResult)
    } catch (error) {
        next(error)
    }
})

// Create new movie
MovieRouter.post('/create', verifyAccessToken, async (req, res, next) => {
    try {
        const {title, year, genre} = req.body
        if(!title) throw createHttpError.BadRequest()

        const existMovie = await Movie.findOne({title: title})
        if(existMovie) throw createHttpError.Conflict(`${title} movie already existing.`)

        const savedMovie = await Movie.create({title, year, genre})
        res.send(savedMovie)
    } catch (error) {
        next(error)
    }
})

// Update movie
MovieRouter.put('/edit/:id', verifyAccessToken, async (req, res, next)=>{
    try {
        const id = req.params.id
        const {title, year, genre} = req.body
        const updatedMovie = await Movie.findByIdAndUpdate({_id:id}, {title, year, genre}, {new:true})
        if(!updatedMovie) throw createHttpError.BadRequest()
        res.send(updatedMovie)
    } catch (error) {
        next(error)
    }
})

export default MovieRouter