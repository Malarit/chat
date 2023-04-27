import { Sequelize } from "sequelize";

import { config } from "../config/config.js";

const sequelize = new Sequelize(
  config.db.DATABASE,
  config.db.USERNAME,
  config.db.PASSWORD,
  {
    host: config.db.HOST,
    dialect: config.db.DIALECT,
  }
);

export const runDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("\x1b[34m%s\x1b[0m", "bd on");
  } catch (e) {
    console.log("bd error: ", e);
  }
};

export default sequelize;
