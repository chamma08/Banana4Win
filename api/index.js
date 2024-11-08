import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';
import adminProductRoutes from './routes/products.route.js';
/* import bananaRoutes from './routes/banana.route.js'; */

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(error);
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/api/user', UserRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/admin/products', adminProductRoutes);
/* app.use('/api/banana', bananaRoutes); */

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
