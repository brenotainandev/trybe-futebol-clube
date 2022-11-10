import * as sinon from 'sinon';
import * as chai from 'chai';
import StatusCode from '../types/status.code.types';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UserModel';

const mockUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
};

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {
  describe('Login e Senha corretos', () => {
    const login = { email: 'admin@admin.com', password: 'secret_admin' }
    // @ts-ignore
    before(async () => {
      sinon.stub(Users, "findOne").resolves({
          ...mockUser
        } as Users);
    });
    // @ts-ignore
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Testa se email e senha estão corretos, caso estejá, retorna o codigo 200 e um token', async () => {
      const result = await chai.request(app).post('/login').send(login);

      expect(result.status).to.equal(Number(StatusCode.OK));
      expect(result.body).to.have.key('token');
    });
  });

  describe('Login ou Senha incorretos', () => {
    // @ts-ignore
    before(async () => {
      sinon.stub(Users, "findOne").resolves({
          ...mockUser
        } as Users);
    });
    // @ts-ignore
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Testa se  senha está errada, retornando codigo de erro 401 e a mensagem Incorrect email or password', async () => {
      const result = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'brenotainan'});

      expect(result.status).to.equal(Number(StatusCode.UNAUTHORIZED));
      expect(result.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });

    it('Testa se  o email está errado, retornando codigo de erro 401 e a mensagem Incorrect email or password', async () => {
      const result = await chai.request(app).post('/login').send({ email: 'breno.tainan', password: 'secret_admin'});

      expect(result.status).to.equal(Number(StatusCode.UNAUTHORIZED));
      expect(result.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  });

  describe('Token Valido', () => {
    const login = { email: 'admin@admin.com', password: 'secret_admin' }
    // @ts-ignore
    before(async () => {
      sinon.stub(Users, "findOne").resolves({
          ...mockUser
        } as Users);
    });
    // @ts-ignore
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Testa se retorna a role do usuario ao passar um token valido na rota /login/validate ', async () => {
      const result = await chai.request(app).post('/login').send(login);
      const { token } = result.body;
      const validateToken = await chai.request(app).get('/login/validate')
        .set('authorization', token);

      expect(result.status).to.equal(Number(StatusCode.OK));
      expect(validateToken.body).to.be.deep.equal({ role:'admin' });
    });
  });
});
