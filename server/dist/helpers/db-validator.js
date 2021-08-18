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
exports.existsUserById = exports.isRoleValid = exports.emailExists = void 0;
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const emailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield user_1.default.findOne({ email });
    if (emailExists) {
        throw new Error('Email is already in use');
    }
});
exports.emailExists = emailExists;
const isRoleValid = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const existRole = yield role_1.default.findOne({ role });
    if (!existRole) {
        throw new Error(`Role is required, make sure is a valid one, actual role value: ${role}`);
    }
});
exports.isRoleValid = isRoleValid;
const existsUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_1.default.findById(id);
    if (!existsUser) {
        throw new Error(`Id does not exists: ${id}`);
    }
});
exports.existsUserById = existsUserById;
//# sourceMappingURL=db-validator.js.map