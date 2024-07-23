import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { JWT_SECRET } = require('../config/config')

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password: bcrypt.hashSync(password, 8) });
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 86400 });

        res.status(201).send({ message: 'User registered successfully',token,userId:user._id });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const passwordIsValid = user.password ? bcrypt.compareSync(password, user.password) : false;
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 86400 });

        res.status(200).send({ token ,userId:user._id });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

export { register, login };
