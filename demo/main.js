// Deps
import './../node_modules/todomvc-common/base.css';
import './../node_modules/todomvc-app-css/index.css';
import 'angular';
import './../src/flux-angular.js';

// Set module
angular.module('todomvc', ['flux']);

// App
import './store.js';
import './actions.js';
import './components/TodoMvc.js';
import './components/AddTodo.js';
import './components/TodosList.js';
import './components/TodosFooter.js';
import './components/TodoItem.js';
