'use strict';

angular.module('myApp.todo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'todo/todo.html',
    controller: 'todoCtrl'
  });
}])

.controller('todoCtrl', ['$scope', function(self) {
  self.newTask = { text:"", marked: false};

  self.Tasks = JSON.parse(localStorage.getItem('Tasks')) || [];

  self.submitTask = function() {
    if(self.newTask.text !== "" && self.Tasks.length <= 5){
      self.Tasks.push(self.newTask);
      localStorage.setItem('Tasks', JSON.stringify(self.Tasks));
      self.newTask = {text: "", marked: false};
    } else {
      self.newTask = {text: "", marked: false};
    }
  };
  self.clearTasks = function() {
    self.Tasks = self.Tasks.filter(function(task) {
      return !task.marked;
    });
    localStorage.setItem('Tasks', JSON.stringify(self.Tasks));
  };
  self.markTask = function(task) {
    task.marked = !task.marked;
    localStorage.setItem('Tasks', JSON.stringify(self.Tasks));
  };
  self.someMarked = function() {
    for(self.i = 0; self.i < self.Tasks.length; self.i++) {
      if(self.Tasks[self.i].marked) {
        return true;
      }
    }
  }
}])
.filter('capitalize', function() {
    return function(input) {
      let str = input.charAt(0).toUpperCase();
      str += input.slice(1);
      return str;
    }
});
