window.Todos = Ember.Application.create();

Todos.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: new Firebase('https://emberfire-todo.firebaseio.com/')
});

var dbRoot ='https://emberfire-todo.firebaseio.com/';
var dbRef = new Firebase(dbRoot)

var usersPath = dbRoot + "/users";

// var auth = new FirebaseSimpleLogin(firebase, function(error, user) {
//   if (error) {
//     // an error occurred while attempting login
//     console.log(error);
//   } else if (user) {
//     // user authenticated with Firebase
//     console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
//   } else {
//     // user is logged out
//   }
// });
