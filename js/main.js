"use strict";
let movieData= [];
window.addEventListener("DOMContentLoaded", init);

function init(){
loadJSON();
}

function loadJSON() {
  fetch("movies.json")
    .then(response => response.json())
    .then(jsonData => {
      movieData = jsonData;
      console.log(movieData);
      showData();
    });

}

// fetch("path", {
//   method: "get",
//   headers: {
//     "Content-Type": "application/json; charset=utf-8",
//     "x-apikey": "5dea0bc34658275ac9dc23ad",
//     "cache-control": "no-cache"
//   }



function showData(){
  console.log("showData");
  //set destination for where all the clones should go
  const dest = document.querySelector("section#moviesList");
  //get the template for the movie
  const tempMovie = document.querySelector("template");

  movieData.forEach(movie => {
    let clone = tempMovie.cloneNode(true).content;

    clone.querySelector("img").src = movie.img;
    clone.querySelector("img").alt = "placeholder alt";
    // clone.querySelector("h3").innerHTML = movie.name;
  
   
    dest.appendChild(clone);
  }); //forEach loop end

  document.querySelectorAll(".movie").forEach(movie =>{
    movie.addEventListener("click", openModal);
  })

}






// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function openModal(event){
  // Get the modal
//get the id, show data for that id here.....
  modal.style.display = "block";
  
}
