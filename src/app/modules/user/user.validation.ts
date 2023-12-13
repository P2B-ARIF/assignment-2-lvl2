import { z } from 'zod'

const OrderZodSchema = z.object({
  productName: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number(),
})

const UserZodSchema = z.object({
  userId: z.number(),
  username: z.string().min(1),
  password: z.string().min(1).max(20),
  fullName: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),
  age: z.number(),
  email: z.string().min(1).email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
  }),
})

export { UserZodSchema }
