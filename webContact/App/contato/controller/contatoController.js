tutorialApp.controller('contatoController',
    ['$scope', 'contatoDataService', '$location',
    function categoriaController($scope, contatoDataService) {
        $scope.contatos = [];

        loadContactData();

        function loadContactData() {
            contatoDataService.getContacts()
            .then(function () {
                $scope.contatos = contatoDataService.contatos;
            },
                function () {
                })
                .then(function () {
                    $scope.isBusy = false;
                });
        };

        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.contatos.length; //Initially for no filter
        $scope.totalItems = $scope.filteredItems;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.filter = function () {
            $timeout(function () {
                $scope.filteredItems = $scope.filtered.length;
            }, 9000);
        };

        $scope.sort_by = function (predicate) {
            $scope.predicate = predicate;
            $scope.reverse = !$scope.reverse;
        };
    }]);

tutorialApp.controller('contatoAddController',
    ['$scope', 'contatoDataService', '$window', 'toaster',
    function categoriaController($scope, contatoDataService, $window, toaster) {
        $scope.contato = {};
        $scope.isEdit = false;

        $scope.cancelar = function () {
            $window.location = "#/contatos";
        };

        $scope.salvaContato = function () {
            if ($scope.contatoForm.$invalid) return;

            contatoDataService.addContato($scope.contato)
                .then(function () {
                    //$window.location = "#/contatos
                    $scope.contato.nome = '';
                    $scope.contato.sobrenome = '';
                    $scope.contato.email = '';
                    $scope.contato.telefone = '';
                    $scope.contato.endereco = '';

                    toaster.pop('success', "Sucesso", 'Contato cadastrado com sucesso', 5000, 'trustedHtml');
                },
            function () {
                //Error        
            })
        };
    }]);

tutorialApp.controller('contatoEditController',
    ['$scope', 'contatoDataService', '$window', '$routeParams', '$modal',
    function categoriaController($scope, contatoDataService, $window, $routeParams, $modal) {
        $scope.contato = {};
        $scope.isEdit = true;

        var lFirstChange = true;

        if ($routeParams.id) {
            $scope.contato = contatoDataService.findContactById($routeParams.id);
            $scope.$watchCollection('contato', function () {
                if (!lFirstChange) {
                    $('#deleteButton').hide(400);
                }
                lFirstChange = false;
            });
        }

        $scope.cancelar = function () {
            $window.location = "#/contatos";
        };

        $scope.modalDelete = function (size, contato) {
            var modalInstance = $modal.open({
                templateUrl: 'app/contato/html/deleteModal.html',
                controller: function ($scope, $modalInstance, contato) {
                    $scope.contato = contato;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.ok = function (contato) {
                        contatoDataService.deleteContact(contato.id)
                        .then(function () {
                            $window.location = "#/contatos";
                            $modalInstance.close(contato);
                        },
                        function () {
                            //Error        
                        })
                    };
                },
                size: size,
                resolve: {
                    contato: function () {
                        return contato;
                    }
                }
            });
        };

        $scope.saveContact = function () {
            if ($scope.contactForm.$invalid) return;
            contatoDataService.updateContact($scope.contato)
            .then(function () {
                $window.location = "#/contatos";
            },
            function () {
                //Error        
            })
        };
    }]);