(function(){
 'use strict';
var app = angular.module('myQuiz', ['ui.router']);

 app.config(function($urlRouterProvider, $stateProvider) {
 $urlRouterProvider.otherwise('/home');
 $stateProvider
 .state('home',{
  url: '/home',
    templateUrl: 'partials/home.html',
    controller: 'QuizController'
  })
 .state('home.detail',{
  url:  '/:itemId',
  views: {
   "costa": {
    templateUrl: 'partials/home-detail.html',
    controller: 'QuizController'
  }
  }

 });
 });
app.controller('QuizController', ['$scope', '$http','$stateParams', function($scope, $http, $stateParams) {
 $scope.score = 0;

 $http.get('quiz.json').then(function(quiz) {
 $scope.quiz = quiz.data;
 $scope.itemId = $stateParams.itemId;
})

$scope.selectItem = function(qIndex, aIndex) {

 var correctAnswer = $scope.quiz[qIndex].correct;
  $scope.quiz[qIndex].correctAnswer = correctAnswer;
  $scope.quiz[qIndex].selected = aIndex;
  if(aIndex !== correctAnswer) {
   $scope.quiz[qIndex].correctness = 'incorrect';
  } else {$scope.quiz[qIndex].correctness = 'correct';
          $scope.score += 1; }
} //select inside the question

$scope.isCorrect = function(qIndex, aIndex) {
 return $scope.quiz[qIndex].correctAnswer === aIndex;
}

$scope.isSelected = function(qIndex, aIndex) {
 return $scope.quiz[qIndex].selected === aIndex;
} //select answer


$scope.continue = function() {
 $scope.quiz[qIndex].selected !== aIndex;
 if($scope.itemId < $scope.quiz.length) {
  return $scope.itemId++;
 } else {$scope.itemId = 0;}
} //continue
 }]);
 app.factory('Lense', function(){
  return function(values) {
   var lense = {};
   lense.index = 0;
  lense.next = function() {
    lense.index +=1;
   };
   lense.previous = function(){
    lense.inde -=1;
   };
   lense.value = function() {
    return values[lense.index];
   };
  };
 })//factory
})();





















