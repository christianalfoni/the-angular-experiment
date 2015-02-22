import Page from 'page';

angular.module('todomvc')
  .component('todoMvc', function (todoActions) {
    return {
      componentWillMount() {
          if (!location.hash) {
            location.hash = '#/';
          }
          Page('/', todoActions.setRoute);
          Page('/active', todoActions.setRoute);
          Page('/completed', todoActions.setRoute);
          Page.start();
        },
        render() {
          return `
            <div>
              <section id="todoapp">
                <header id="header">
                  <h1>todos</h1>
                  <add-todo></add-todo>
                </header>
                <todos-list ng-if="todos.list.length"></todos-list>
                <todos-footer ng-if="todos.list.length"></todos-footer>
              </section>
              <footer id="info">
                <p>Double-click to edit a todo</p>
                <p>Credits:
                  <a href="http://christianalfoni.com">Christian Alfoni</a>,
                </p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
              </footer>
            </div>
          `;
        }
    };
  })
