import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';
import { allTeamsMock } from './teamsMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da rota /teams', () => {
  let chaiHttpResponse: Response;

  it('Deve retornar status 200 e a lista dos times', async () => {
    sinon.stub(Teams, "findAll").resolves(allTeamsMock as Teams[]);

    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsMock);
  });
});
