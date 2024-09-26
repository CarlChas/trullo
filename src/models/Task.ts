import { DataTypes, Model } from "sequelize"
import sequelize from "../db"
import User from '../models/User'

class Task extends Model {
    public id!: string
    public title!: string
    public description!: string
    public status!: 'to-do' | 'in progress' | 'blocked' | 'done'
    public assignedTo!: string
    public createdAt!: Date
    public finishedBy!: Date | null
}
Task.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('to-do', 'in progress', 'blocked', 'done'),
        defaultValue: 'to-do',
        allowNull: false,
    },
    assignedTo: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    finishedBy: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'Tasks',
    schema: 'trullo_schema',
    freezeTableName: true,
    timestamps: true,
})

export default Task