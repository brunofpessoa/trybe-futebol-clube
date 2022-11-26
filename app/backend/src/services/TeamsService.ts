import Teams from '../database/models/Teams';

export default class LoginService {
  static async getAll() {
    const teams = await Teams.findAll();

    return teams;
  }
}
