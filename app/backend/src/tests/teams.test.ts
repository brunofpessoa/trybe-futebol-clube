import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';
import { allTeamsMock, teamMock } from './mocks/teams';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da rota /teams', () => {
  afterEach(()=>{ sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Deve retornar status 200 e a lista dos times', async () => {
    sinon.stub(Teams, "findAll").resolves(allTeamsMock as Teams[]);

    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsMock);
  });

  it('Deve retornar status 200 e um time correspondente ao id', async () => {
    sinon.stub(Teams, "findOne").resolves(teamMock as Teams);

    chaiHttpResponse = await chai.request(app).get('/teams/1')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamMock);
  });
});
