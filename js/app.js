console.log('wired up!')
if( typeof myApiSecret === 'undefined' ){  var myApiSecret = ''  }
// var picDiv = '.pic-div'
var repoCol = document.querySelector('.repo-col')
var profile = document.querySelector('.profile-col')
var drpDwnMenu = document.querySelector('.pic-dropdown')
console.log([drpDwnMenu])
// var langList = document.querySelector('.language-col')
var getAndFetchBioData = function(userArg){
  $.getJSON('https://api.github.com/users/' + userArg + '?' + myApiSecret ).then(function(returnedData){
    // console.log(returnedData)
  var bioData = '<img src="' + returnedData.avatar_url + '"/>'
      bioData +=    '<h1>' + returnedData.name + '</h1>'
      bioData +=    '<h3>' + returnedData.login + '</h3>'
      bioData +=    '<button type="button" class="btn btn-default btn-sm follow-btn">Follow</button>'
      bioData +=    '<a href="#"><p class"sm-text">Block or report user</p></a> '
      bioData +=    '<hr/>'
      bioData +=    '<ul class="bio-list">'
      bioData +=      '<li><i class="fa fa-users" aria-hidden="true"><p>' + returnedData.company + '</p></i></li>'
      bioData +=      '<li><i class="fa fa-map-marker marker" aria-hidden="true"><p>' + returnedData.location + '</p></i></li>'
      bioData +=      '<li><i class="fa fa-envelope-o" aria-hidden="true"><p>' + returnedData.email + '</p></i></li>'
      bioData +=      '<li><i class="fa fa-link" aria-hidden="true"><p>' + returnedData.html_url + '</p></i></li>'
      bioData +=      '<li><i class="fa fa-clock-o" aria-hidden="true"><p>Joined on ' + returnedData.created_at + '</p></i></li>'
      bioData +=    '</ul>'
  // console.log(Pdata)
  profile.innerHTML = bioData
  })
}

var getAndFetchRepoData = function(userArg) {
  $.getJSON('https://api.github.com/users/' + userArg +'/repos?' + myApiSecret ).then(function(returnedRepoData){
    // var languageColumn = '<ul class="lang-col">'
    var repoDataHolder =  '<div class="repo-header">'
        repoDataHolder +=    '<ul class="repo-header-list">'
        repoDataHolder +=      '<li>Overview</li>'
        repoDataHolder +=      '<li>Repositories</li>'
        repoDataHolder +=      '<li>Stars</li>'
        repoDataHolder +=      '<li>Followers</li>'
        repoDataHolder +=      '<li>Following</li>'
        repoDataHolder +=    '<ul>'
        repoDataHolder +=    '<hr/>'
        repoDataHolder +=  '</div>'

        repoDataHolder +=  '<div class="repo-input-container"><input type="text" class="repo-input" placeholder="Seach repositories..."></input><hr/></div>'

       repoDataHolder +=  '<ul class="repo-list">'
       repoDataHolder +=  '<li class="repo-headline">' + 'Repositories' + '<div class="stargazer-headline">' + 'Stargazer count' + '</div>' + '<div class="lang-headline">' + 'Language' + '</div></li>'
    for (var i = 0; i< returnedRepoData.length; i += 1) {
    // console.log(returnedRepoData[i].name)
      repoDataHolder += '<li class="repo-box">' + returnedRepoData[i].name + '<div class="stargazer">' + '<i class="fa fa-star star" aria-hidden="true"></i>' + returnedRepoData[i].stargazers_count + '</div>' + '<div class="language">' + returnedRepoData[i].language + '</div></li>' //+ '<hr/>'
      // languageColumn =+ '<li class="lang-list">' + returnedRepoData[i].language + '</li>'
      // repoDataHolder += '<div class="language">' + returnedRepoData[i].language + '</div>'
      // console.log(repoDataHolder)
    }
    var repoData = repoDataHolder + '</ul>'
    repoCol.innerHTML = repoData
    // langList.innerHTML = languageColumn + '</ul>'
  })
}

function gitExplore(e) {
    var inputValue = document.querySelector('.git-nav-input')
    if (e.keyCode == 13) {
        window.location.hash = inputValue.value
        // console.log(nameInput)
    }
}

function droppingMenu(){
  console.log([drpDwnMenu.classList])
  if(drpDwnMenu.classList.contains('open')) {
    drpDwnMenu.classList.remove('open')

  } else {

    drpDwnMenu.classList.add('open')
  }
}

var hashFunction= function(){
  var noHash = window.location.hash.slice(1)
  // console.log(noHash)
  if(noHash.length === 0){
    getAndFetchRepoData('wallanson2')
    getAndFetchBioData('wallanson2')
  }
  getAndFetchBioData(noHash)
  getAndFetchRepoData(noHash)
}
document.addEventListener('click', droppingMenu)
window.addEventListener('hashchange', hashFunction)
window.addEventListener('keydown', gitExplore)
hashFunction()
