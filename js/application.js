window.Todos = Ember.Application.create();

Todos.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: new Firebase('https://emberfire-todo.firebaseio.com/')
});
