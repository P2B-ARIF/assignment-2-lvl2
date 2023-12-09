import { IOrder, IUser } from './user.interface'
import UserModel from './user.model'

const createUserData = async (userData: IUser) => {
    const result = await UserModel.create(userData)
    return result
}

const getUsers = async () => {
    const result = await UserModel.find()
    return result
}

const getSingleUser = async (userId: number): Promise<IUser | null> => {
    const result = await UserModel.findOne({ userId })
    return result
}

const deleteSingleUser = async (userId: number) => {
    const result = await UserModel.findOneAndDelete({ userId: userId })
    return result 
}

const updateUserData = async (userId: number, userData: IUser) => {
    const result = await UserModel.findOneAndUpdate(
        { userId: userId },
        { $set: userData },
        { new: true },
    )
    return result
}

const createOrder = async (userId: number, order: IOrder) => {
    const result = await UserModel.findOneAndUpdate(
        { userId: userId },
        { $push: { orders: order } },
    )
    return result
}

const getUserOrders = async (userId: number) => {
    const result = await UserModel.findOne({ userId })
    return result
}

const getTotalPrice = async (userId: number) => {
    const result = await UserModel.aggregate([
        { $match: { userId: Number(userId) } },
        { $unwind: '$orders' },
        {
            $group: {
                _id: '$_id',
                totalPrice: {
                    $sum: {
                        $multiply: ['$orders.price', '$orders.quantity'],
                    },
                },
            },
        },
        {
            $project: { _id: 0, totalPrice: 1 },
        },
    ])
    if (result.length > 0) {
        return result[0]
    } else {
        return null
    }
}

export const UserServices = {
    createUserData,
    getUsers,
    getSingleUser,
    deleteSingleUser,
    createOrder,
    updateUserData,
    getUserOrders,
    getTotalPrice,
}
