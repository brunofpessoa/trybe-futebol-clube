import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import { token, userCorrectMock, userIncorrectMock } from './mocks/login';
import { validateToken } from '../helpers/jwt';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da rota /login', () => {
  afterEach(()=>{ sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Deve retornar status 200 ao ser acessado com credenciais válidas', async () => {
    before(async () => {sinon.stub(Users, "findOne").resolves(userCorrectMock as Users);});

    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      })
      expect(chaiHttpResponse.status).to.be.equal(200);
      const {token} = chaiHttpResponse.body;
      expect(() => {validateToken(token)}).to.not.throw();
  });

  it('Deve retornar status 400 caso não haja o campo password', async () => {
    before(async () => {sinon.stub(Users, "findOne").resolves(userIncorrectMock as Users);});

    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: 'admin@admin.com',
      })
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Deve retornar status 400 caso não haja o campo email', async () => {
    before(async () => {sinon.stub(Users, "findOne").resolves(userIncorrectMock as Users);});

    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        password: 'secret_admin',
      })
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  })

  it('Deve retornar status 401 em caso de email inexistente', async () => {
    before(async () => {sinon.stub(Users, "findOne").resolves(userIncorrectMock as Users);});

    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: 'invalid@email.com',
        password: 'secret_admin',
      })
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Incorrect email or password" });
  });

  it('Deve retornar status 401 em caso de password incompatível', async () => {
    before(async () => {sinon.stub(Users, "findOne").resolves(userIncorrectMock as Users);});

    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'wrong-password',
      })
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Incorrect email or password" });
  });

  it('Deve retornar status 200 e o role correto do usuário', async () => {
    before(async () => {sinon.stub(Users, "findOne").resolves(userCorrectMock as Users);});

    chaiHttpResponse = await chai
       .request(app).get('/login/validate').set('authorization', token)
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'admin' });
  });

  it('Deve retornar status 401 uma mensagem de token inválido em caso de token inexistente', async () => {
    // Token inexistente
    chaiHttpResponse = await chai
       .request(app).get('/login/validate').set('authorization', '')
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid token' });

    // Token inválido
    chaiHttpResponse = await chai
       .request(app).get('/login/validate').set('authorization', 'this is an invalid token')
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid token' });
  });

});
