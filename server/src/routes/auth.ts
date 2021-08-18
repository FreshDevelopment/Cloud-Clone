import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../middlewares/validate-fields';
import { login } from '../controllers/auth';

const router = Router();

router.post(
	'/login',
	[
		check('email', 'Mail is required').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		validateFields,
	],
	login
);

export default router;
