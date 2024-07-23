import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
const {MONGO_URI} = require('./config/config');
const {PORT} = require('./config/config');
const {DB_NAME} = require('./config/config');
const cors = require('cors');

const app = express();
const port = PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_NAME
  } as ConnectOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
