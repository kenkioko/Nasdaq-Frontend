# Nasdaq

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.

Set environment variables in the files `src/environments/` to increase rate liminting to the data server.
```
// the env var for accesing the nasdaq api
api: {
    // api base url 
    base_url: "https://data.nasdaq.com",

    // the endpoints for the data
    endpoint: "/api/v3/datasets",

    // the api key on account settings
    key: "",
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
