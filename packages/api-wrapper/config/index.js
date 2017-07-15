// native
// npm
const confidence = require('confidence');
//local
const endpoints = require('./endpoints');

const store = new confidence.Store();

store.load(endpoints);

exports.lookup = (key='/', criteria={}) => {
    return store.get(key, Object.assign(criteria, { env: process.env.NODE_ENV }));
};


