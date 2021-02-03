"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectUnauthenticated = void 0;
var rejectUnauthenticated = function (req, res, next) {
    // check if logged in
    if (req.isAuthenticated()) {
        // They were authenticated! User may do the next thing
        // Note! They may not be Authorized to do all things
        next();
    }
    else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
};
exports.rejectUnauthenticated = rejectUnauthenticated;
