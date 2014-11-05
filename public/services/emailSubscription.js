/**
 * Created by Lucas on 14-11-05.
 */
angular.module('MyApp')
    .factory('EmailSubscription', ['$http', function($http) {
        return {
            subscribe: function(show, user) {
                return $http.post('/api/emailSubscribe', { showId: show._id });
            },
            unsubscribe: function(show, user) {
                return $http.post('/api/emailUnsubscribe', { showId: show._id });
            }
        };
    }]);