import { Request, Response } from 'express'
import Task from '../models/Task'

export const createTask = async (req: Request, res: Response) => {
    const { title, description, status, assignedTo } = req.body
    try {
        const task = await Task.create({ title, description, status, assignedTo })
        res.status(201).json(task)
    } catch (err) {
        console.error('Error creating task:', err)
        res.status(500).json({ error: 'Failed to create task' })
    }
}

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll()
        res.status(200).json(tasks)
    } catch (err) {
        console.error('Error fetching tasks:', err)
        res.status(500).json({ error: 'Failed to fetch tasks' })
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description, status, assignedTo, finishedBy } = req.body

    try {
        const task = await Task.findByPk(id)

        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }

        if (title) task.title = title
        if (description) task.description = description
        if (status) task.status = status
        if (assignedTo) task.assignedTo = assignedTo
        if (finishedBy) task.finishedBy = finishedBy

        await task.save()
        res.json(task)
    } catch (err) {
        console.error('Error updating task:', err)
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
        console.error("Error deleting task:", err)
        res.status(500).json({ error: 'Failed to delete task' })
    }
}