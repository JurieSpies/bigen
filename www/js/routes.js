angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('welcome', {
    url: '/page1',
    templateUrl: 'templates/welcome.html',
    controller: 'welcomeCtrl'
  })

  .state('signupHtml', {
    url: '/page4',
    templateUrl: 'templates/signupHtml.html',
    controller: 'signupHtmlCtrl'
  })

  .state('loginHtml', {
    url: '/page5',
    templateUrl: 'templates/loginHtml.html',
    controller: 'loginHtmlCtrl'
  })

  .state('nonEmployeesReservation', {
    url: '/page11',
    templateUrl: 'templates/nonEmployeesReservation.html',
    controller: 'nonEmployeesReservationCtrl'
  })

  .state('bigenSubmitDates', {
    url: '/page8',
    templateUrl: 'templates/bigenSubmitDates.html',
    controller: 'bigenSubmitDatesCtrl'
  })

  .state('bigenDateConfirmation', {
    url: '/page9',
	params: {
		reserveSpot: "",
		time: "",
		month: "",
		today: ""		
},
    templateUrl: 'templates/bigenDateConfirmation.html',
    controller: 'bigenDateConfirmationCtrl'
  })

  .state('page10', {
    url: '/page10',
	params: {
		reserveSpot: "",
		time: "",
		month: "",
		today: ""		
},
    templateUrl: 'templates/page10.html',
    controller: 'page10Ctrl'
  })

$urlRouterProvider.otherwise('/page4')


});