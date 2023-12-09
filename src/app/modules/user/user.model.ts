import mongoose, { Schema } from 'mongoose'
import { IOrder, IUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const OrderSchema = new Schema<IOrder>({
  productName: { type: String, required: [true, 'product name is required'] },
  price: { type: Number, required: [true, 'price is required'] },
  quantity: { type: Number, required: [true, 'quantity is required'] },
})

const UserSchema = new Schema<IUser>({
  userId: { type: Number, required: [true, 'userId is required'] },
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    maxlength: [20, 'Password can not be more than 20 characters'],
  },
  fullName: {
    firstName: { type: String, required: [true, 'first name is required'] },
    lastName: { type: String, required: [true, 'last name is required'] },
  },
  age: { type: Number, required: [true, 'age is required'] },
  email: { type: String, required: [true, 'email is required'], unique: true },
  isActive: { type: Boolean, required: [true, 'isActive is required'] },
  hobbies: [{ type: String, required: [true, 'hobbies is required'] }],
  address: {
    street: { type: String, required: [true, 'address is required'] },
    city: { type: String, required: [true, 'city is required'] },
    country: { type: String, required: [true, 'country is required'] },
  },
  orders: [OrderSchema],
})

UserSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds))
  next()
})

UserSchema.pre('find', function (next) {
  this.select('username fullName age email address')
  next()
})

UserSchema.pre('findOne', function (next) {
  this.select('-password')
  next()
})

UserSchema.pre('findOneAndUpdate', function () {
  this.select('-password')
})

const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel
