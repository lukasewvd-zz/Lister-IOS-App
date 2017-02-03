angular.module('todo.controllers', [])
	.controller('IndexCtrl', function($scope, $ionicModal, $localForage) {
		$scope.items = [];
		$scope.itemsAdd = 0;
		$scope.itemsDel = 0;
		$scope.itemsCre = 0;
		
		$scope.firstAdd = 0;
		$scope.hundredDel = 0;
		$scope.hundredCre = 0;
		$scope.tenActive = 0;
		$scope.hundredClmp = 0;
		$scope.firstDel = 0;
		$scope.boolTen = false;
		
		$localForage.getItem('__TASKS__').then(function(tasks) {
			if (tasks) {
				$scope.items = tasks;
			}
		});
		
		$localForage.getItem('__ADDS__').then(function(adds) {
			if (adds) {
				$scope.itemsAdd = adds;
			}
		});
		
		$localForage.getItem('__DELS__').then(function(dels) {
			if (dels) {
				$scope.itemsDel = dels;
			}
		});
		
		$localForage.getItem('__CRES__').then(function(cres) {
			if (cres) {
				$scope.itemsCre = cres;
			}
		});
		
		$localForage.getItem('__ACHI1__').then(function(firstA) {
			if (firstA) {
				$scope.firstAdd = firstA;
			}
		});
		
		$localForage.getItem('__ACHI2__').then(function(hundredD) {
			if (hundredD) {
				$scope.hundredDel = hundredD;
			}
		});
		
		$localForage.getItem('__ACHI3__').then(function(hundredC) {
			if (hundredC) {
				$scope.hundredCre = hundredC;
			}
		});
		
		$localForage.getItem('__ACHI4__').then(function(tenA) {
			if (tenA) {
				$scope.tenActive = tenA;
			}
		});
		
		$localForage.getItem('__ACHI5__').then(function(hundredCp) {
			if (hundredCp) {
				$scope.hundredClmp = hundredCp;
			}
		});
		
		$localForage.getItem('__ACHI6__').then(function(firstD) {
			if (firstD) {
				$scope.firstDel = 0;
			}
		});
		
		$localForage.getItem('__ACHI7__').then(function(bool) {
			if (bool) {
				$scope.boolTen = bool;
			}
		});
		
		// Initialize the dialog window
		$ionicModal.fromTemplateUrl('task-prompt.html', {
			scope: $scope,
			animation: 'slide-in-right'
		}).then(function(modal) {
			$scope.modal = modal;
		});	

		$scope.showTaskPrompt = function() {
			var newTask = {
				title: '',
				description: '',
				isComplete: null
			};	

			$scope.newTask = newTask;
			$scope.modal.show();
		};

		$scope.saveTask = function() {
			$scope.itemsCre++;
			$localForage.setItem('__CRES__', $scope.itemsCre);
			$scope.items.push($scope.newTask);
			$localForage.setItem('__TASKS__', $scope.items).then(function() {
				$scope.modal.hide();
			});
			
			if($scope.firstAdd < 1) {
				$scope.firstAdd++;
				$localForage.setItem('__ACHI1__', $scope.firstAdd);
			} else {
				$scope.firstAdd = 1;
				$localForage.setItem('__ACHI1__', $scope.firstAdd);
			}
			
			if($scope.hundredCre < 100) {
				$scope.hundredCre++;
				$localForage.setItem('__ACHI3__', $scope.hundredCre);
			} else {
				$scope.hundredCre = 100;
				$localForage.setItem('__ACHI3__', $scope.hundredCre);
			}
			
			if($scope.items.length < 10 && $scope.boolTen == false) {
				$scope.tenActive = $scope.items.length;
				$localForage.setItem('__ACHI4__', $scope.tenActive);
			} else {
				$scope.boolTen = true;
				$scope.tenActive = 10;
				$localForage.setItem('__ACHI4__', $scope.tenActive);
				$localForage.setItem('__ACHI7__', $scope.boolTen);
			}
		};

		$scope.cancelTask = function() {
			$scope.modal.hide();
		};

		$scope.completeItem = function(item) {
			$scope.itemsAdd++;
			$localForage.setItem('__ADDS__', $scope.itemsAdd);
			
			if($scope.hundredClmp < 100) {
				$scope.hundredClmp++;
				$localForage.setItem('__ACHI5__', $scope.hundredClmp);
			} else {
				$scope.hundredClmp = 100;
				$localForage.setItem('__ACHI5__', $scope.hundredClmp);
			}
			
			$scope.removeItem(item);
		};
		
		$scope.clearStats = function() {
			$scope.itemsAdd = 0;
			$scope.itemsDel = 0;
			$scope.itemsCre = 0;
			$localForage.setItem('__ADDS__', $scope.itemsAdd);
			$localForage.setItem('__DELS__', $scope.itemsDel);
			$localForage.setItem('__CRES__', $scope.itemsCre);
		};
		
		$scope.clearAchi = function() {
			$scope.firstAdd = 0;
			$scope.hundredDel = 0;
			$scope.hundredCre = 0;
			$scope.hundredClmp = 0;
			$scope.firstDel = 0;
			$scope.tenActive = $scope.items.length;
			$scope.boolTen = false;
			
			$localForage.setItem('__ACHI1__', $scope.itemsAdd);
			$localForage.setItem('__ACHI2__', $scope.hundredDel);
			$localForage.setItem('__ACHI3__', $scope.hundredCre);
			$localForage.setItem('__ACHI5__', $scope.hundredClmp);
			$localForage.setItem('__ACHI6__', $scope.firstDel);
			$localForage.setItem('__ACHI7__', $scope.boolTen);
			$localForage.setItem('__ACHI4__', $scope.tenActive);
		};

		$scope.ignoreItem = function(item) {
			$scope.itemsDel++;
			$localForage.setItem('__DELS__', $scope.itemsDel);
			$scope.removeItem(item);
			
			if($scope.firstDel < 1) {
				$scope.firstDel++;
				$localForage.setItem('__ACHI6__', $scope.firstDel);
			} else {
				$scope.firstDel = 1;
				$localForage.setItem('__ACHI6__', $scope.firstDel);
			}
			
			if($scope.hundredDel < 100) {
				$scope.hundredDel++;
				$localForage.setItem('__ACHI2__', $scope.hundredDel);
			} else {
				$scope.hundredDel = 100;
				$localForage.setItem('__ACHI2__', $scope.hundredDel);
			}
			
			if($scope.items.length < 10 && $scope.boolTen == false) {
				$scope.tenActive = $scope.items.length;
				$localForage.setItem('__ACHI4__', $scope.tenActive);
			} else {
				$scope.boolTen = true;
				$scope.tenActive = 10;
				$localForage.setItem('__ACHI4__', $scope.tenActive);
				$localForage.setItem('__ACHI7__', $scope.boolTen);
			}
		};

		$scope.removeItem = function(item) {
			var i = -1;
			angular.forEach($scope.items, function(task, key) {
				if (item === task) {
					i = key;
				}
     		});		

			if (i >= 0) {
				$scope.items.splice(i, 1);
				$localForage.setItem('__TASKS__', $scope.items);
				return true;
			}
			return false;
		};
	})
	
	angular.module('starter.controllers', [])

	.run(function($ionicPlatform) {
  		$ionicPlatform.ready(function() {
        navigator.splashscreen.hide();
 });
})
;
