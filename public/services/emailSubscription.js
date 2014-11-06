/**
 * Created by Lucas on 14-11-05.
 */
angular.module('MyApp')
    .factory('EmailSubscription', ['$http', function($http) {
        return {
            emailSubscribe: function(showId, dayNumber, hourNumber, user) {
                return $http.post('/api/emailSubscribe', { showId: showId, emailDay: dayNumber, emailHour: hourNumber});
            },
            emailUnsubscribe: function(showId, user) {
                return $http.post('/api/emailUnsubscribe', { showId: showId });
            }
        };
    }]);