import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  static async getAll(inProgress: string | undefined) {
    const teams = [
      { model: Teams, attributes: ['teamName'], as: 'teamHome' },
      { model: Teams, attributes: ['teamName'], as: 'teamAway' },
    ];

    if (inProgress === 'true') {
      return Matches.findAll({ include: teams, where: { inProgress: 1 } });
    }
    if (inProgress === 'false') {
      return Matches.findAll({ include: teams, where: { inProgress: 0 } });
    }
    return Matches.findAll({ include: teams });
  }
}
