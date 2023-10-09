import { PrismaClient } from '@prisma/client'
import {Router} from 'express'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany({select: {id: true, name: true, image: true}})
    res.status(200).json(allUsers)
})

router.post('/', async (req, res) => {
    const {email, name, username} = req.body
    try {
        const result = await prisma.user.create({data: {email, name, username, bio: "Hello, I'm new on Twitter"}})
        res.status(201).json(result)
    } catch (error) {
       res.status(400).json({message: "The username and email should be unique"}) 
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    const user = await prisma.user.findUnique({where: {id: Number(id)}, include: {tweets: true}})
    res.status(200).json(user)
})

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {name, bio, image} = req.body
    try {
        const result = await prisma.user.update({where: {id: Number(id)},
    data: {name, bio, image}})
    res.status(200).json(result)
    } catch (error) {
       res.status(400).json({message: "Failed to update the user"}) 
    }
})

router.delete('/:id', async(req, res) => {
    const {id} = req.params
    try {
        await prisma.user.delete({where: {id: Number(id)}})
        res.sendStatus(200)
    } catch (error) {
        res.status(400).json({error: `Could not find user with id: ${id}`})
    }

})


export default router