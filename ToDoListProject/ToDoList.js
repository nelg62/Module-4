// data from from into variable
const form = document.querySelector('form');

// variable for id number
let itmlgth = 1

// create a constructor for person object 
class Person {
    constructor(first, last, animal, food) {
        this.first = first
        this.last = last
        this.animal = animal
        this.food = food
    }
}

// container object for person constructor 
const newPeople = []

// when data from from is submited 
form.addEventListener('submit', (e) => {
    e.preventDefault();
 

    const formData = new FormData(form);

    const template = document.getElementById('list-template').content.cloneNode(true)

    // add the data from from to ul with ID addItems
    template.querySelector('.li-num').innerHTML += itmlgth++
    template.querySelector(".li-fname").innerText += formData.get("firstName")
    template.querySelector(".li-lname").innerText += formData.get("lastName")
    template.querySelector(".li-animal").innerText += formData.get("animalchoice")
    template.querySelector(".li-food").innerText += formData.getAll("foodoption")



    // push data from form into newPeople object 
   newPeople.push(new Person(formData.get("firstName"), formData.get("lastName"), formData.get("animalchoice"), formData.getAll("foodoption")))

    console.log(newPeople)
    document.querySelector("#addItems").appendChild(template)

    form.reset()

})


// function to remove current item when clicking remove button 
function removecurrentitem(e) {
    e.parentNode.parentNode.removeChild(e.parentNode)
}

function getvalue(e) {
    console.log(e.parentNode.querySelector('.li-num').innerHTML)
}

// use splice to be able to edit the items also add id to people part so I can use this in the splice i think