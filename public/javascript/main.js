var app = angular.module('main', ['ngTable'])
    .controller('DemoCtrl', function($scope, ngTableParams, $http, $sce) {
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
        $scope.RemoveEmployee = function(index) {
            data.splice(index, 1);
            $scope.tableParams.reload();

        };
        $scope.submit = function() {
            var formData = {
                days: $scope.days,
                col1: $scope.col1,
                col2: $scope.col2,
                data: data
            }
            $http.post('/api/plan', {
                    formdata: formData
                })
                .success(function(data) {
                    //what to do here
                    console.log('success pass to node');
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
    })
    .controller('resultCtl', function($scope, $http) {
        $scope.plandata = [];
        $scope.days = [];
        var resultArr = [];
        $http.get('outFile').success(function(data) {
            resultArr = data.split('\n');
            resultArr.pop();
            $scope.Num1 = resultArr.shift();
            $scope.Num2 = resultArr.shift();
            for (var i = 0; i < resultArr.length; i++) {
                var name = resultArr[i].split(' ')[0];
                var plan = resultArr[i].split(' ')[1];
                plan.length + 1;
                $scope.plandata.push({
                    "name": name,
                    "plan": plan.split('')
                });
            }
            for (var j = 1; j <= plan.length; j++) {
                $scope.days.push('Day ' + j);
            };


        });
    });
