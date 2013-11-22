define(function(require) {

  var Controller = require('lavaca/mvc/Controller');
  var merge = require('mout/object/merge');
  var stateModel = require('app/models/StateModel');
  var Parse = require('parse');

  /**
   * Base controller
   * @class app.net.BaseController
   * @extends Lavaca.mvc.Controller
   */
  var BaseController = Controller.extend(function(){
      Controller.apply(this, arguments);
    }, {
    updateState: function(historyState, title, url, stateProps){
      var defaultStateProps = {pageTitle: title};
      this.history(historyState, title, url)();

      stateProps = merge(stateProps || {}, defaultStateProps);
      stateModel.apply(stateProps, true);
      stateModel.trigger('change');
    },
    exec: function(action, params) {
      var redirect = _shouldRedirect.call(this, action, params);

      if (redirect) {
        return this.redirect(redirect);
      } else {
        return Controller.prototype.exec.apply(this, arguments);
      }
    },
    isAuthenticated: function() {
      return !!Parse.User.current();
    }
  });

  function _shouldRedirect(action, params) {
    var redirect;
    if (!params.bypassAuthentication && !this.isAuthenticated()) {
      redirect = '/login';
    }
    return redirect;
  }

  return BaseController;

});