tutorialApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: "/app/home/index.html"
    }),

    $routeProvider.when('/sobre', {
        templateUrl: "app/home/sobre.html"
    }),

    $routeProvider.when('/contatos', {
        templateUrl: "app/contato/html/contatoList.html",
        controller: "contatoController"
    }),

    $routeProvider.when('/contatos/novocontato', {
        templateUrl: "app/contato/html/contatoForm.html",
        controller: "contatoAddController"
    }),

    $routeProvider.when('/contatos/:id', {
        templateUrl: "app/contato/html/contatoForm.html",
        controller: "contatoEditController"
    }),

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);