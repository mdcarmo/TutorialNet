tutorialApp.factory('userDataService', ['$http', '$q',function ($http, $q) {
    var baseAddress = 'http://localhost/MobileService/api/UserService/';
    var url = "";

    return {
        getUsersList: function () {
            url = baseAddress + "GetUsersList";
            return $http.get(url);
        },
        getUser: function (user) {
            url = baseAddress + "GetUser/" + user.UserId;
            return $http.get(url);
        },
        addUser: function (user) {
            url = baseAddress + "AddUser";
            return $http.post(url, user);
        },
        deleteUser: function (user) {
            url = baseAddress + "DeleteUser/" + user.UserId;
            return $http.delete(url);
        },
        updateUser: function (user) {
            url = baseAddress + "ModifyUser/" + user.UserId;
            return $http.put(url, user);
        }
    };
}]);