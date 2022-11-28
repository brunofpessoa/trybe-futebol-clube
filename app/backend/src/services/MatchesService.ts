import httpStatus from '../helpers/httpStatus';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { IMatch } from '../interfaces';

interface IRequestFail {
  httpStatus: number,
  message: string,
}

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

  static async insert(body: IMatch): Promise<Matches | IRequestFail> {
    if (body.homeTeam === body.awayTeam) {
      return {
        httpStatus: httpStatus.unprocessableEntity,
        message: 'It is not possible to create a match with two equal teams',
      };
    }

    const homeTeamDb = await Teams.findOne({ where: { id: body.homeTeam } });
    const awayTeamDb = await Teams.findOne({ where: { id: body.awayTeam } });

    if (!homeTeamDb || !awayTeamDb) {
      return {
        httpStatus: httpStatus.notFound,
        message: 'There is no team with such id!',
      };
    }

    return Matches.create({ ...body, inProgress: 1 });
  }

  static async update(id: string, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<[affectedCount: number] | IRequestFail> {
    const idDb = await Matches.findOne({ where: { id } });
    if (!idDb) {
      return {
        httpStatus: httpStatus.notFound,
        message: 'There is no match with such id!',
      };
    }

    return Matches.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );
  }

  static async finish(id: string) {
    const idDb = await Matches.findOne({ where: { id } });
    if (!idDb) {
      return {
        httpStatus: httpStatus.notFound,
        message: 'There is no match with such id!',
      };
    }

    return Matches.update(
      { inProgress: 0 },
      { where: { id } },
    );
  }
}
