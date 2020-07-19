const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

const populateOwner = require('../../hooks/populate-owner');
// const limitToUser = require('../../hooks/limit-to-user');

const limitToUser = setField({
  from: 'params.user.github_id',
  as: 'params.query.user_id'
})

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [limitToUser],
    get: [limitToUser],
    create: [populateOwner(), limitToUser],
    update: [ populateOwner(), limitToUser ],
    patch: [limitToUser],
    remove: [limitToUser]
  },
  
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
