const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const express = ('express');
//const app = express();
const app = require('src/counters.js');
module.exports = app;

const sinon = require('sinon');
const proxyquire = require ('proxyquire');


//mock database
const CounterDBMock = {
    getData: sinon.stub().returns(Promise.resolve('mock data')),
};

//inject mock databse with proxyquire
const counters = proxyquire('src/counters.js', {
    'src/counters.js': CounterDBMock
});

//const app = counters;

describe('Counters API', () => {
   
    //Unit test for GET
    describe('GET /counters/', () => {
        it('should return counters', (done) => {
            request(app)
                .get('/counters/')  //HTTP GET request to the /counters/ endpoint
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);    //succesfull request
                    expect(res.body).to.be.an('object');
                    done();
                });
        });
    });
    //Unit test for POST
    describe('POST /counters', () => {
        it('should create a new counter', (done) => {
            const newCounter = { counter: 'newCounter', initialValue: 1 };
            request(app)
                .post('/counters')
                .send(newCounter)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.text).to.equal('New counter created');
                    done();
                });
        });
    });
    
   //Unit Test for PUT
   describe('PUT /counters/:counter', () => {
        it('should increment a counter value', (done) => {
            request(app)
                .put('/counters/testCounter')
                .expect(200, 'Counter incremented', done);
        });

    });

    //Unit Test for DELETE 
    describe('DELETE /counters/:counter', () => {
        it('should decrease a counter value', (done) => {
            request(app)
                .delete('/counters/testCounter')
                .expect(200, 'Counter decreased', done);
        });
    });

    //Unit Test for GET 
    describe('GET /counters/:counter', () => {
        it('should return a specific counter value', (done) => {
            request(app)
                .get('/counters/testCounter')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.property('testCounter');
                    done();
                });
        });
    
    });
});

