"use strict";
// No changes should be required in this file
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encryptPassword = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var SALT_WORK_FACTOR = 10; // This determines how secure the salt should be
var encryptPassword = function (password) {
    var salt = bcryptjs_1.default.genSaltSync(SALT_WORK_FACTOR); // This generates a random salt
    // This next line hashes the user password and the random salt
    // this salt and hash (and not the actual password) will then get stored in the database
    return bcryptjs_1.default.hashSync(password, salt);
};
exports.encryptPassword = encryptPassword;
var comparePassword = function (candidatePassword, storedPassword) {
    /*
    This takes in the candidate password (what the user entered) to check it.
    The stored password has the original salt, so it will run the
    candidate password and salt through the same hashing process as before.
    If that result is the same as the stored password, then we have a match!
    If this interests you, check out this video https://www.youtube.com/watch?v=8ZtInClXe1Q
    */
    return bcryptjs_1.default.compareSync(candidatePassword, storedPassword);
};
exports.comparePassword = comparePassword;
