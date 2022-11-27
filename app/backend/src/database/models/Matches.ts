import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: { type: DataTypes.INTEGER },
  homeTeamGoals: { type: DataTypes.INTEGER },
  awayTeam: { type: DataTypes.INTEGER },
  awayTeamGoals: { type: DataTypes.INTEGER },
  inProgress: { type: DataTypes.BOOLEAN },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
