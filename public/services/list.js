angular.module('MyApp')
  .factory('List', ['$resource', function($resource) {
    return $resource('/api/listShows');
  }]);