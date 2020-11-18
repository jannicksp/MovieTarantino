"use strict";
//empty array to store JSON data
let movieList= [];

//Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

window.addEventListener("DOMContentLoaded", init);

function init(){
loadJSON();
}

 // 2. This code loads the IFrame Player API code asynchronously.
//  var tag = document.createElement('script');

//  tag.src = "https://www.youtube.com/iframe_api";
//  var firstScriptTag = document.getElementsByTagName('script')[0];
//  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);





function loadJSON() {
  fetch("movies.json")
    .then(response => response.json())
    .then(jsonData => {
      jsonData.forEach(movie=>{
        movieList.push(movie);
      })

       fetchDataUrls();
 
    });

}



let movieData= [];

function fetchDataUrls() {

  Promise.all(movieList.map(movie =>
    fetch(movie.fetchURL)
      .then(resp=> resp.json())                 
  )).then(data => {

    for (let i = 0; i < movieList.length; i++) {
      
      movieList[i].Title = data[i].Title;
      movieList[i].Poster = data[i].Poster;
      movieList[i].Year = data[i].Year;
      movieList[i].Plot = data[i].Plot;
      movieList[i].Rating = data[i].Ratings[0].Value;
      
    }
    console.log(movieList);
    showData(movieList);
   
  })

}




function showData(data){
  //set destination for where all the clones should go
  const dest = document.querySelector("section#moviesList");
  //get the template for the movie
  const tempMovie = document.querySelector("template");
   //For each movie object in the JSON file, 1. make a clone from the template, 2. add it to the DOM, 3. add an eventlistener
  data.forEach(movie => {
    //1:
    let clone = tempMovie.cloneNode(true).content;
    clone.querySelector("img").src = movie.Poster;
    clone.querySelector("img").alt = movie.Title;
  
  
   //2:
    dest.appendChild(clone);

    //3:
    dest.lastElementChild.addEventListener("click", ()=>{
      modal.style.display = "block";
document.querySelector("#myModal h2").innerHTML = movie.Title;
document.querySelector("#myModal p").innerHTML = movie.Plot;
//document.querySelector(".rating").innerHTML = "Rating: " + movie.Ratings[0].Value;
document.querySelector(".rating").innerHTML = "Rating: " + movie.Rating;
document.querySelector(".modal-content").lastElementChild.innerHTML = "Year: " + movie.Year;

//onYouTubeIframeAPIReady("M7lc1UVf-VE");
onYouTubeIframeAPIReady();

// 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: movie.youtubeId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

 
    })
  }); 
  //forEach loop end. 


 

}






// // 3. This function creates an <iframe> (and YouTube player)
//  //    after the API code downloads.
//  var player;
//  function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: '390',
//     width: '640',
//     videoId: "M7lc1UVf-VE",
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }

 // 4. The API will call this function when the video player is ready.
 function onPlayerReady(event) {
   event.target.playVideo();
 }

 // 5. The API calls this function when the player's state changes.
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
 var done = false;
 function onPlayerStateChange(event) {
   if (event.data == YT.PlayerState.PLAYING && !done) {
     setTimeout(stopVideo, 6000);
     done = true;
   }
 }
 function stopVideo() {
   player.stopVideo();
 }




// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


