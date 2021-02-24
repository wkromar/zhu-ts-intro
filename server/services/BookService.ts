import pool from '../modules/pool'

//Duck-Type, for a complicated dataset object type safety
interface Book {
    id?: number, //optional 
    title: string,
    author: string
}


export default class BookService {

    async addBook(book: Book): Promise<number> {
        let result = await pool.query(
            `INSERT INTO "books" ("title", "author") VALUES ($1, $2) RETURNING "id";`,
            [book.title, book.author]);
        return result.rows[0].id;
    }


    async getBooks(): Promise<Book[]> {
        let dbRes = await pool.query(
            `SELECT * FROM "books"`
        );
        return dbRes.rows;
    }


    async deleteBookById(id: string): Promise<void> {
        await pool.query(
            `DELETE FROM "books" WHERE id = $1`,
            [id]
        );
    }
}