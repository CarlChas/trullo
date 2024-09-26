import express from 'express'
import userRoutes from './routes/userRoutes'
import taskRoutes from './routes/taskRoutes'
import sequelize from './db'

const app = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
    res.send('Henlo, dis is my very epic le wholesome Trullo API')
})

const startServer = () => {
    app.listen(5000, () => {
        console.log('Server running on port 5000')
    })
}

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')

        await sequelize.sync({ alter: true })
        console.log('Database synced successfully.')

        startServer()
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

initializeDatabase()