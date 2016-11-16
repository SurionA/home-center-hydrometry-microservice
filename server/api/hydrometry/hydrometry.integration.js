'use strict';

import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import Hydrometry from './hydrometry.model';

let app = require('../../app');
let newHydrometry;
let newRoom = {_id: '579b40bb50088b03002850ed'};

describe('Hydrometry API:', () => {

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
          outside_temperature: 25,
          inside_humidity: 40,
          outside_humidity: 50
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
      expect(newHydrometry.outside_temperature).to.equal(25);
      expect(newHydrometry).ownProperty('inside_humidity');
      expect(newHydrometry.inside_humidity).to.equal(40);
      expect(newHydrometry).ownProperty('outside_humidity');
      expect(newHydrometry.outside_humidity).to.equal(50);
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
      expect(hydrometry.outside_temperature).to.equal(25);
      expect(hydrometry).ownProperty('inside_humidity');
      expect(hydrometry.inside_humidity).to.equal(40);
      expect(hydrometry).ownProperty('outside_humidity');
      expect(hydrometry.outside_humidity).to.equal(50);
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
          outside_temperature: 15,
          outside_humidity: 65
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
      expect(updatedHydrometry).ownProperty('inside_humidity');
      expect(updatedHydrometry.inside_humidity).to.equal(40);
      expect(updatedHydrometry).ownProperty('outside_humidity');
      expect(updatedHydrometry.outside_humidity).to.equal(65);
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
          inside_humidity: 55
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
      expect(patchedHydrometry).ownProperty('inside_humidity');
      expect(patchedHydrometry.inside_humidity).to.equal(55);
      expect(patchedHydrometry).ownProperty('outside_humidity');
      expect(patchedHydrometry.outside_humidity).to.equal(65);
      expect(patchedHydrometry).ownProperty('createdAt');
      expect(patchedHydrometry.createdAt).to.not.be.undefined;
      expect(patchedHydrometry.createdAt).to.not.be.null;
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
