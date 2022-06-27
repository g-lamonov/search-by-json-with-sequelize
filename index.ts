import { Sequelize } from "sequelize-typescript";
import { Op, WhereOptions, } from "sequelize";

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
  try {
    await sequelize.sync();

    const word = 'Ivan';
    const firstResult = await UserProfile.findAll({
      include: [{
        model: User,
        where: {
          changes: {
            '"firstName"': word
          }
        }
      }],
    })

    const secondResult = await UserProfile.findAll({
      include: [{
        model: User,
        where: {
          'changes.firstName': word
        }
      }],
    })

    const thirdResult = await UserProfile.findAll({
      include: [{
        model: User,
        where: {
          changes: {
            firstName: word
          }
        }
      }],
    })

    const firstResultStringified = JSON.stringify(firstResult, null, 1);
    const secondResultStringified = JSON.stringify(secondResult, null, 1);
    const thirdResultStringified = JSON.stringify(thirdResult, null, 1);

    const stringifiedStrings = [
      firstResultStringified,
      secondResultStringified,
      thirdResultStringified
    ]
  
    const allEqual = stringifiedStrings => stringifiedStrings.every(str => str === stringifiedStrings[0])
    const areAllTheSame = allEqual(stringifiedStrings);

    if (areAllTheSame) {
      console.log('The search is correct')
    }


  } catch (err) {
    console.log(err);
  }
}

main();
