"use strict";
//empty array to store JSON data
let movieList= [];
//yt player variable:
let player;
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

function fetchDataUrls() {
//wait for load of each movie data by creating a promise:
  Promise.all(movieList.map(movie =>
    fetch(movie.fetchURL)
      .then(resp=> resp.json())                 
  )).then(data => {

    //merge the data we have with what we've got from OMDB:
    for (let i = 0; i < movieList.length; i++) {
      movieList[i].Title = data[i].Title;
      movieList[i].Poster = data[i].Poster;
      movieList[i].Year = data[i].Year;
      movieList[i].Plot = data[i].Plot;
      movieList[i].Rating = data[i].Ratings[0].Value;   
    }
    showData(movieList);
   
  })

}




function showData(data){
  //set destination for where all the clones should go
  const dest = document.querySelector("section#moviesList");
  //get the template for the movie
  const tempMovie = document.querySelector("template");
   //For each movie object in the JSON file: 
  data.forEach(movie => {
    //1: make a clone from the template, 
    let clone = tempMovie.cloneNode(true).content;
    clone.querySelector("img").src = movie.Poster;
    clone.querySelector("img").alt = movie.Title;
   //2: add it to the DOM, 
    dest.appendChild(clone);
   
    //3: add an eventlistener, and on click insert/show data:
    dest.lastElementChild.addEventListener("click", ()=>{
      modal.style.display = "block";
document.querySelector("#myModal .desktop").innerHTML = movie.Title;
document.querySelector("#myModal .mobile").innerHTML = movie.Title;
document.querySelector("#myModal p").innerHTML = movie.Plot;
document.querySelector(".rating").innerHTML = "Rating: " + movie.Rating;
document.querySelector(".modal-content").lastElementChild.innerHTML = "Year: " + movie.Year;
let playerWrapper = document.createElement('div');
playerWrapper.id = "player";
document.querySelector("#myModal .modal-content .videoWrapper").append(playerWrapper);

//create the YT player:
onYouTubeIframeAPIReady();

// 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
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

 // 4. The API will call this function when the video player is ready.
 function onPlayerReady(event) {
   event.target.playVideo();
 }
 // 5. The API calls this function when the player's state changes.
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
 let done = false;
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
document.querySelector("#myModal iframe#player").remove();
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
document.querySelector("#myModal iframe#player").remove();
    
    modal.style.display = "none";
  }
}


