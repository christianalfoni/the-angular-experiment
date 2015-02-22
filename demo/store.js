angular.module('todomvc')
  .store('todos', function () {
    return {
      list: [],
      isSaving: false,
      isAllChecked: false,
      editedTodo: null,
      showCompleted: true,
      showNotCompleted: true,
      remainingCount: 0,
      completedCount: 0
    }
  })
  .store('routes', function () {
    return {
      active: ''
    }
  });
