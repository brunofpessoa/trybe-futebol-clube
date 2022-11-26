import Teams from '../database/models/Teams';

export default class LoginService {
  static async getAll() {
    const teams = await Teams.findAll();

    return teams;
  }

  static async getOne(id: string) {
    const team = await Teams.findOne({ where: { id } });

    return team;
  }
}
