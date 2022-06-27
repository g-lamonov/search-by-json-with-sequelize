/* Dependencies */
import { v4 as UUIDV4 } from "uuid";
import * as bcrypt from 'bcrypt';

/* Models */
import UserProfile from "../user-profile/user-profile.model";

/* Typings */
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  AllowNull,
  IsUUID,
  Default,
  HasOne,
  Is,
  IsEmail,
  Length,
  Unique,
} from "sequelize-typescript";
import { STRING } from "sequelize";
import { userScopes } from "./user.scopes";
import { UserChanges } from "./user.interface";
import { UserRole } from "./user.enum";

@Table({
  timestamps: true,
  paranoid: true,
  scopes: userScopes,
})
@Table({ tableName: "Users" })
export default class User extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(() => UUIDV4())
  @Column({ type: DataType.UUID })
  declare id: string;

  @Length({
    min: 2,
    max: 32,
    msg: "field 'firstName' must be between 2 and 32 characters",
  })
  @Column(STRING(32))
  firstName!: string;

  @Length({
    min: 2,
    max: 32,
    msg: "field 'lastName' must be between 2 and 32 characters",
  })
  @Column(STRING(32))
  lastName!: string;

  @Is({
    args: /^[a-z0-9_]{2,32}$/,
    msg: "field 'username' must be a valid username",
  })
  @Unique
  @AllowNull(false)
  @Column(STRING(32))
  username!: string;

  @IsEmail
  @Unique
  @AllowNull(false)
  @Column(STRING(64))
  email!: string;

  @AllowNull(false)
  @Column({
    type: STRING(128),
    set(value: string) {
      const salt = bcrypt.genSaltSync(10);
      const hash = value ? bcrypt.hashSync(value, salt) : '';

      this.setDataValue('password', hash);
    },
    get() {
      return this.getDataValue('password');
    }
  })
  password!: string;

  @Default("user")
  @Column(DataType.ENUM("admin", "moderator", "user"))
  role!: UserRole;

  @Default({})
  @Column(DataType.JSONB)
  changes: UserChanges;

  /** ASSOCIATIONS */

  @HasOne(() => UserProfile, { foreignKey: "user_id" })
  declare profile: UserProfile;
}
