import express from "express";
import { getUsers, getUsersById, createUser, updateUser, deleteUser, getAdmins, Register, Login } from "../controllers/UserController.js";
//new jwt
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();
router.get('/token', refreshToken)

router.get('/users', getUsers)  //buat enpoint users, dan ambil method getUser dari controller
router.get('/users/:id', getUsersById)  //buat enpoint users dengan menggunakan parameter id
router.post('/users', createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
//new jwt
router.get('/admins', verifyToken, getAdmins)
router.post('/admins', Register)
router.post('/login', Login)

export default router;