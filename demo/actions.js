angular.module('todomvc')
.actions('todoActions', function (flux, actionHelpers) {
    return {
      setRoute(context) {
          var store = flux.get();
          var pathname = context.pathname;
          var showCompleted = pathname === '/#/completed' || pathname === '/#/';
          var showNotCompleted = pathname === '/#/active' || pathname === '/#/';
          store = store.todos.set('showNotCompleted', showNotCompleted);
          store = store.todos.set('showCompleted', showCompleted);
          store = store.routes.set('active', pathname);
          store = actionHelpers.calculateStats(store);
          flux.set(store);
        },
        addTodo(title) {
          var store = flux.get();
          store = store.todos.list.push({
            title: title,
            completed: false
          });
          store = actionHelpers.calculateStats(store);
          flux.set(store);
        },
        toggleAllChecked() {
          var store = flux.get();
          var isCompleted = !store.todos.isAllChecked;
          store.todos.list.forEach(function (todo) {
            store = todo.set('completed', isCompleted);
          });
          store = store.todos.set('isAllChecked', isCompleted);
          store = actionHelpers.calculateStats(store);
          flux.set(store);
        },
        toggleCompleted(todo) {
          var store = flux.get();
          store = todo.set('completed', !todo.completed);
          store = actionHelpers.calculateStats(store);
          flux.set(store);
        },
        editTodo(todo) {
          var store = flux.get();
          store = store.todos.set('editedTodo', store.todos.list.indexOf(todo));
          flux.set(store);
        },
        saveEdit(todo, newTitle) {
          var store = flux.get();
          store = todo.set('title', newTitle);
          store = store.todos.set('editedTodo', null);
          flux.set(store);
        },
        removeTodo(todo) {
          var store = flux.get();
          store = store.todos.list.splice(store.todos.list.indexOf(todo), 1);
          store = actionHelpers.calculateStats(store);
          flux.set(store);
        },
        clearCompleted() {
          var store = flux.get();
          var newList = store.todos.list.filter(function (todo) {
            return !todo.completed;
          });
          store = store.todos.set('list', newList);
          store = actionHelpers.calculateStats(store);
          flux.set(store);
        }
    };
  })
  .factory('actionHelpers', function () {
    return {
      getDisplayedTodos(store) {

        return store.todos.list.filter(function (todo) {
          if (store.todos.showCompleted && todo.completed) {
            return true;
          }
          if (store.todos.showNotCompleted && !todo.completed) {
            return true;
          }
        });

      },
      getCounts(store) {

        return store.todos.list.reduce(function (counts, todo) {
          if (todo.completed) {
            counts.completedCount++;
          } else if (!todo.completed) {
            counts.remainingCount++;
          }
          return counts;
        }, {
          completedCount: 0,
          remainingCount: 0
        });

      },
      calculateStats(store) {

        var counts = this.getCounts(store);
        var displayedTodos = this.getDisplayedTodos(store);
        var isAllChecked = displayedTodos.filter(function (todo) {
          return !todo.completed;
        }).length === 0 && displayedTodos.length !== 0;

        store = store.todos.set('isAllChecked', isAllChecked);
        store = store.todos.set('remainingCount', counts.remainingCount);
        store = store.todos.set('completedCount', counts.completedCount);

        return store;

      }
    }
  });
