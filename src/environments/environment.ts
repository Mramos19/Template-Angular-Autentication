// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiSecurity: 'http://192.168.1.115/Identity/Services/',
  apiUrl: 'http://localhost:5000/Services/',
  tokenKey: 'TokenAppProduction',
  menuKey: 'MenuAppProduction',
  urlHome: "http://localhost:4200/#/Home",
  applicationId: 110
};
