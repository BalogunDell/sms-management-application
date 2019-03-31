import chai from 'chai';
import supertest from 'supertest';
import app from '../src';
import dotenv from 'dotenv';

import customResponseObject from '../src/utils/responses';
import { appWelcomeMessage } from '../src/utils/messages';
import statusCodes from '../src/utils/statusCodes';

dotenv.config();

const request = supertest(app);
const expect = chai.expect;
const baseAPI = '/api/v1';
const routes = [ '/', '/contacts', '/contacts/:id']

describe('SMS API', () => {
  it('should return welcome message', (done)=> {
      request
        .get(baseAPI+routes[0])
        .set({'Content-Type': 'application/json'})
        .end((error, res) => {
          expect(res.status).to.eql(statusCodes.success);
          expect(res.body.message).to.eql(appWelcomeMessage);
        });
      done();
  });
  
  it('should return all contacts', (done)=> {
    request
      .get(baseAPI+routes[1])
      .set({'Content-Type': 'application/json'})
      // .send({ name: 'test name', phoneNumber: '09043212345'})
      .end((error, res) => {
        
        // expect(res.status).to.eql(statusCodes.success);
        console.log(res.body);
      });
    done();
  });
})