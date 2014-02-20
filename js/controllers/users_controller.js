Todos.UsersController = Ember.ArrayController.extend({

  authed: false,
  currentUser: null,

  init: function() {
    this.authClient = new FirbaseSimpleLogin(dbRef, function(error, githubUser) {
      if (error) {
        // an error occurred while logging in
        alert('Authentication failed: ' + error);
      } else if (githubUser) {
        // user authenticated

        // console.log('User ID: ' + githubUser.id + ', Provider: ' + githubUser.provider);

        this.set('authed', true);
        var userRef = new Firebase(usersPath + '/' + githubUser.username);
        var controller = this;

        var user = this.store.createRecord('user', {
          id: githubUser.username,
          name: githubUser.username,
          displayName: githubUser.displayName,
          avatarUrl: githubUser.avatar_url,
        });
        user.save();

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