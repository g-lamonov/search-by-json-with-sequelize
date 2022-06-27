import { BelongsTo, Column, DataType, ForeignKey, Length, Model, Table } from 'sequelize-typescript';
import User from '../user/user.model';

@Table({ timestamps: true, paranoid: true, tableName: 'UserProfiles' })
export default class UserProfile extends Model<UserProfile> {
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, primaryKey: true })
    id!: string;

    @Length({
        min: 0,
        max: 255,
        msg: 'field \'biography\' must be between 0 and 255 characters',
    })
    @Column(DataType.STRING)
    biography!: string;

    //** ASSOCIATIONS */

    @BelongsTo(() => User)
    owner!: User;
}