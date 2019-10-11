import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions
  .region('europe-west2')
  .https.onRequest((_request, response) => {
    response.send('Hello world!');
  });
