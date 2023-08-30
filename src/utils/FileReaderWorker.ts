/* eslint-disable no-restricted-globals */
self.onmessage = (e: MessageEvent<string>) => {
   console.log("🚀 ~ file: FileReaderWorker.ts:2 ~ e:", e);
   console.log(self);
   self.postMessage({});
};

export {};
