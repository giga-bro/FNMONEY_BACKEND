import { Request, Response } from 'express';
import Task from '../models/Task';

interface CustomRequest extends Request {
    userId: string;
}

const createTask = async (req: CustomRequest, res: Response) => {
    const { title, description , userId } = req.body;

    try {
        const task = new Task({ title, description, userId: userId });
        await task.save();

        res.status(201).send(task);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const getTasks = async (req: CustomRequest, res: Response) => {
    console.log('Request',req);
    try {
        const tasks = await Task.find({ userId:req.userId});

        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const updateTask = async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    

    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).send(task);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const deleteTask = async (req: CustomRequest, res: Response) => {
    const { id } = req.params;

    try {
        await Task.findByIdAndDelete(id);

        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

export { createTask, getTasks, updateTask, deleteTask };
