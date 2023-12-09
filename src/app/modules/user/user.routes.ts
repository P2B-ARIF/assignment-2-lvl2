import express from "express";
import { UserController } from "./user.controller";
const router = express.Router()


router.post('/api/users', UserController.createUser)
router.get('/api/users', UserController.getUsers)
router.get('/api/users/:userId', UserController.getSingleUser)
router.delete('/api/users/:userId', UserController.deleteSingleUser)
router.put('/api/users/:userId', UserController.updateUser)

router.put('/api/users/:userId/orders', UserController.createOrder)
router.get('/api/users/:userId/orders', UserController.getUserOrders)
router.get('/api/users/:userId/orders/total-price', UserController.getTotalPrice)


export const userRoutes = router