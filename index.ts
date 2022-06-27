import { Sequelize } from "sequelize-typescript";
import UserProfile from "./models/user-profile/user-profile.model";
import User from "./models/user/user.model";

const sequelize = new Sequelize({
    database: "dev",
    dialect: "postgres",
    username: "postgres",
    password: "postgres",
});

sequelize.addModels([User, UserProfile]);

async function main() {
  await sequelize.sync();

}

main();
