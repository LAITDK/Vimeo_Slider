/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/umbraco/umbraco.d.ts" />
angular.module("umbraco.directives")
    .directive('vimeoSlider', (dialogService, entityResource) => {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: '/App_Plugins/Vimeo/vimeo-slider.html',
            require: "ngModel",
            link: ($scope, element, attr, ctrl: umbraco.IUmbracoController) => {}
        };
    });

