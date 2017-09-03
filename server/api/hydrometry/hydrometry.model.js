'use strict';

/**
 * @description Hydrometry Model
 * @param Hydrometry
 */

/**
 * @description MongoDB connector
 * @param mongoose
 */
import mongoose from 'mongoose';

/**
 * @description Promise library
 * @param Promise
 */
import Promise from 'bluebird';

/**
 * @description MongoDB Schema
 * @param Schema
 */
import { Schema } from 'mongoose';

// Apply bluebird Promise as Mongoose Promise library
mongoose.Promise = Promise;

/**
 * @description Hydrometry MongoDB Schema
 * @param HydrometrySchema
 * @const
 */
const HydrometrySchema = new Schema({
  room: {
    type: Schema.ObjectId,
    ref: 'room',
    required: true,
    trim: true
  },
  inside_temperature: {
    type: Number, default: 0,
    required: true,
    trim: true
  },
  outside_temperature: {
    type: Number, default: 0,
    required: false,
    trim: true
  },
  inside_humidity: {
    type: Number, default: 0,
    required: true,
    trim: true
  },
  outside_humidity: {
    type: Number, default: 0,
    required: true,
    trim: true
  },
  sunset: {
    type: Number, default: 0,
    required: true,
    trim: true
  },
  sunrise: {
    type: Number, default: 0,
    required: true,
    trim: true
  },
  weather: {
    type: Array, default: [],
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * @description Virtual Method that returns hydrometry data
 */
HydrometrySchema
  .virtual('hydrometry')
  .get(function () {
    return {
      'id': this._id,
      'room': this.room
    };
  });

/**
 * @description Validate if room field is not empty
 */
HydrometrySchema
  .path('room')
  .validate(room => room.length, 'Room cannot be empty');

/**
 * @description Every update set new updatedAt date
 */
HydrometrySchema
  .post('update', function () {
    this.update({},{
      $set: {
        updatedAt: new Date()
      }
    });
  });

/**
 * @exports hydrometrySchema
 * @default
 */
export default mongoose.model('Hydrometry', HydrometrySchema);
