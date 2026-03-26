import { Response, Router} from 'express'
import { db } from '../db/in-memory.db'
export const testingRouter = Router()

testingRouter
 .delete('/all-data', (_req, res: Response) => {
    db.videos = []
    res.sendStatus(204)
})