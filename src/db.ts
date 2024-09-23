import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('trullo', 'apiuser', 'password123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: (msg) => console.log(msg),
})

/* sequelize.sync()
    .then(() => {
        console.log('Database synced successfully.')
    })
    .catch((error) => {
        console.error('Error syncing database:', error)
    }) */

export default sequelize
