angular.module('MyApp')
    .controller('ListShowsCtrl', ['$scope', '$rootScope', 'List', 'Subscription', 'EmailSubscription', 'lodash','$filter', function($scope, $rootScope, List, Subscription, EmailSubscription, lodash, $filter) {

        $scope.shows = List.query(function() {
            //Initialize Display logic arrays

            $scope.showEmailButton = [];
            $scope.showEmailForm = [];
            $scope.showEmailMessage = [];
            $scope.showDontEmail = [];
            $scope.emailMessage = [];

            for (var i = 0; i<$scope.shows.length;i++)
            {

                $scope.showEmailButton[i] = true;
                $scope.showEmailForm[i] = false;
                $scope.showEmailMessage[i] = false;
                $scope.showDontEmail[i] = false;
                $scope.emailMessage[i] = "";
            }
        });
        $scope.showEmailForm = false;
        $scope.email = $rootScope.currentUser.email;
        $scope.chosenDay = [];
        $scope.chosenTime= [];
        $scope.nextDate = [];
        $scope.filteredShows = [];



        $scope.days = [
            { value:0, label:"Sunday"},
            { value:1, label:"Monday" },
            { value:2, label:"Tuesday" },
            { value:3, label:"Wednesday" },
            { value:4, label:"Thurdsay"},
            { value:5, label:"Friday"},
            { value:6, label:"Saturday" }
        ];

        $scope.times = [
            { value:0, label:"00:00"},
            { value:1, label:"01:00" },
            { value:2, label:"02:00" },
            { value:3, label:"03:00" },
            { value:4, label:"04:00"},
            { value:5, label:"05:00"},
            { value:6, label:"06:00" },
            { value:7, label:"07:00" },
            { value:8, label:"08:00" },
            { value:9, label:"09:00" },
            { value:10, label:"10:00" },
            { value:11, label:"11:00" },
            { value:12, label:"12:00" },
            { value:13, label:"13:00" },
            { value:14, label:"14:00" },
            { value:15, label:"15:00" },
            { value:16, label:"16:00" },
            { value:17, label:"17:00" },
            { value:18, label:"18:00" },
            { value:19, label:"19:00" },
            { value:20, label:"20:00" },
            { value:21, label:"21:00" },
            { value:22, label:"22:00" },
            { value:23, label:"23:00" }
        ];

        $scope.setShow = function(idx) {
            $scope.show = $scope.filteredShows[idx];
        };


        $scope.setNextEpisode = function() {
            $scope.recentEps = $scope.show.episodes.filter(function(episode) {
                var date = $filter('getDateString')(episode.firstAired,$scope.show.airsTime);
                var date2 = new Date();
                return date > date2 ;
            });
            $scope.nextEps = $scope.recentEps[0];
            $scope.nextNextEps = $scope.recentEps[1];
            var indexShow = $scope.show.episodes.indexOf($scope.nextEps);
            $scope.prevEps = $scope.show.episodes[indexShow-1];
        };



        $scope.isSubscribed = function() {
            return $scope.show.subscribers.indexOf($rootScope.currentUser._id) !== -1;
        };

        $scope.subscribe = function(idx) {
            var clickedShow = $scope.filteredShows[idx];
            Subscription.subscribe(clickedShow).success(function() {
                clickedShow.subscribers.push($rootScope.currentUser._id);
            });
        };

        $scope.unsubscribe = function(idx) {
            var clickedShow = $scope.filteredShows[idx];
            Subscription.unsubscribe(clickedShow).success(function() {
                var index = clickedShow.subscribers.indexOf($rootScope.currentUser._id);
                clickedShow.subscribers.splice(index, 1);
            });
        };

        $scope.emailClicked = function (idx) {
            $scope.showEmailButton[idx] = false;
            $scope.showEmailForm[idx] = true;
        };

        $scope.cancelClicked = function (idx) {
            $scope.showEmailButton[idx] = true;
            $scope.showEmailForm[idx] = false;
        };

        $scope.saveClicked = function (idx) {
            //logic to show/hide parts of page
            $scope.showEmailForm[idx] = false;
            $scope.showEmailMessage[idx] = true;
            $scope.showDontEmail[idx] = true;
            var alertDayNumber = $scope.chosenDay[idx].value;
            var alertHourNumber = $scope.chosenTime[idx].value;
            /*
            //FIX AIR DATE
            var airDate = $scope.nextDate[idx];
            var airDayNumber = airDate.getDay();
            var airHourNumber = airDate.getHours();
            var carryDay = 0;
            var skip = 0;

            if(alertHourNumber > airHourNumber)
            {
                carryDay = 1;
                if(alertDayNumber === airDayNumber)
                {   airDayNumber +=7;
                }
            }

            //To do property difference correctly, make sure airDay is bigger by adding 7
            if (alertDayNumber > airDayNumber)
            {
                airDayNumber += 7;
            }
            var diffDayNumber = airDayNumber - alertDayNumber - carryDay;
            var alertDate = airDate;
            alertDate.setHours(alertHourNumber);
            alertDate.setDate(alertDate.getDate() - diffDayNumber);
            alert("Date after compilation "+alertDate);
            if (alertDate < new Date())
            {
                alertDate.setDate(alertDate.getDate()+7);
                skip = 1;
            }
            alert("Time to alert before now, alert next week. "+alertDate);
            */
            EmailSubscription.emailSubscribe($scope.filteredShows[idx]._id,alertDayNumber,alertHourNumber)
                .success(function() {
                    var showSubscribed = lodash.find($rootScope.currentUser.showsSubscribed, { 'showId': $scope.filteredShows[idx]._id });
                    showSubscribed.toEmail = true;
                    showSubscribed.emailDay = alertDayNumber;
                    showSubscribed.emailHour = alertHourNumber;
            });

        };

        $scope.dontEmail = function (idx) {
            $scope.showDontEmail[idx] = false;
            $scope.showEmailButton[idx] = true;
            $scope.showEmailMessage[idx] = false;
            //implement code with DB
        };

        $scope.shouldEmail = function(idx) {
            //return $scope.showDontEmail[idx];
            return lodash.find($rootScope.currentUser.showsSubscribed, { 'showId': $scope.show._id }).toEmail;
            //implement code with DB, problem with index using currentShow
        };


        /*
         $scope.days = [
         { value:0, label:"0 Day"},
         { value:1, label:"1 Day" },
         { value:2, label:"2 Days" },
         { value:3, label:"3 Days" },
         { value:4, label:"4 Days"},
         { value:5, label:"5 Days"},
         { value:6, label:"6 Days" },
         { value:7, label:"7 Days" }
         ];

         $scope.hours = [
         { value:0, label:"0 Hour"},
         { value:1, label:"1 Hour" },
         { value:2, label:"2 Hours" },
         { value:3, label:"3 Hours" },
         { value:4, label:"4 Hours"},
         { value:5, label:"5 Hours"},
         { value:6, label:"6 Hours" },
         { value:7, label:"7 Hours" },
         { value:8, label:"8 Hours" },
         { value:9, label:"9 Hours" },
         { value:10, label:"10 Hours" },
         { value:11, label:"11 Hours" },
         { value:12, label:"12 Hours" },
         { value:13, label:"13 Hours" },
         { value:14, label:"14 Hours" },
         { value:15, label:"15 Hours" },
         { value:16, label:"16 Hours" },
         { value:17, label:"17 Hours" },
         { value:18, label:"18 Hours" },
         { value:19, label:"19 Hours" },
         { value:20, label:"20 Hours" },
         { value:21, label:"21 Hours" },
         { value:22, label:"22 Hours" },
         { value:23, label:"23 Hours" },
         { value:24, label:"24 Hours" },
         ];
         */
    }]);