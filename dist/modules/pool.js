"use strict";
/* the only line you likely need to change is

 database: 'prime_app',

 change `prime_app` to the name of your database, and you should be all set!
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("pg"));
var url_1 = __importDefault(require("url"));
var config = {};
if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    var params = url_1.default.parse(process.env.DATABASE_URL);
    var auth = params.auth.split(':');
    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
    };
}
else {
    config = {
        host: 'localhost',
        port: 5432,
        database: 'prime_app',
        max: 10,
        idleTimeoutMillis: 30000,
    };
}
// this creates the pool that will be shared by all other modules
var pool = new pg_1.default.Pool(config);
// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', function (err) {
    console.log('Unexpected error on idle client', err);
    process.exit(-1);
});
exports.default = pool;
