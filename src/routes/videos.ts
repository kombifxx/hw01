import {Request, Response, Router} from 'express'
import { db } from '../db/in-memory.db'
import { Video } from "../types/interface";
import { validateCreateVideo, validateUpdateVideo } from '../validation'

export const videosRouter = Router()

videosRouter
    .get('/videos', (_ , res: Response) => {
        res.status(200).send(db.videos)
    })

    .get('/videos/:id', (req: Request, res: Response) => {
        const video = db.videos.find((d) => d.id === +req.params.id)
        if (!video) {
            return res.status(404).send({
                errorsMessages: [{ message: "Video not found", field: "id" }]
            });
        }
        res.status(200).send(video)
    })

    .post('/videos', (req: Request, res: Response) => {
        const errors = validateCreateVideo(req.body)
        if (errors.length) return res.status(400).send({ errorsMessages: errors })

        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            title: req.body.title.trim(),
            author: req.body.author.trim(),
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 86400000).toISOString(), // +1 день
            availableResolutions: req.body.availableResolutions
        }

        db.videos.push(newVideo)
        res.status(201).send(newVideo)
    })

    .put('/videos/:id', (req: Request, res: Response) => {
        const video = db.videos.find(v => v.id === +req.params.id)
        if (!video) return res.sendStatus(404)

        const errors = validateUpdateVideo(req.body)
        if (errors.length) return res.status(400).send({ errorsMessages: errors })

        // обновляем
        video.title = req.body.title.trim()
        video.author = req.body.author.trim()
        video.availableResolutions = req.body.availableResolutions
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction
        video.publicationDate = req.body.publicationDate

        res.sendStatus(204)
    })
    .delete('/videos/:id', (req: Request, res: Response) => {
        const idx = db.videos.findIndex(v => v.id === +req.params.id)
        if (idx === -1) return res.status(404).send({ errorsMessages: [{ message: "Video not found", field: "id" }] })
        db.videos.splice(idx, 1)
        res.sendStatus(204)
    })

