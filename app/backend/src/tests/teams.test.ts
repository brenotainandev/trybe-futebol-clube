import * as sinon from 'sinon';
import * as chai from 'chai';
import StatusCode from '../types/status.code.types';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamModel';

const mockTeams = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
  {
    "id": 5,
    "teamName": "Cruzeiro"
  },
  {
    "id": 6,
    "teamName": "Ferroviária"
  },
  {
    "id": 7,
    "teamName": "Flamengo"
  },
  {
    "id": 8,
    "teamName": "Grêmio"
  },
  {
    "id": 9,
    "teamName": "Internacional"
  },
  {
    "id": 10,
    "teamName": "Minas Brasília"
  },
  {
    "id": 11,
    "teamName": "Napoli-SC"
  },
  {
    "id": 12,
    "teamName": "Palmeiras"
  },
  {
    "id": 13,
    "teamName": "Real Brasília"
  },
  {
    "id": 14,
    "teamName": "Santos"
  },
  {
    "id": 15,
    "teamName": "São José-SP"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
];

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /teams', () => {
  describe('Retornando todos os times', () => {

    before(async () => {
      sinon.stub(Teams, "findAll").resolves(mockTeams as any);
    });

    after(()=>{
      (Teams.findAll as sinon.SinonStub).restore();
    })

    it('Testa se retorna todos os times', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.equal(Number(StatusCode.OK));
      expect(response.body).to.deep.equal(mockTeams);
    });
  });

});

describe('Testa a rota /teams:id', () => {
  describe('Retorna o time pesquisado', () => {
    const [team] = mockTeams;

    before(async () => {
      sinon.stub(Teams, "findByPk").resolves(team as any);
    });

    after(()=>{
      (Teams.findByPk as sinon.SinonStub).restore();
    })

    it('Testa se retorna o time com o id indicado na a rota /teams/:id', async () => {
      const response = await chai.request(app).get('/teams/1');

      expect(response.status).to.equal(Number(StatusCode.OK));
      expect(response.body).to.deep.equal(team);
    });
  });

});
