"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authentication_middleware_1 = require("../modules/authentication-middleware");
var encryptLib = __importStar(require("../modules/encryption"));
var pool_1 = __importDefault(require("../modules/pool"));
var user_strategy_1 = __importDefault(require("../strategies/user.strategy"));
var router = express_1.default.Router();
// Handles Ajax request for user information if user is authenticated
router.get('/', authentication_middleware_1.rejectUnauthenticated, function (req, res) {
    // Send back user object from the session (previously queried from the database)
    res.send(req.user);
});
// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', function (req, res, next) {
    var username = req.body.username;
    var password = encryptLib.encryptPassword(req.body.password);
    var queryText = "INSERT INTO \"user\" (username, password)\n    VALUES ($1, $2) RETURNING id";
    pool_1.default
        .query(queryText, [username, password])
        .then(function () { return res.sendStatus(201); })
        .catch(function (err) {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
    });
});
// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', user_strategy_1.default.authenticate('local'), function (req, res) {
    res.sendStatus(200);
});
// clear all server session information about this user
router.post('/logout', function (req, res) {
    // Use passport's built-in method to log out the user
    req.logout();
    res.sendStatus(200);
});
exports.default = router;
