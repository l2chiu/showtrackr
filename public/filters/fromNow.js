angular.module('MyApp').
  filter('fromNow', function() {
    return function(date) {

      var now = new Date();
      var dateIsAfterToday = true;
      var afterDate = new Date();
      var beforeDate = new Date();
      var theDate = new Date(date);


      afterDate.setDate(afterDate.getDate() + 28)
      beforeDate.setDate(beforeDate.getDate() - 28)

      //Use Moments to give rough estimate if greater than 28 days difference
      if (theDate > afterDate || theDate < beforeDate) {
        return moment(date).fromNow();
      }
      //Calculate exact time left/passed for next/previous episode
      else {
        var timeDiff = theDate.getTime() - now.getTime();
        if (timeDiff < 0 )
        {
          dateIsAfterToday = false;
        }
        timeDiff = Math.abs(timeDiff);
        var oneDay = 1000 * 60 * 60 * 24;
        var oneHour = 1000 * 60 * 60;
        var oneMinute = 1000 * 60;
        var numDays = Math.floor(timeDiff/oneDay);
        timeDiff = timeDiff - (numDays * oneDay);
        var numHours = Math.floor(timeDiff/oneHour);
        timeDiff = timeDiff - (numHours * oneHour);
        var numMinutes = Math.floor(timeDiff/oneMinute);
        var dayString = "";
        var hourString = "";
        var minuteString = "";

        if (numDays > 0)
        {
          dayString = numDays + " Days ";
        }
        if (numHours> 0)
        {
          hourString = numHours + " Hours ";
        }
        if (numMinutes> 0)
        {
          minuteString = numMinutes + " Minutes ";
        }
        if (dateIsAfterToday)
        {
         return "in " + dayString + hourString + minuteString;
        }
        else
        {
          return dayString + hourString + minuteString + "ago";
        }


        //return theDate.getTime();
        //return "The Date: " + theDate + " Now: " + now +" The Date Time: " + theDate.getTime() + " Now Time: " + now.getTime();
      }
    };
});