import { Router } from 'express';
import { check } from 'express-validator';

import {
	deleteUser,
	getUser,
	getUsers,
	postUser,
	putUser,
} from '../controllers/users';
import {
	emailExists,
	isRoleValid,
	existsUserById,
} from '../helpers/db-validator';
import validateFields from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.get('/', getUsers);

router.get(
	'/:id',
	[
		check('id', 'Id is not valid').isMongoId(),
		check('id').custom(existsUserById),
		validateFields,
	],
	getUser
);

router.post(
	'/',
	[
		check('firstName', 'First name can not be empty').not().isEmpty(),
		check('lastName', 'Last name can not be empty').not().isEmpty(),
		check('email', 'Email can not be empty').not().isEmpty(),
		check('password', 'Password can not be empty').not().isEmpty(),
		check('password', 'Password must have 8 or more letters')
			.optional()
			.isLength({
				min: 8,
			}),
		check('email', 'Email is not valid').optional().isEmail(),
		check('email').custom(emailExists),
		check('role').optional().custom(isRoleValid),
		validateFields,
	],
	postUser
);

router.put(
	'/:id',
	[
		validateJWT,
		check('id', 'Id is not valid').isMongoId(),
		check('email', 'Email is not valid').optional().isEmail(),
		check('id').custom(existsUserById),
		check('role').optional().custom(isRoleValid),
		validateFields,
	],
	putUser
);

router.delete(
	'/:id',
	[
		validateJWT,
		check('id', 'Id is not valid').isMongoId(),
		check('id').custom(existsUserById),
		validateFields,
	],
	deleteUser
);

export default router;
