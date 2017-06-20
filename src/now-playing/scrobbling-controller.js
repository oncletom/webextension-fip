export default function ScrobblingController($scope, chrome, preferences){
  $scope.scrobblingEnabled = preferences.get("lastfm.scrobbling");
  $scope.lastfmUsername = preferences.get("lastfm.username");

  $scope.$watch("scrobblingEnabled", function(value){
    preferences.set('lastfm.scrobbling', value);
  });

  chrome.on("lastfm.auth.success", function(data){
    $scope.lastfmUsername = data.userName;
    $scope.scrobblingEnabled = true;
    $scope.$apply("");
  });

  $scope.startAuthentication = function(){
    const cb = chrome.getRedirectURL('auth.html');

    chrome.notify(
      'lastfm.auth.request',
      `http://www.last.fm/api/auth?cb=${cb}`
    );
  };
}

ScrobblingController.$inject = ['$scope', 'chrome', 'preferences'];
