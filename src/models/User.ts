import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'

class User extends Model {
    public id!: string
    public name!: string
    public email!: string
    public password!: string
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    schema: 'trullo_schema',
    freezeTableName: true,
    timestamps: true,
})

export default User