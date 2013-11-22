define(function(require) {

  var BaseView = require('./BaseView');
  var router = require('lavaca/mvc/Router');
  var stateModel = require('app/models/StateModel');
  var Parse = require('parse');
  require('rdust!templates/signup');

  /**
   * Example view type
   * @class app.ui.views.SignupView
   * @extends app.ui.views.BaseView
   */
  var SignupView = BaseView.extend(function() {
    BaseView.apply(this, arguments);
    this.mapEvent({
      form: {
        submit: this.onFormSubmit.bind(this)
      }
    });
  }, {
    /**
     * The name of the template used by the view
     * @property {String} template
     * @default 'signup'
     */
    template: 'templates/signup',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'signup'
     */
    className: 'signup login',
    onFormSubmit: function(e) {
      e.preventDefault();
      var form = this.el.find('form'),
          email = form.find('[name="email"]').val(),
          password = form.find('[name="password"]').val(),
          userModel = new Parse.User();
      userModel.set({
        username: email,
        password: password,
        email: email
      });
      userModel.signUp().then(function() {
        stateModel.set('user', Parse.User.current());
        router.exec('/');
      }, function(err) {
        console.log(err);
      });
    }

  });

  return SignupView;

});
