//ngMessages
var app = angular.module('myApp', ['ngMessages']);

/* Password Check */
app.directive('pwCheck', [function () {
    return {
        restrict: 'A', // Attribute, or Element, or Class, or M(comment)
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                });
            });
        }
    }
}]);
