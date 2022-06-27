import { Sequelize } from "sequelize-typescript";
import { Op, where, literal } from "sequelize";

import UserProfile from "./models/user-profile/user-profile.model";
import User from "./models/user/user.model";

const allEqual = stringifiedStrings => stringifiedStrings.every(str => str === stringifiedStrings[0])

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

    const firstName = 'Ivan';
    const userFirstResult = await UserProfile.findAll({
      include: [{
        model: User,
        where: {
          changes: {
            '"firstName"': firstName
          }
        }
      }],
    })

    const userSecondResult = await UserProfile.findAll({
      include: [{
        model: User,
        where: {
          'changes.firstName': firstName
        }
      }],
    })

    const userThirdResult = await UserProfile.findAll({
      include: [{
        model: User,
        where: {
          changes: {
            firstName
          }
        }
      }],
    })

    const userFirstResultStringified = JSON.stringify(userFirstResult, null, 1);
    const userSecondResultStringified = JSON.stringify(userSecondResult, null, 1);
    const userThirdResultStringified = JSON.stringify(userThirdResult, null, 1);

    const firstStringifiedStrings = [
      userFirstResultStringified,
      userSecondResultStringified,
      userThirdResultStringified
    ]
  
    let areAllTheSame = allEqual(firstStringifiedStrings);

    if (areAllTheSame) {
      console.log('FirstName search is correct')
    }

    const country = 'Brazil';
    const userFourthResult = await UserProfile.findAll({
      include: [{
        model: User,
        where: {
            changes: {
              '"location"': { 
                  '"country"': country
              },
            },
        },
      }],
    })

    const userFifthResult = await UserProfile.findAll({
      include: [{
        model: User,
        where: {
            changes: {
              location: { 
                  country
              },
            },
        },
      }],
    })

    const userFourthResultStringified = JSON.stringify(userFourthResult, null, 1);
    const userFifthResultStringified = JSON.stringify(userFifthResult, null, 1);

    const secondStringifiedStrings = [
      userFourthResultStringified,
      userFifthResultStringified,
    ]

    areAllTheSame = allEqual(secondStringifiedStrings);

    if (areAllTheSame) {
      console.log('Сountry search is correct')
    }
  
  } catch (err) {
    console.log(err);
  }
}

main();
