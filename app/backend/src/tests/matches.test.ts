import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';
import {
  allMatchesMock,
  createdMatchMock,
  finishedMatchesMock,
  inProgressMatchesMock,
  oneMatchMock,
  teamMock,
  token
} from './mocks/matches';
import Teams from '../database/models/Teams';

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

describe('Testes da rota POST /matches', () => {
  afterEach(()=>{ sinon.restore(); });

  let chaiHttpResponse: Response;

  const validBody = {
    homeTeam: 1,
    awayTeam: 2,
    homeTeamGoals: 1,
    awayTeamGoals: 0,
  };

  const invalidBody = {
    homeTeam: 1,
    awayTeam: 1,
    homeTeamGoals: 1,
    awayTeamGoals: 0,
  }

  it('Deve retornar status 400 e mensagem de token ausente', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches');
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body)
      .to.be.deep.equal({ message: 'Missing token' });
  });

  it('Deve retornar status 400 e mensagem de campos inválidos', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').set('authorization', token);
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body)
      .to.be.deep.equal({ message: 'Fields are missing' });
  });

  it('Deve retornar status 401 e mensagem de token inválido', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/matches').set('authorization', 'invalid').send(validBody);
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body)
      .to.be.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Deve retornar status 422 e mensagem de times iguais', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/matches').set('authorization', token).send(invalidBody);
    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'It is not possible to create a match with two equal teams'
    });
  });

  it('Deve retornar status 404 e mensagem de ID inválido', async () => {
    sinon.stub(Teams, "findOne").resolves(null);

    chaiHttpResponse = await chai.request(app)
      .post('/matches').set('authorization', token).send(validBody);
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'There is no team with such id!'
    });
  });

  it('Deve retornar status 201 e o time criado', async () => {
    sinon.stub(Teams, "findOne").resolves(teamMock as Teams);
    sinon.stub(Matches, "create").resolves(createdMatchMock as Matches);

    chaiHttpResponse = await chai.request(app)
      .post('/matches').set('authorization', token).send(validBody);
    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(createdMatchMock);
  });
});