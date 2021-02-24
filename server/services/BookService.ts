import { Pool, PoolClient, QueryResult } from 'pg';
import pool from '../modules/pool'

//Duck-Type, for a complicated dataset object type safety
interface Book {
    id: number, //optional 
    title: string,
    author: string
}


export default class BookService {

    private db: Pool;

    constructor(pool: Pool) {
        this.db = pool
    }

    private async executeQuery(query: string, values: string[]): Promise<Book[]> {

        const result = await this.db.query(query, values);
        return result.rows;

    }

    async addBook(book: Book): Promise<number> {
        let results = await this.executeQuery(
            `INSERT INTO "books" ("title", "author") VALUES ($1, $2) RETURNING "id";`,
            [book.title, book.author]);
        return results[0].id;
    }


    async getBooks(): Promise<Book[]> {
        let dbRes = await this.executeQuery(
            `SELECT * FROM "books"`, []);
        return dbRes;
    }


    async deleteBookById(id: string): Promise<void> {
        await this.executeQuery(
            `DELETE FROM "books" WHERE id = $1`, [id]
        );
    }
}