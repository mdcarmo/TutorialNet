tutorialApp.factory('contatoDataService', ['$http', '$q',
function ($http, $q) {
    var _contacts = [];

    var _getContacts = function () {
        var deferred = $q.defer();
        var controllerQuery = "contato/GetContatos";

        $http.get(controllerQuery)
          .then(function (result) {
              // Successful
              angular.copy(result.data, _contacts);
              deferred.resolve();
          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;
    }

    var _addContact = function (_contact) {
        var deferred = $q.defer();
        var controllerQuery = "contato/AddContato";

        $http.post(controllerQuery, _contact)
          .then(function (result) {
              //Success
              deferred.resolve();
          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;

    };

    var _updateContact = function (_contact) {
        var deferred = $q.defer();
        var controllerQuery = "contato/UpdateContato";

        $http.post(controllerQuery, _contact)
          .then(function (result) {
              deferred.resolve();
          },
          function (error) {
              deferred.reject();
          });
        return deferred.promise;

    };

    var _deleteContact = function (id) {
        var deferred = $q.defer();
        var controllerQuery = "contato/DeleteContato/" + id;

        $http.post(controllerQuery)
          .then(function (result) {
              deferred.resolve();
          },
          function (error) {
              deferred.reject();
          });
        return deferred.promise;

    };

    function _findContactById(id) {
        var found = null;
        $.each(_contacts, function (i, contact) {
            if (contact.id == id) {
                found = contact;
                return false;
            }
        });
        return found;
    };

    //Expose methods and fields through revealing pattern
    return {
        contatos: _contacts,
        getContacts: _getContacts,
        addContato: _addContact,
        updateContact: _updateContact,
        deleteContact: _deleteContact,
        findContactById: _findContactById
    }
}]);