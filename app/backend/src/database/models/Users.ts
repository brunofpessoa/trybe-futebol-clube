import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  username: { type: STRING },
  role: { type: STRING },
  email: { type: STRING },
  password: { type: STRING },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
