import express, { Request, Response } from 'express';
import BookService from '../services/BookService';
import pool from '../modules/pool'

const router: express.Router = express.Router();

const BookServiceInstance : BookService = new BookService(pool);

router.get('/', async (req: Request, res: Response) : Promise<void>  => {
    try {
        let books = await BookServiceInstance.getBooks();
        if (!books.length) {
          res.sendStatus(404);
          return;
        }
        res.send(books);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }

})

router.delete('/:id', async (req: Request, res: Response) : Promise<void>  => {
    try {
        await BookServiceInstance.deleteBookById(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }

});

router.post('/', async (req: Request, res: Response) : Promise<void>  => {
    try {
        let id = await BookServiceInstance.addBook(req.body);
        if(!id) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(201);
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }

});

export default router;