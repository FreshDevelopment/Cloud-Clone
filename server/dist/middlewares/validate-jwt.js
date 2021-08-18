"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    const { id } = req.params;
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the petition',
        });
    }
    try {
        const { _id } = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = yield user_1.default.findById(_id);
        if (!user) {
            return res.status(401).json({
                msg: 'Token not valid',
            });
        }
        if (!user.condition) {
            return res.status(401).json({
                msg: 'Token not valid',
            });
        }
        if (user.role !== 'ADMIN_ROLE') {
            if (id !== _id) {
                return res.status(401).json({
                    msg: 'Token not valid',
                });
            }
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            error,
            msg: 'Token not valid',
        });
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map