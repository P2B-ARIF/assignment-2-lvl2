import { Request, Response } from 'express'
import { UserServices } from './user.services'
import { UserZodSchema } from './user.validation'

const createUser = async (req: Request, res: Response) => {
    try {
        const zodValidation = UserZodSchema.parse(req.body)
        const result = await UserServices.createUserData(zodValidation)
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getUsers()
        res.status(201).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await UserServices.getSingleUser(userId)
        res.status(201).json({
            success: true,
            message: 'Single user fetched successfully!',
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await UserServices.deleteSingleUser(userId)

        if (!result) {
            return res.status(501).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            })
        }
        res.status(201).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const userData = req.body
        const result = await UserServices.updateUserData(userId, userData)
        if (!result) {
            return res.status(501).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            })
        }
        res.status(201).json({
            success: true,
            message: 'Successfully Update User Data!',
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const order = req.body
        const result = await UserServices.createOrder(userId, order)
        if (!result) {
            return res.status(501).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            })
        }
        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

const getUserOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await UserServices.getUserOrders(userId)
        if (!result) {
            return res.status(501).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            })
        }
        res.status(201).json({
            success: true,
            message: 'Order fetched successfully!',
            data: { orders: result.orders },
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

const getTotalPrice = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await UserServices.getTotalPrice(userId)
        if (!result) {
            return res.status(501).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            })
        }
        res.status(201).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

export const UserController = {
    createUser,
    getUsers,
    getSingleUser,
    deleteSingleUser,
    createOrder,
    updateUser,
    getUserOrders,
    getTotalPrice,
}
