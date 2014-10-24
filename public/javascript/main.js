var app = angular.module('main', ['ngTable']).
controller('DemoCtrl', function($scope, ngTableParams, $http, $sce) {
    var data = [];
    $scope.init = function() {
        data = [{
            name: "Moroni",
            plan: {
                Sun: 4,
                Mon: 0,
                Tue: 8,
                Wed: 4,
                Thu: 0,
                Fri: 8,
                Sat: 8
            }
        }, {
            name: "Tiancum",
            plan: {
                Sun: 4,
                Mon: 0,
                Tue: 8,
                Wed: 4,
                Thu: 0,
                Fri: 8,
                Sat: 8
            }
        }, {
            name: "Jacob",
            plan: {
                Sun: 4,
                Mon: 0,
                Tue: 8,
                Wed: 4,
                Thu: 0,
                Fri: 8,
                Sat: 8
            }
        }, {
            name: "Nephi",
            plan: {
                Sun: 4,
                Mon: 0,
                Tue: 8,
                Wed: 4,
                Thu: 0,
                Fri: 8,
                Sat: 8
            }
        }, {
            name: "Enos",
            plan: {
                Sun: 4,
                Mon: 0,
                Tue: 8,
                Wed: 4,
                Thu: 0,
                Fri: 8,
                Sat: 8
            }
        }, {
            name: "Tiancum",
            plan: {
                Sun: 4,
                Mon: 0,
                Tue: 8,
                Wed: 4,
                Thu: 0,
                Fri: 8,
                Sat: 8
            }
        }, {
            name: "Jacob",
            plan: {
                Sun: 4,
                Mon: 0,
                Tue: 8,
                Wed: 4,
                Thu: 0,
                Fri: 8,
                Sat: 8
            }
        }];
    };

    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 10 // count per page
    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
            $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


    $scope.AddEmployee = function() {
        var newEmployee = {
            name: "",
            plan: {
                Sun: 0,
                Mon: 0,
                Tue: 0,
                Wed: 0,
                Thu: 0,
                Fri: 0,
                Sat: 0
            },
            $edit: true
        };
        data.push(newEmployee);
        $scope.tableParams.reload();

    };

    $scope.submit = function() {
        var result = {
            days: $scope.days,
            col1: $scope.col1,
            col2: $scope.col2,
            data: data
        }
        $http.post('/api/plan', {
                plan: result
            })
            .success(function(data) {
                //what to do here
                console.log('success pass to node');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});
