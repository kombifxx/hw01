import { Response, Router} from 'express'
import { db } from '../db/in-memory.db'
export const testingRouter = Router()

testingRouter
 .delete('/testing/all-data', (_req, res: Response) => {
    db.videos = []
    res.sendStatus(204)
})