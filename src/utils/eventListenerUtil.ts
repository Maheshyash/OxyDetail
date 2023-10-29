const eventTypes: string[] = [
  'keypress',
  'mousemove',
  'mousedown',
  'scroll',
  'touchmove',
  'pointermove',
];

export const addEventListeners = (listener: EventListenerOrEventListenerObject) => {
  eventTypes.forEach((type) => {
    window.addEventListener(type, listener, false);
  });
};

export const removeEventListeners = (listener: EventListenerOrEventListenerObject) => {
  if (listener) {
    eventTypes.forEach((type) => {
      window.removeEventListener(type, listener, false);
    });
  }
};
