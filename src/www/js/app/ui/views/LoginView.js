define(function(require) {

  var BaseView = require('./BaseView');
  var router = require('lavaca/mvc/Router');
  var stateModel = require('app/models/StateModel');
  var Parse = require('parse');
  require('rdust!templates/login');

  /**
   * Example view type
   * @class app.ui.views.LoginView
   * @extends app.ui.views.BaseView
   */
  var LoginView = BaseView.extend(function() {
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
     * @default 'login'
     */
    template: 'templates/login',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'login'
     */
    className: 'login',
    onFormSubmit: function(e) {
      e.preventDefault();
      var form = this.el.find('form'),
          email = form.find('[name="email"]').val(),
          password = form.find('[name="password"]').val();
      Parse.User.logIn(email, password).then(function() {
        stateModel.set('user', Parse.User.current());
        router.exec('/');
      }, function(err) {
        console.log(err);
      });
    }

  });

  return LoginView;

});
