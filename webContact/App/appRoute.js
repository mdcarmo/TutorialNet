tutorialApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: "/app/home/index.html"
    }),

    $routeProvider.when('/about', {
        templateUrl: "app/home/about.html"
    }),

    $routeProvider.when('/contacts', {
        templateUrl: "app/contact/html/contactsList.html",
        controller: "contactController"
    }),

    $routeProvider.when('/contacts/newcontact', {
        templateUrl: "app/contact/html/contactForm.html",
        controller: "contactAddController"
    }),

    $routeProvider.when('/contacts/:id', {
        templateUrl: "app/contact/html/contactForm.html",
        controller: "contactEditController"
    }),

    $routeProvider.when('/users', {
        templateUrl: "app/user/html/usersList.html",
        controller: "userController"
    }),

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);