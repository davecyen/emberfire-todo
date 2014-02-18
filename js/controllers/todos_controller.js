Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    createTodo: function() {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) {return;}

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    },
    clearCompleted: function() {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },

  remaining: function(){
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function(){
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining'),

  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function() {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  allAreDone: function(key, value){
    if (value===undefined){
      //property being used as a getter
    return !!this.get('length') && this.everyProperty('isCompleted', true);
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('@each.isCompleted'),

  //authentication

  authed: false,
  currentUser: null,

  init: function() {
    this.authClient = new FirebaseSimpleLogin(dbRef, function(error, githubUser) {
      if (error) {
        // an error occurred while logging in
        alert('Authentication failed: ' + error);
      } else if (githubUser) {
        // user authenticated

        console.log('User ID: ' + githubUser.id + ', Provider: ' + githubUser.provider);

        // this.set('authed', true);
        // var userRef = new Firebase(usersPath + '/' + githubUser.username);
        // var controller = this;
        // var properties = {
        //   id: githubUser.username,
        //   name: githubUser.username,
        //   displayName: githubUser.displayName,
        //   avatarUrl: githubUser.avatar_url,
        // };
        // userRef.once('value', function(snapshot) {
        //   var user = Todos.User.create({ ref: userRef });
        //   user.setProperties(properties);
        //   controller.set('currentUser', user);
        // });

      } else {
        // user is logged out
        this.set('authed', false);
      }
    }.bind(this));
  },

  login: function() {
    this.authClient.login('github');
  },

  logout: function() {
    this.authClient.logout();
  }

});
