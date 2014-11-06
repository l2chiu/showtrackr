/**
 * Created by Lucas on 14-10-30.
 */
angular.module('MyApp').
    filter('getDateString', function () {
        return function(date,airsTime) {
            var theDate = new Date(date);
            date = new Date(theDate.getTime() + (theDate.getTimezoneOffset() * 60000));

            var hour = Number(airsTime.split(":")[0]);
            var minute = Number(airsTime.split(":")[1].split(" ")[0]);
            var pm = airsTime.split(" ")[1];

            if(pm==="pm" || pm === "PM")
            {
                hour +=12;
            }
            date.setHours(hour);
            date.setMinutes(minute);

            return date;
        };
    });
