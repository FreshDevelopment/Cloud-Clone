"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const generateJwt = (_id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { _id };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Could not generate JWT');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generateJwt;
//# sourceMappingURL=generate-jwt.js.map