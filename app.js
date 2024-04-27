// Import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoute from './api/routes/userRoute.js'
import podcastRoute from './api/routes/podcastRoute.js';
const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(bodyParser.json());
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.get('/', (req, res) => {
    res.send('Hello, welcome to our Node.js backend!');
});
app.use('/userRoute', userRoute)
app.use('/podcastRoute',podcastRoute)
mongoose
    .connect('mongodb+srv://asmamughal097:016wPL37Yoscp7Eb@cluster0.jlpafag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(8080, () => console.log(`Server Running at 8080`))
        console.log('Connected successfully to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
export default app;
