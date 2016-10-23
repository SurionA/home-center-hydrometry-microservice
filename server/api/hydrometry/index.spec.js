'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

const hydrometryCtrlStub = {
  index: 'hydrometryCtrl.index',
  show: 'hydrometryCtrl.show',
  create: 'hydrometryCtrl.create',
  update: 'hydrometryCtrl.update',
  destroy: 'hydrometryCtrl.destroy'
};

const routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
const hydrometryIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './hydrometry.controller': hydrometryCtrlStub
});

describe('Hydrometry API Router:', function() {

  describe('GET /api/hydrometries', function() {

    it('should route to hydrometry.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'hydrometryCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/hydrometries/:id', function() {

    it('should route to hydrometry.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'hydrometryCtrl.show')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/hydrometries', function() {

    it('should route to hydrometry.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'hydrometryCtrl.create')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/hydrometries/:id', function() {

    it('should route to hydrometry.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'hydrometryCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/hydrometries/:id', function() {

    it('should route to hydrometry.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'hydrometryCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/hydrometries/:id', function() {

    it('should route to hydrometry.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'hydrometryCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

});
