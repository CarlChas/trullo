import { Request, Response } from 'express'
import Task from '../models/Task'
import User from '../models/User'

export const createTask = async (req: Request, res: Response) => {
    const { title, description, status, assignedTo } = req.body
    try {
        // Check if the user exists (optional validation)
        if (assignedTo) {
            const user = await User.findByPk(assignedTo)
            if (!user) {
                return res.status(404).json({ error: 'Assigned user not found' })
            }
        }

        // Create the task
        const task = await Task.create({
            title,
            description,
            status: status || 'to-do', // Default to "to-do"
            assignedTo,
            createdAt: new Date(),
        })

        res.status(201).json(task)
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task', details: err })
    }
}

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll({
            include: [{ model: User, as: 'assignedUser', attributes: ['id', 'name', 'email'] }]
        })
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' })
    }
}

export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const task = await Task.findByPk(id, {
            include: [{ model: User, as: 'assignedUser', attributes: ['id', 'name', 'email'] }]
        })

        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }

        res.status(200).json(task)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch task' })
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description, status, assignedTo } = req.body
    try {
        // Check if task exists
        const task = await Task.findByPk(id)
        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }

        // Optionally validate assignedTo user
        if (assignedTo) {
            const user = await User.findByPk(assignedTo)
            if (!user) {
                return res.status(404).json({ error: 'Assigned user not found' })
            }
        }

        // Update task fields
        await task.update({ title, description, status, assignedTo })

        res.status(200).json(task)
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task' })
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const task = await Task.findByPk(id)
        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }

        await task.destroy()
        res.status(200).json({ message: 'Task deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' })
    }
}
