// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// import * as dotenv from 'dotenv';

// const result = dotenv.config()
// if (result.error) {
//     throw result.error
// }

// console.error(result.parsed);

export const environment = {
  production: false,
  
  // api variables
  // api: {
  //   key: process.env['API_KEY'],
  //   base_url: process.env['API_BASE_URL'],
  // }

  api: {
    key: "6soAgnD15ThwLQ3SomsZ",
    base_url: "https://data.nasdaq.com/api/v3/datasets/",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
