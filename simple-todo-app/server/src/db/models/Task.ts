import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db'

interface TaskMetadata {
    cookingTime: string | null
}

interface TaskAttributes {
    id: number;
    title: string;
    description?: string;
    status?: string;
}

export interface TaskInput extends Required<TaskAttributes> {}
export interface TaskOutput extends Required<TaskAttributes> {}
export interface GetAllTasksResponse {
    tasks: Task[];
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public status!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Task.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING
    }
}, {
    sequelize: sequelize,
    paranoid: true
})

export default Task