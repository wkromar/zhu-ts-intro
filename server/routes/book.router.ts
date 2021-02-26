import express, { Request, Response } from 'express';
import pool from '../modules/pool'

const router: express.Router = express.Router();

const BookServiceInstance : BookService = new BookService(pool);

router.get('/', async (req: Request, res: Response) : Promise<void>  => {


})

router.delete('/:id', async (req: Request, res: Response) : Promise<void>  => {


});

router.post('/', async (req: Request, res: Response) : Promise<void>  => {


});

export default router;