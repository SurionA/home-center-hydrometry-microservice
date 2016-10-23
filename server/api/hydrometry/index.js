'use strict';

/**
 * @description Express Framework Router
 * @param Router
 */
import { Router } from 'express';

/**
 * @description Hydrometry route Controller
 * @param HydrometryController
 */
import * as HydrometryController from './hydrometry.controller';

let router = new Router();

router.get('/', HydrometryController.index);
router.get('/:id', HydrometryController.show);
router.post('/', HydrometryController.create);
router.put('/:id', HydrometryController.update);
router.patch('/:id', HydrometryController.update);
router.delete('/:id', HydrometryController.destroy);

/**
 * @description Configured router for Hydrometry Routes
 * @exports router
 * @default
 */
export default router;
