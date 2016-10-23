'use strict';

/**
 * @description Events Emitter
 * @param EventEmitter
 */
import { EventEmitter } from 'events';

/**
 * @description Room MongoDB schema
 * @param Room
 */
import Room from './room.model';

/**
 * @description Room Events Emitter
 * @param RoomEvents
 */
const RoomEvents = new EventEmitter();

RoomEvents.setMaxListeners(0);

/**
 * @description Events to listen on
 * @param events
 */
const events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

/**
 * @description Emit correct event on hooks
 */
for (const e in events) {
  const event = events[e];
  Room.schema.post(e, emitEvent(event));
}

/**
 * @description Emit correct event
 * @function emitEvent
 * @function emitEvent
 * @param event - Event to emit
 */
function emitEvent(event) {
  return (doc, options, done) => {
    RoomEvents.emit(event + ':' + doc._id, doc);
    RoomEvents.emit(event, doc);
    done(null);
  }
}

/**
 * @export RoomEvents
 * @default
 */
export default RoomEvents;
