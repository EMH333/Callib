module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    //"extends": "google",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module"
    },
    "rules": {},
    "parser": '@typescript-eslint/parser',
    "plugins": ['@typescript-eslint'],
};