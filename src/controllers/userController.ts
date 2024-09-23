import { Request, Response } from 'express'
import User from '../models/User'

export const createUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, email, password } = req.body
    try {
        const user = await User.create({ name, email, password })
        res.status(201).json(user)
    } catch (err: any) {
        console.error('Error creating user:', err)
        const errorMessage = (err as Error).message || 'Unknown error'
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Validation error', details: err.errors });
        }
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already in use' });
        }
        res.status(500).json({ error: 'Failed to create user', details: err.message })
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (err) {
        console.error('Error fetching users:', err)
        res.status(500).json({ error: 'Failed to fetch users' })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, email, password } = req.body

    try {
        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        user.name = name || user.name
        user.email = email || user.email
        user.password = password || user.password

        await user.save()

        res.json(user)
    } catch (err) {
        console.error('Error updating user:', err)
        res.status(500).json({ error: 'Failed to update user' })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        await user.destroy()

        res.json({ message: 'User deleted successfully' })
    } catch (err) {
        console.error('Error deleting user:', err)
        res.status(500).json({ error: 'Failed to delete user' })
    }
}