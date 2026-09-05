import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import authRoutes from './routes/auth.routes.js';
import businessRoutes from './routes/business.routes.js';
import serviceTemplateRoutes from './routes/serviceTemplate.routes.js';
import businessServiceRoutes from './routes/businessService.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/business', businessRoutes);

app.use('/api/service-templates', serviceTemplateRoutes);

app.use('/api/business', businessServiceRoutes);

app.get('/', (req, res) => {
  res.send('AI Reception API is running');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение к БД успешно установлено');

    await sequelize.sync({ alter: true });
    console.log('Модели синхронизированы с базой данных');

    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
  }
};

startServer();