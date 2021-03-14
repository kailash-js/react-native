import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

export type OnNotificationFunc = (payload: any) => void;

const listen = (eventName: string, callback: OnNotificationFunc) => {
  eventEmitter.on(eventName, callback);
};

const listenOnce = (eventName: string, callback: OnNotificationFunc) => {
  eventEmitter.once(eventName, callback);
};

const remove = (eventName: string, callback: OnNotificationFunc) => {
  eventEmitter.removeListener(eventName, callback);
};

const emit = (eventName: string, payload: any) => {
  eventEmitter.emit(eventName, payload);
};

export const EventBus = {
  listen,
  listenOnce,
  remove,
  emit,
};
