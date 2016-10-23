'use strict';

import request from 'supertest';
import { expect } from 'chai';
import Hydrometry from './hydrometry.model';

let app = require('../../app');
let newHydrometry;
let newRoom;

describe('Hydrometry API:', () => {

  before(done => {
      request(app)
        .post('/api/rooms')
        .send({
          name: 'Room Test'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          newRoom = res.body;
          Hydrometry.remove({})
            .then(() => done())
        });
  });

  after(done => {
    request(app)
      .delete('/api/rooms/' + newRoom._id)
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  describe('GET /api/hydrometries', () => {
    let hydrometries;

    beforeEach(done => {
      request(app)
        .get('/api/hydrometries')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          hydrometries = res.body;
          done();
        });
    });

    it('should respond with JSON array', () => {
      expect(hydrometries).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/hydrometries', () => {
    beforeEach(done => {
      request(app)
        .post('/api/hydrometries')
        .send({
          room: newRoom._id,
          inside_temperature: 20,
          humidity: 40
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          newHydrometry = res.body;
          done();
        });
    });

    it('should respond with the newly created hydrometry', () => {
      expect(newHydrometry).to.be.instanceOf(Object);
      expect(newHydrometry).ownProperty('_id');
      expect(newHydrometry._id).to.not.be.undefined;
      expect(newHydrometry._id).to.not.be.null;
      expect(newHydrometry).ownProperty('room');
      expect(newHydrometry.room).to.equal(newRoom._id);
      expect(newHydrometry).ownProperty('inside_temperature');
      expect(newHydrometry.inside_temperature).to.equal(20);
      expect(newHydrometry).ownProperty('outside_temperature');
      expect(newHydrometry.outside_temperature).to.equal(0);
      expect(newHydrometry).ownProperty('humidity');
      expect(newHydrometry.humidity).to.equal(40);
      expect(newHydrometry).ownProperty('createdAt');
      expect(newHydrometry.createdAt).to.not.be.undefined;
      expect(newHydrometry.createdAt).to.not.be.null;
    });

  });

  describe('GET /api/hydrometries/:id', () => {
    let hydrometry;

    beforeEach(done => {
      request(app)
        .get('/api/hydrometries/' + newHydrometry._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          hydrometry = res.body;
          done();
        });
    });

    afterEach(() => {
      hydrometry = {};
    });

    it('should respond with the requested hydrometry', () => {
      expect(hydrometry).to.be.instanceOf(Object);
      expect(hydrometry).ownProperty('_id');
      expect(hydrometry._id).to.not.be.undefined;
      expect(hydrometry._id).to.not.be.null;
      expect(hydrometry).ownProperty('room');
      expect(hydrometry.room).to.equal(newRoom._id);
      expect(hydrometry).ownProperty('inside_temperature');
      expect(hydrometry.inside_temperature).to.equal(20);
      expect(hydrometry).ownProperty('outside_temperature');
      expect(hydrometry.outside_temperature).to.equal(0);
      expect(hydrometry).ownProperty('humidity');
      expect(hydrometry.humidity).to.equal(40);
      expect(hydrometry).ownProperty('createdAt');
      expect(hydrometry.createdAt).to.not.be.undefined;
      expect(hydrometry.createdAt).to.not.be.null;
    });

  });

  describe('PUT /api/hydrometries/:id', () => {
    let updatedHydrometry;

    beforeEach(done => {
      request(app)
        .put('/api/hydrometries/' + newHydrometry._id)
        .send({

          _id: newHydrometry._id,
          outside_temperature: 15
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          updatedHydrometry = res.body;
          done();
        });
    });

    afterEach(() => {
      updatedHydrometry = {};
    });

    it('should respond with the updated hydrometry', () => {
      expect(updatedHydrometry).to.be.instanceOf(Object);
      expect(updatedHydrometry).ownProperty('_id');
      expect(updatedHydrometry._id).to.not.be.undefined;
      expect(updatedHydrometry._id).to.not.be.null;
      expect(updatedHydrometry).ownProperty('room');
      expect(updatedHydrometry.room).to.equal(newRoom._id);
      expect(updatedHydrometry).ownProperty('inside_temperature');
      expect(updatedHydrometry.inside_temperature).to.equal(20);
      expect(updatedHydrometry).ownProperty('outside_temperature');
      expect(updatedHydrometry.outside_temperature).to.equal(15);
      expect(updatedHydrometry).ownProperty('humidity');
      expect(updatedHydrometry.humidity).to.equal(40);
      expect(updatedHydrometry).ownProperty('createdAt');
      expect(updatedHydrometry.createdAt).to.not.be.undefined;
      expect(updatedHydrometry.createdAt).to.not.be.null;
      // expect(updatedHydrometry).ownProperty('updatedAt');
      // expect(updatedHydrometry.updatedAt).to.not.be.undefined;
      // expect(updatedHydrometry.updatedAt).to.not.be.null;
    });

  });

  describe('PATCH /api/hydrometries/:id', () => {
    let patchedHydrometry;

    beforeEach(done => {
      request(app)
        .put('/api/hydrometries/' + newHydrometry._id)
        .send({
          _id: newHydrometry._id,
          humidity: 55
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          patchedHydrometry = res.body;
          done();
        });
    });

    afterEach(() => {
      patchedHydrometry = {};
    });

    it('should respond with the updated hydrometry', () => {
      expect(patchedHydrometry).to.be.instanceOf(Object);
      expect(patchedHydrometry).ownProperty('_id');
      expect(patchedHydrometry._id).to.not.be.undefined;
      expect(patchedHydrometry._id).to.not.be.null;
      expect(patchedHydrometry).ownProperty('room');
      expect(patchedHydrometry.room).to.equal(newRoom._id);
      expect(patchedHydrometry).ownProperty('inside_temperature');
      expect(patchedHydrometry.inside_temperature).to.equal(20);
      expect(patchedHydrometry).ownProperty('outside_temperature');
      expect(patchedHydrometry.outside_temperature).to.equal(15);
      expect(patchedHydrometry).ownProperty('humidity');
      expect(patchedHydrometry.humidity).to.equal(55);
      expect(patchedHydrometry).ownProperty('createdAt');
      expect(patchedHydrometry.createdAt).to.not.be.undefined;
      expect(patchedHydrometry.createdAt).to.not.be.null;
      // expect(patchedHydrometry).ownProperty('updatedAt');
      // expect(patchedHydrometry.updatedAt).to.not.be.undefined;
      // expect(patchedHydrometry.updatedAt).to.not.be.null;
    });

  });

  describe('DELETE /api/hydrometries/:id', () => {

    it('should respond with 204 on successful removal', done => {
      request(app)
        .delete('/api/hydrometries/' + newHydrometry._id)
        .expect(204)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with 404 when hydrometry does not exist', done => {
      request(app)
        .delete('/api/hydrometries/' + newHydrometry._id)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

  });

});
