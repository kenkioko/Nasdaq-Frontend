export const environment = {
  production: true,

  // the env var for accesing the nasdaq api
  api: {
    // api base url 
    base_url: "https://data.nasdaq.com",

    // the endpoints for the data
    endpoint: "/api/v3/datasets",

    // the api key on account settings
    key: "",
  }
};
