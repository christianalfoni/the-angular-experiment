angular.module('todomvc')
  .component('todosList', function (todoActions, flux) {
    return {
      toggleAllChecked() {
          todoActions.toggleAllChecked();
      },
      filterTodos(todo) {
        var store = flux.get();
        if (store.todos.showCompleted && todo.completed) {
          return true;
        }
        if (store.todos.showNotCompleted && !todo.completed) {
          return true;
        }
        return false;
      },
      render() {
          return `
            <section id="main">
              <input 
                id="toggle-all" 
                type="checkbox" 
                ng-checked="todos.isAllChecked"
                ng-click="toggleAllChecked()"
              />
              <label for="toggle-all">Mark all as complete</label>
              <ul id="todo-list">
                <todo-item ng-repeat="todo in todos.list | filter:filterTodos track by $index"></todo-item>
              </ul>
            </section>
          `;
        }
    };
  });
