import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: { type: STRING },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
