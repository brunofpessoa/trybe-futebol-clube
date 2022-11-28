import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';
import { allMatchesMock, finishedMatchesMock, inProgressMatchesMock } from './mocks/matches';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da rota /matches', () => {
  afterEach(()=>{ sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Deve retornar status 200 e a lista de todas as partidas', async () => {
    sinon.stub(Matches, "findAll").resolves(allMatchesMock as unknown as Matches[]);

    chaiHttpResponse = await chai.request(app).get('/matches')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatchesMock);
  });

  it('Deve retornar status 200 e a lista das partidas em andamento', async () => {
    sinon.stub(Matches, "findAll").resolves(inProgressMatchesMock as unknown as Matches[]);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(inProgressMatchesMock);
  });

  it('Deve retornar status 200 e a lista das partidas finalizadas', async () => {
    sinon.stub(Matches, "findAll").resolves(finishedMatchesMock as unknown as Matches[]);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(finishedMatchesMock);
  });
});
