define(function(require) {
  var History = require('lavaca/net/History');
  var HomeController = require('./net/HomeController');
  var Connectivity = require('lavaca/net/Connectivity');
  var Application = require('lavaca/mvc/Application');
  var Translation = require('lavaca/util/Translation');
  var headerView = require('app/ui/views/controls/HeaderView');
  var AuthenticationController = require('app/net/AuthenticationController');
  var Parse = require('parse');
  require('lavaca/ui/DustTemplate');
  require('hammer');
  require('bootstrap');

  Parse.initialize('pmta2qhIL8rrTragjFVB2D7pBwtpejKG0yKA1juM', 'GxJbKLEm4wKFwGydAxnmoRzdfidEU4P96lyURHWk');


  // Uncomment this section to use hash-based browser history instead of HTML5 history.
  // You should use hash-based history if there's no server-side component supporting your app's routes.
  History.overrideStandardsMode();

  /**
   * Global application-specific object
   * @class app
   * @extends Lavaca.mvc.Application
   */
  var app = new Application(function() {
    // Add routes
    this.router.add({
      '/': [HomeController, 'index'],
      '/logout': [AuthenticationController, 'logout', {bypassAuthentication: true}],
      '/login': [AuthenticationController, 'login', {bypassAuthentication: true}],
      '/signup': [AuthenticationController, 'signup', {bypassAuthentication: true}],
      '/forgot-password': [AuthenticationController, 'forgotPassword', {bypassAuthentication: true}]
    });
    // Initialize messages
    Translation.init('en_US');
    //render header
    headerView.render();
  });

  // Setup offline AJAX handler
  Connectivity.registerOfflineAjaxHandler(function() {
    var hasLoaded = Translation.hasLoaded;
    alert(hasLoaded ? Translation.get('error_offline') : 'No internet connection available. Please check your settings and connection and try again.');
  });

  return app;

});