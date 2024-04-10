// data from from into variable
const form = document.querySelector('form');

// variable for id number
let itmlgth = 1

// create a constructor for person object 
class Person {
    constructor(id, first, last, animal, food) {
        this.id = id
        this.first = first
        this.last = last
        this.animal = animal
        this.food = food
    }
}

// container object for person constructor 
const newPeople = []

// when data from form is submited 
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // clone template and set as variable template
    const template = document.getElementById('list-template').content.cloneNode(true)

    // add the data from from the from to the template 
    template.querySelector('.li-num').innerHTML += itmlgth
    template.querySelector(".li-fname").innerText += formData.get("firstName")
    template.querySelector(".li-lname").innerText += formData.get("lastName")
    template.querySelector(".li-animal").innerText += formData.get("animalchoice")
    template.querySelector(".li-food").innerText += formData.getAll("foodoption")

    // set an id on the template items to referance later ising the itmlgth number 
    template.querySelector('.listitem').setAttribute("id", `item${itmlgth}`)



    // push data from form into newPeople object to update array items 
    newPeople.push(new Person(itmlgth++, formData.get("firstName"), formData.get("lastName"), formData.get("animalchoice"), formData.getAll("foodoption")))

    // add the items from the template to the Div addItems toshow them 
    document.querySelector("#addItems").appendChild(template)

    // reset form so people need to type again 
    form.reset()
    console.log(newPeople)
    console.log("newpoeple", newPeople.length)
})


// function to remove current item when clicking remove button 
function removecurrentitem(e) {
    // find current position in array newpeople using the value of list number and id from array and checking if they are the same 
    let currentPosition = newPeople.findIndex(item => item.id == e.parentNode.querySelector('.li-num').innerHTML)
    // remove from array using this
    newPeople.splice(currentPosition, 1)
    // remove from html using this
    e.parentNode.parentNode.removeChild(e.parentNode)
}

function getvalue(e) {
    // set variavble for the parent node of this button
    let parentDiv = e.parentNode

    // get the current item id number and make sure it is a number 
    let itemId = parseInt(parentDiv.querySelector('.li-num').innerHTML)
    // use the item id to check the newpeople array and find the index location of the number
    let itemIndex = newPeople.findIndex(item => item.id === itemId)

    // store the current values for first and last name in temp variables
    let originalFirstName = newPeople[itemIndex].first
    let origionalLastName = newPeople[itemIndex].last

    // change the text on the template item to a input textbox wiht the current value and an id 
    parentDiv.querySelector('.li-fname').innerHTML = `<input type="text" value="${originalFirstName}" id="editFirstName${itemId}"></input>`
    parentDiv.querySelector('.li-lname').innerHTML = `<input type="text" value="${origionalLastName}" id="editLastName${itemId}"></input>`

    // change the text of the button to save
    e.innerHTML = "Save"

    // cahnge the onclick of the button to savevalue(itemID) to pass the id to the next stage 
    e.setAttribute("onclick", `saveValue(${itemId})`)
}

// saving fnction after editing
function saveValue(itemId) {
    // use item id to check people array for index location in array 
    let itemIndex = newPeople.findIndex(item => item.id === itemId)

    // get the value changed using the new id and save to a variable 
    let updateFirstName = document.getElementById(`editFirstName${itemId}`).value
    let updateLastName = document.getElementById(`editLastName${itemId}`).value

    // update the valies in the newpeope array
    newPeople[itemIndex].first = updateFirstName
    newPeople[itemIndex].last = updateLastName

    // find the parent div with the id set before again as no referanse from this
    let parentDiv = document.getElementById(`item${itemId}`)

    // update first and last naem in html
    parentDiv.querySelector('.li-fname').innerHTML = updateFirstName
    parentDiv.querySelector('.li-lname').innerHTML = updateLastName

    // change text of button to Edit 
    parentDiv.querySelector('#editBtn').innerHTML = "Edit"

    // change onclick back to getvalue(this)
    parentDiv.querySelector('#editBtn').setAttribute("onclick", "getvalue(this)")
}
