/**
 * GET     /api/hydrometry              ->  index
 * POST    /api/hydrometry              ->  create
 * GET     /api/hydrometry/:id          ->  show
 * PUT     /api/hydrometry/:id          ->  update
 * PATCH   /api/hydrometry/:id          ->  update
 * DELETE  /api/hydrometry/:id          ->  destroy
 */

/**
 * @description Hydrometry Model
 * @param Hydrometry
 */
import Hydrometry from './hydrometry.model';

/**
 * @description API Response Utility functions
 * @param {Function} validationError - Check for Model validation errors
 * @param handleError - Handle errors
 * @param handleEntityNotFound - Handle Entity not found error
 * @param removeEntity - Remove entity from DB
 * @param saveUpdates - Save entity updates to DB
 * @param respondWithResult - Respond with DB results
 */
import {
  validationError,
  handleError,
  handleEntityNotFound,
  removeEntity,
  saveUpdates,
  respondWithResult
} from '../utils';

/**
 * @function index
 * @description Function that returns all allocations
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function index(req, res) {
  return Hydrometry.find().sort('-createdAt').limit(24)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function show
 * @description Function that returns single user by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function show(req, res) {
  return Hydrometry.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function create
 * @description Function that create user by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function create(req, res) {
  return Hydrometry.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(validationError(res));
}

/**
 * @function update
 * @description Function that update user by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return Hydrometry.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(validationError(res));
}

/**
 * @function destroy
 * @description Function that delete user by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function destroy(req, res) {
  return Hydrometry.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export { index, show, create, update, destroy }
