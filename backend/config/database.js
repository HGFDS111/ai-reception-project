
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const useSsl = process.env.DB_SSL === "true";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
    ...(useSsl
      ? {
          dialectOptions: {
            ssl: {
              ca: process.env.DB_SSL_CA?.replace(/\\n/g, "\n"),
              rejectUnauthorized: true,
            },
          },
        }
      : {}),
  }
);

export default sequelize;
