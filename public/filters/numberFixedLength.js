angular.module('MyApp').
filter('numberFixedLength', function () {
    return function(a,b){
        return(1e4+a+"").slice(-b);
    };
});