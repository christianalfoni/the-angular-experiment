angular.module('todomvc')
  .component('todoItem', function (todoActions) {
    return {
      editedTitle: '',
      toggleCompleted(todo) {
        todoActions.toggleCompleted(todo);
      },
      edit(todo) {
        todoActions.editTodo(todo);
      },
      remove(todo) {
        todoActions.removeTodo(todo);
      },
      saveEdit(todo) {
        todoActions.saveEdit(todo, this.editedTitle);
      },
      focus() {
        var input = this.getDOMNode().find('input')[1];
        input.value = input.value;
        input.focus();
      },
      componentWillMount() {
        this.editedTitle = this.todo.title;
        var index = this.$index;
        var focus = this.focus.bind(this);
        this.$watch('todos.editedTodo', function (editIndex) {
          if (editIndex === index) {
            setTimeout(focus, 0);
          }
        });
      },
      componentDidMount() {
        if (this.$index === this.todos.editedTodo) {
          this.focus();
        }
      },
      render() {
        return `
          <li ng-class="{completed: todo.completed, editing: $index == todos.editedTodo}">
            <div class="view">
              <input class="toggle" type="checkbox" ng-checked="todo.completed" ng-click="toggleCompleted(todo)">
              <label ng-dblclick="edit(todo)">{{todo.title}}</label>
              <button class="destroy" ng-click="remove(todo)"></button>
            </div>
            <form ng-submit="saveEdit(todo)">
              <input class="edit" ng-trim="false" ng-model="editedTitle" ng-blur="saveEdit(todo)"/>
            </form>
          </li>
        `;
      }
    };
  });
