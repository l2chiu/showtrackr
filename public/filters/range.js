angular.module('MyApp').
    filter('range', function() {
        return function(input, start, end) {
            start = parseInt(start,10);
            end = parseInt(end,10);
            var direction = (start <= end) ? 1 : -1;
            while (start != end) {
                input.push(start);
                start += direction;
            }
            return input;
        };
    });