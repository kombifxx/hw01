import { Response, Router} from 'express'
import { db } from '../db/in-memory.db'
export const videosRouter = Router({})

videosRouter
 .delete('/testing/all-data', (_, res: Response ) => {
     db.videos.splice(0, db.videos.length)
     res.sendStatus(204)
 })