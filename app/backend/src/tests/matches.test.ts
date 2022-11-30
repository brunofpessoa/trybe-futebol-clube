import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';
import { allMatchesMock, finishedMatchesMock, inProgressMatchesMock, oneMatchMock } from './mocks/matches';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da rota GET /matches', () => {
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

describe('Testes da rota PATCH /matches/:id/finish', () => {
  afterEach(()=>{ sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Deve retornar status 404 e mensagem de id inválido', async () => {
    sinon.stub(Matches, "findOne").resolves(null);

    chaiHttpResponse = await chai.request(app).patch('/matches/9999/finish')
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body)
      .to.be.deep.equal({ message: 'There is no match with such id!' });
  });

  it('Deve retornar status 200 e mensagem de partida finalizada', async () => {
    sinon.stub(Matches, "findOne").resolves(oneMatchMock as unknown as Matches);
    sinon.stub(Matches, "update").resolves([1] as [affectedCount: number]);

    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body)
      .to.be.deep.equal({ message: 'Finished' });
  });
});

describe('Testes da rota PATCH /matches/:id', () => {
  afterEach(()=>{ sinon.restore(); });

  let chaiHttpResponse: Response;

  const body = {
    homeTeamGoals: 2,
    awayTeamGoals: 3,
  }

  it('Deve retornar status 400 e mensagem de request inválido', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1').send({})
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body)
      .to.be.deep.equal({ message: 'Fields are missing' });
  });

  it('Deve retornar status 404 e mensagem de id inválido', async () => {
    sinon.stub(Matches, "findOne").resolves(null);

    chaiHttpResponse = await chai.request(app).patch('/matches/9999').send(body)
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body)
      .to.be.deep.equal({ message: 'There is no match with such id!' });
  });

  it('Deve retornar status 200 ao atualizar corretamente o placar', async () => {
    sinon.stub(Matches, "findOne").resolves(oneMatchMock as unknown as Matches);
    sinon.stub(Matches, "update").resolves([1] as [affectedCount: number]);

    chaiHttpResponse = await chai.request(app).patch('/matches/1').send(body);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body)
      .to.be.deep.equal({"affectedCount": [1]});
  });
});