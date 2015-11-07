/**
 * Created by emmanuelhcpk on 7/11/15.
 */
angular.module('appControllers', [])
  .controller('RedditController', ['$scope', '$http', function ($scope, $http) {

    $scope.posts = [];
    $http.get('https://www.reddit.com/r/gaming/.json')
      .success(function (posts) {
        angular.forEach(posts.data.children, function (post) {
          console.log(post)
          $scope.posts.push(post.data);
        })
      })
      .error(function (err, code) {
        console.log(err, 'codigo', code);
      });
    $scope.loadMorePost = function() {
      var params = {};
      if($scope.posts.length > 0) {

        params['after'] = $scope.posts[$scope.posts.length - 1].name;
        console.log(params);
      }


      $http.get('https://www.reddit.com/r/gaming /new/.json',{params:params}).success(function(posts){
        //console.log(posts);

        angular.forEach(posts.data.children, function(post){

          $scope.posts.push(post.data);

        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

  }])
