import { DataTypes, Model } from "sequelize"
import sequelize from "../db"

class Task extends Model {
    public id!: string
    public title!: string
    public description!: string
    public status!: string
    public assignedTo!: string
    public createdAt!: Date
    public finishedBy!: Date
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
    },
    status: {
        type: DataTypes.ENUM('to-do', 'in progress', 'blocked', 'done'),
        defaultValue: 'to-do',
    },
    assignedTo: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
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