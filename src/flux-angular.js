'use strict';

// When requiring Angular it is added to global for some reason
var angular = global.angular || require('angular') && global.angular;

// Dependencies
var Store = global.Store || require('immutable-store');
var state = {};
var store = null;

// Wrap "angular.module" to attach store method to module instance
var angularModule = angular.module;
angular.module = function () {

  // Call the module as normaly and grab the instance
  var moduleInstance = angularModule.apply(angular, arguments);

  // Attach store method to instance
  moduleInstance.store = function (domain, data) {
    state[domain] = data();
    return this;
  };

  moduleInstance.actions = function (name, spec) {

    moduleInstance.factory(name, ['$injector', function ($injector) {

      var actions = $injector.invoke(spec);
      return actions;

    }]);

    return this;
  };

  moduleInstance.component = function (name, spec) {

    moduleInstance.directive(name, ['$parse', '$injector', function ($parse, $injector) {

      var data = $injector.invoke(spec);

      return {
        restrict: 'E',
        transclude: true,
        replace: true,
        compile: function () {
          return {
            pre: function (scope, element, attrs) {

              scope.getDOMNode = function () {
                return null;
              };
              scope.props = {};

              // Add props to the scope
              Object.keys(attrs).forEach(function (key) {
                if (key[0] !== '$' && key.substr(0, 2) !== 'ng') {
                  scope.props[key] = $parse(attrs[key])(scope) || attrs[key];
                }
              });

              // 
              Object.keys(data).forEach(function (key) {
                if (key !== 'componentWillUnmount' && key !== 'componentWillMount' && key !== 'componentDidMount' && key !== 'render' && typeof data[key] === 'function') {
                  scope[key] = data[key];
                }
              });

              if (data.componentWillMount) {
                data.componentWillMount.call(scope);
              }

              scope.$on('$destroy', function () {
                if (data.componentWillUnmount) {
                  data.componentWillUnmount.call(scope);
                }
              });

            },
            post: function (scope, element) {

              scope.getDOMNode = function () {
                return element;
              };

              if (data.componentDidMount) {
                setTimeout(function () {
                  data.componentDidMount.call(scope);
                }, 0);
              }
              
            }
          }
        },
        template: typeof data.render === 'function' ? data.render : null,
        templateUrl: typeof data.render === 'string' ? data.render : null
      }
    }]);

    return this;

  };

  return moduleInstance;

};

angular.module('flux', [])
  .service('flux', ['$rootScope', function ($rootScope) {
    return {
      get: function () {
        return store;
      },
      set: function (updatedStore) {
        store = updatedStore;
        localStorage.fluxAngularState = JSON.stringify(store);
        requestAnimationFrame(function () {
          var domains = Object.keys(store);
          domains.forEach(function (key) {
            $rootScope[key] = store[key];
          });
          $rootScope.$apply();
        });
      }
    };
  }])
  .run(['$rootScope', 'flux', function ($rootScope, flux) {
    if (localStorage.fluxAngularState) {
      state = JSON.parse(localStorage.fluxAngularState);
    }
    store = Store(state);
    flux.set(store);
  }]);
