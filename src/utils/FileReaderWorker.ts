/* eslint-disable no-restricted-globals */
self.onmessage = (e: MessageEvent<string>) => {
   console.log(self);
   self.postMessage({});
};

export {};
