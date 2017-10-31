'use strict';

module.exports = function(client) {
  const loadCommand = function (name) {
    require('./' + name)(client.cli);
  };

  client.profile = loadCommand('profile');
};
