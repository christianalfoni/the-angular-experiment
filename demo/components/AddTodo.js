angular.module('todomvc')
  .component('addTodo', function (todoActions) {
    return {
      title: '',
      addTodo() {
        todoActions.addTodo(this.title);
        this.title = '';
      },
      render() {
        return `
          <form id="todo-form" ng-submit="addTodo()">
            <input 
              id="new-todo" 
              placeholder="What needs to be done?" 
              ng-disabled="todos.isSaving"
              ng-model="title"
            />
          </form>
        `;
      }
    };
  });
