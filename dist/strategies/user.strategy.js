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
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var encryptLib = __importStar(require("../modules/encryption"));
var pool_1 = __importDefault(require("../modules/pool"));
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
passport_1.default.deserializeUser(function (id, done) {
    pool_1.default
        .query('SELECT * FROM "user" WHERE id = $1', [id])
        .then(function (result) {
        // Handle Errors
        var user = result && result.rows && result.rows[0];
        if (user) {
            // user found
            delete user.password; // remove password so it doesn't get sent
            // done takes an error (null in this case) and a user
            done(null, user);
        }
        else {
            // user not found
            // done takes an error (null in this case) and a user (also null in this case)
            // this will result in the server returning a 401 status code
            done(null, null);
        }
    })
        .catch(function (error) {
        console.log('Error with query during deserializing user ', error);
        // done takes an error (we have one) and a user (null in this case)
        // this will result in the server returning a 500 status code
        done(error, null);
    });
});
// Does actual work of logging in
passport_1.default.use('local', new passport_local_1.Strategy(function (username, password, done) {
    pool_1.default
        .query('SELECT * FROM "user" WHERE username = $1', [username])
        .then(function (result) {
        var user = result && result.rows && result.rows[0];
        if (user && encryptLib.comparePassword(password, user.password)) {
            // All good! Passwords match!
            // done takes an error (null in this case) and a user
            done(null, user);
        }
        else {
            // Not good! Username and password do not match.
            // done takes an error (null in this case) and a user (also null in this case)
            // this will result in the server returning a 401 status code
            done(null, null);
        }
    })
        .catch(function (error) {
        console.log('Error with query for user ', error);
        // done takes an error (we have one) and a user (null in this case)
        // this will result in the server returning a 500 status code
        done(error, null);
    });
}));
exports.default = passport_1.default;
