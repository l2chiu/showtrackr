angular.module('MyApp')
  .factory('Subscription', ['$http', function($http) {
    return {
      emailSubscribe: function(showId, dayNumber, hourNumber, user) {
        return $http.post('/api/emailSubscribe', { showId: showId, toEmail:true, emailDay: dayNumber, emailHour: hourNumber});
      },
      emailUnsubscribe: function(showId, user) {
        return $http.post('/api/emailUnsubscribe', { showId: showId });
      }
    };
  }]);