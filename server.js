import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import petRoutes from './routes/petRoutes.js';
import dotenv from 'dotenv';
import User from './models/User.js';
import Pet from './models/Pet.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://ong-adote-um-bichinho-front-3hgd937tm.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);

const createAdminUser = async () => {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Usuário já existe:', existingUser);
            return;
        }

        const newUser = new User({ username, password, role: 'admin' });
        await newUser.save();
        console.log('Usuário criado:', newUser);
    } catch (error) {
        console.error("Erro ao criar usuário admin:", error);
    }
};

createAdminUser();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));