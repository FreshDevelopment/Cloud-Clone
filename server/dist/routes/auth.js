"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
const auth_1 = require("../controllers/auth");
const router = express_1.Router();
router.post('/login', [
    express_validator_1.check('email', 'Mail is required').isEmail(),
    express_validator_1.check('password', 'Password is required').not().isEmpty(),
    validate_fields_1.default,
], auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map