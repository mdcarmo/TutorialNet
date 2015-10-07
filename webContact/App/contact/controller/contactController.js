tutorialApp.controller('contactController',
    ['$scope', 'contactDataService', '$location',
    function categoryController($scope, contactDataService) {
        $scope.contacts = [];

        loadContactData();

        function loadContactData() {
            contactDataService.getContacts()
            .then(function () {
                $scope.contacts = contactDataService.contacts;
            },
                function () {
                })
                .then(function () {
                    $scope.isBusy = false;
                });
        };

        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.contacts.length; //Initially for no filter
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

tutorialApp.controller('contactAddController',
    ['$scope', 'contactDataService', '$window', 'toaster',
    function categoryController($scope, contactDataService, $window, toaster) {
        $scope.contact = {};
        $scope.isEdit = false;

        $scope.cancel = function () {
            $window.location = "#/contacts";
        };

        $scope.saveContact = function () {

            if ($scope.contactForm.$invalid) return;

            contactDataService.addContact($scope.contact)
                .then(function () {
                    $scope.contact.firstName = '';
                    $scope.contact.lastName = '';
                    $scope.contact.email = '';
                    $scope.contact.phone = '';
                    $scope.contact.address = '';
                    toaster.pop('success', "Sucesso", 'Contato cadastrado com sucesso', 5000, 'trustedHtml');
                },
            function () {
                    
            })
        };
    }]);

tutorialApp.controller('contactEditController',
    ['$scope', 'contactDataService', '$window', '$routeParams', '$modal',
    function categoryController($scope, contactDataService, $window, $routeParams, $modal) {
        $scope.contact = {};
        $scope.isEdit = true;

        var lFirstChange = true;

        if ($routeParams.id) {
            $scope.contact = contactDataService.findContactById($routeParams.id);

            $scope.$watchCollection('contact', function () {
                if (!lFirstChange) {
                    $('#deleteButton').hide(400);
                }
                lFirstChange = false;
            });
        }

        $scope.cancel = function () {
            $window.location = "#/contacts";
        };

        $scope.modalDelete = function (size, contact) {
            alert("ateste");

            var modalInstance = $modal.open({
                templateUrl: 'app/contact/html/deleteModal.html',
                controller: function ($scope, $modalInstance, contact) {
                    $scope.contact = contact;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.ok = function (contact) {
                        contactDataService.deleteContact(contact.id)
                        .then(function () {
                            $window.location = "#/mycontacts";
                            $modalInstance.close(contact);
                        },
                        function () {
                            //Error        
                        })
                    };
                },
                size: size,
                resolve: {
                    contact: function () {
                        return contact;
                    }
                }
            });
        };

        $scope.saveContact = function () {
            if ($scope.contactForm.$invalid) return;
            contactDataService.updateContact($scope.contact)
            .then(function () {
                $window.location = "#/contacts";
            },
            function () {
                //Error        
            })
        };
    }]);