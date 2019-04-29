

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToy = document.querySelector("#newToy")
let addToy = false

// YOUR CODE HERE



const all = document.getElementById("toy-collection")

all.innerHTML = ``;

function renderToys(array) {
  array.forEach(function(toy){
    all.innerHTML += `
    <div class='card'>
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar">
      <p>${toy.likes}</p>
      <button id=${toy.id} class="like-btn">Like</button>
    </div>`
  })
}


fetch("http://localhost:3000/toys")
.then(res => res.json())
.then((toy) =>{
  renderToys(toy)
  console.log(toy)
})

const name = document.querySelector('#inputName');
const imageURL = document.querySelector("#inputImage");

toyForm.addEventListener("submit", function(e){
  e.preventDefault()
  console.log("NEWTOYS")
  let data =  {
     "name": `${name.value}`,
    "image":`${imageURL.value}`,
    "likes": 0
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
    })
    .then(res => res.json())

renderToys([data])

})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!
let likeBtn = document.querySelector(".like-btn");

all.addEventListener("click", function(e){
  // e.preventDefault()
  console.log("clicked",e.target.className)


  if (e.target.className === "like-btn"){
    // console.log(e.target.previousElementSibling.innerText)
    console.log(e.target.previousElementSibling.id)

    let like = e.target.previousElementSibling
    let likeCount = parseInt(like.innerText)
    like.innerText = `${++likeCount}`

  // like += 1;
    console.log(e.target.id);
   fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({likes: likeCount})
    })
}
})
