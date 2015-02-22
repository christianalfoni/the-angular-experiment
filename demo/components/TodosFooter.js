angular.module('todomvc')
  .component('todosFooter', function (todoActions) {
  return {
    clearCompleted() {
      todoActions.clearCompleted();
    },
    render() {
      return `
        <footer id="footer" ng-show="todos.list.length" ng-cloak>
          <span id="todo-count"><strong>{{todos.remainingCount}}</strong>
            <ng-pluralize count="todos.remainingCount" when="{ one: 'item left', other: 'items left' }"></ng-pluralize>
          </span>
          <ul id="filters">
            <li>
              <a ng-class="{selected: routes.active == '/#/'} " href="#/">All</a>
            </li>
            <li>
              <a ng-class="{selected: routes.active == '/#/active'}" href="#/active">Active</a>
            </li>
            <li>
              <a ng-class="{selected: routes.active == '/#/completed'}" href="#/completed">Completed</a>
            </li>
          </ul>
          <button id="clear-completed" ng-click="clearCompleted()" ng-show="todos.completedCount">Clear completed ({{todos.completedCount}})</button>
        </footer>
      `;
    }
  };
});
