import { verifyAdmin, verifyUser } from './../utils/verify';
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/userController';
import express from 'express';

const router = express.Router();

// router.get(
//   '/check_auth',
//   verifyToken,
//   (req: Request, res: Response, next: NextFunction) => {
//     res.send('Hello user you are logged in');
//   }
// );

// router.get(
//   '/checkuser/:id',
//   verifyUser,
//   (req: Request, res: Response, next: NextFunction) => {
//     res.send('Hello user you are logged in');
//   }
// );

// router.get(
//   '/checkadmin/:id',
//   verifyAdmin,
//   (req: Request, res: Response, next: NextFunction) => {
//     res.send('Hello Admin');
//   }
// );

//UPDATE
router.put('/:id', verifyUser, updateUser);

//DELETE
router.delete('/:id', verifyUser, deleteUser);

//GET
router.get('/:id', verifyUser, getUser);

//GET ALL
router.get('/', verifyAdmin, getAllUsers);

export default router;
