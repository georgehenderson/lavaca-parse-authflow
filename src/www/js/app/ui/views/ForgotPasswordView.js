define(function(require) {

  var BaseView = require('./BaseView');
  var Parse = require('parse');
  require('rdust!templates/forgot-password');

  /**
   * Example view type
   * @class app.ui.views.ForgotPasswordView
   * @extends app.ui.views.BaseView
   */
  var ForgotPasswordView = BaseView.extend(function() {
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
    template: 'templates/forgot-password',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'login'
     */
    className: 'forgot-password login',

    onFormSubmit: function(e) {
      e.preventDefault();
      var form = this.el.find('form'),
          email = form.find('[name="email"]').val();
      Parse.User.requestPasswordReset(email).then(function() {
        this.redraw('.login-note', {
          noteType: 'success',
          note: 'An email has been sent with instructions on how to reset your password.'
        });
      }.bind(this), function(error) {
        this.redraw('.login-note', {
          noteType: 'error',
          note: error.message
        });
      }.bind(this));
    }

  });

  return ForgotPasswordView;

});