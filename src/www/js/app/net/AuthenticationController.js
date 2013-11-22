define(function(require) {

  var BaseController = require('app/net/BaseController'),
      stateModel = require('app/models/StateModel'),
      LoginView = require('app/ui/views/LoginView'),
      SignupView = require('app/ui/views/SignupView'),
      ForgotPasswordView = require('app/ui/views/ForgotPasswordView'),
      Parse = require('parse');

  /**
   * Authentication controller
   * @class app.net.AuthenticationController
   * @extends app.net.BaseController
   */
  var AuthenticationController = BaseController.extend({

    logout: function(params, history) {
      Parse.User.logOut();
      stateModel.set('user', null);
      return this.redirect('/login');
    },

    login: function(params, history) {
      Parse.User.logOut();
      stateModel.set('user', null);
      return this
        .view(null, LoginView, {})
        .then(this.updateState(history, 'Login', params.url));
    },

    signup: function(params, history) {
      return this
        .view(null, SignupView, {})
        .then(this.updateState(history, 'Signup', params.url));
    },

    forgotPassword: function(params, history) {
      return this
        .view(null, ForgotPasswordView, {})
        .then(this.updateState(history, 'Forgot Password', params.url));
    }
  });

  return AuthenticationController;

});
