"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
const db_validator_1 = require("../helpers/db-validator");
const validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = express_1.Router();
router.get('/', users_1.getUsers);
router.get('/:id', [
    express_validator_1.check('id', 'Id is not valid').isMongoId(),
    express_validator_1.check('id').custom(db_validator_1.existsUserById),
    validate_fields_1.default,
], users_1.getUser);
router.post('/', [
    express_validator_1.check('firstName', 'First name can not be empty').not().isEmpty(),
    express_validator_1.check('lastName', 'Last name can not be empty').not().isEmpty(),
    express_validator_1.check('email', 'Email can not be empty').not().isEmpty(),
    express_validator_1.check('password', 'Password can not be empty').not().isEmpty(),
    express_validator_1.check('password', 'Password must have 8 or more letters')
        .optional()
        .isLength({
        min: 8,
    }),
    express_validator_1.check('email', 'Email is not valid').optional().isEmail(),
    express_validator_1.check('email').custom(db_validator_1.emailExists),
    express_validator_1.check('role').optional().custom(db_validator_1.isRoleValid),
    validate_fields_1.default,
], users_1.postUser);
router.put('/:id', [
    validate_jwt_1.validateJWT,
    express_validator_1.check('id', 'Id is not valid').isMongoId(),
    express_validator_1.check('email', 'Email is not valid').optional().isEmail(),
    express_validator_1.check('id').custom(db_validator_1.existsUserById),
    express_validator_1.check('role').optional().custom(db_validator_1.isRoleValid),
    validate_fields_1.default,
], users_1.putUser);
router.delete('/:id', [
    validate_jwt_1.validateJWT,
    express_validator_1.check('id', 'Id is not valid').isMongoId(),
    express_validator_1.check('id').custom(db_validator_1.existsUserById),
    validate_fields_1.default,
], users_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map