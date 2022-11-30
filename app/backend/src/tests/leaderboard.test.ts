import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';
import {
  awayLeaderboardMock,
  generalLeaderboardMock,
  homeLeaderboardMock,
  matches,
  teams
} from './mocks/leaderboard';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da rota /leaderboard', () => {
  afterEach(()=>{ sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Deve retornar status 200 e o rank dos times da casa', async () => {
    sinon.stub(Matches, "findAll").resolves(matches as unknown as Matches[]);
    sinon.stub(Teams, "findAll").resolves(teams as Teams[]);

    chaiHttpResponse = await chai.request(app).get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(homeLeaderboardMock);
  });

  it('Deve retornar status 200 e o rank dos times visitantes', async () => {
    sinon.stub(Matches, "findAll").resolves(matches as unknown as Matches[]);
    sinon.stub(Teams, "findAll").resolves(teams as Teams[]);

    chaiHttpResponse = await chai.request(app).get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(awayLeaderboardMock);
  });

  it('Deve retornar status 200 e o rank geral', async () => {
    sinon.stub(Matches, "findAll").resolves(matches as unknown as Matches[]);
    sinon.stub(Teams, "findAll").resolves(teams as Teams[]);

    chaiHttpResponse = await chai.request(app).get('/leaderboard')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(generalLeaderboardMock);
  });
});
