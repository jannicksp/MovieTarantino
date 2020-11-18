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

// function loadJSON() {
//   fetch("movies.json")
//     .then(response => response.json())
//     .then(jsonData => {
//       movieData = jsonData;
//       console.log(movieData);
//       showData();
//     });

// }

function loadJSON() {
  fetch("movies.json")
    .then(response => response.json())
    .then(jsonData => {
      jsonData.forEach(movie=>{
        movieList .push(movie.fetchURL);
      })

       fetchDataUrls();
 
    });

}



let movieData= [];

function fetchDataUrls() {

  Promise.all(movieList.map(url =>
    fetch(url)
      .then(resp=> resp.json())                 
  )).then(data => {
    console.log(data);
    console.log(data[0]);
    showData(data);
   
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
document.querySelector(".rating").innerHTML += movie.Ratings[0].Value;
document.querySelector(".modal-content").lastElementChild.innerHTML += movie.Year;

  //to do: add the rest, video src etc
    })
  }); 
  //forEach loop end. 
 

//in case of bigger scope, otherwise just delete:
  // document.querySelectorAll(".movie").forEach(movie =>{
  //   movie.addEventListener("click", openModal);
  // })

 

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


