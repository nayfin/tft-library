// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:  {
    apiKey: 'AIzaSyClPsiH6DFJc_XvltxqrhLeFRWVm3jUZoo',
    authDomain: 'tft-library.firebaseapp.com',
    databaseURL: 'https://tft-library.firebaseio.com',
    projectId: 'tft-library',
    storageBucket: 'tft-library.appspot.com',
    messagingSenderId: '113394856035'
  },
  VERSION: require('../../package.json').version
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
