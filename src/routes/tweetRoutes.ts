import { PrismaClient } from '@prisma/client'
import {Router} from 'express'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
const allTweets = await prisma.tweet.findMany()
    res.status(200).json(allTweets)
})

router.post('/', async (req, res) => {
    const {content, image, userId} = req.body
    try {
        const result = await prisma.tweet.create({data: {content, image, userId}})
        res.status(201).json(result)
    } catch (error) {
       res.status(400).json({message: "The username and email should be unique"}) 
    }

    res.status(501).json({error: 'Not implemented'})
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    const singleTweet = await prisma.tweet.findUnique({where: {id: Number(id)}})
    if(!singleTweet){
        res.status(404).json({error: `Can't find tweet with id ${id}`})   
    }
    res.status(200).json(singleTweet)
})

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {content, image} = req.body
    try {
        const updatedTweet = await prisma.tweet.update({where: {id: Number(id)}, data: {content, image}}) 
        res.status(200).json(updatedTweet)
    } catch (error) {
        res.status(400).json({error: `Can't update tweet ${id}`})
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        await prisma.tweet.delete({where: {id: Number(id)}})
        res.status(200).json({message: `Tweet with id ${id} is deleted`})
    } catch (error) {
        res.status(400).json({error: `Can't delete tweet ${id}`})
    }
    
})


export default router