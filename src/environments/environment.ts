// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyDUr2P-EYTuMImz6jdH_dkElYMtrJbHUaU',
        authDomain: 'text-bank.firebaseapp.com',
        databaseURL: 'https://text-bank.firebaseio.com',
        projectId: 'text-bank',
        storageBucket: 'text-bank.appspot.com',
        messagingSenderId: '756226275028'
    }
};
