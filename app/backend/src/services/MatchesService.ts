import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  static async getAll() {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, attributes: ['teamName'], as: 'teamHome' },
        { model: Teams, attributes: ['teamName'], as: 'teamAway' },
      ],
    });

    return matches;
  }
}
