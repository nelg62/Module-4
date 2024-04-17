// set variable Form for the form data
const form = document.querySelector('form');

// object for premade characters (to use later?)
const premadeCharacters = {}

// manual iD number as I am not getting itens at this stage I do not need to get a length of items for the id yet
let itmlgth = 1

// class for creating the character 
class Character {
    constructor(id, first, last, img, desc) {
        this.id = id
        this.first = first
        this.last = last
        this.img = img
        this.desc = desc
    }
}

// array for storing the new character
const newCharacter = []

// get form data on submit and prevent default 
form.addEventListener('submit', (e) => {
    e.preventDefault();

// get the formdata form the form and assign to a variable formData
    const formData = new FormData(form);



// set formdata to the template via class names 
    const template = document.getElementById('list-template').content.cloneNode(true)

    template.querySelector('.listnum').innerHTML += itmlgth
    template.querySelector('.tempfname').innerHTML = formData.get('FirstName')
    template.querySelector('.templname').innerHTML = formData.get('LastName')
    template.querySelector('.tempimage').src = formData.get('image').name
    template.querySelector('.tempdesc').innerHTML = formData.get('description')
    template.querySelector('.listitem').setAttribute("id", `item${itmlgth}`)
    
        // push template to the div with id caracteroutput so that it can be displaed 
    document.querySelector("#characteroutput").appendChild(template)

    // add the new character to the array newCharacter 
    newCharacter.push(new Character(itmlgth++, formData.get("FirstName"), formData.get("LastName"), formData.get("image").name, formData.get("description")))
        
console.log(newCharacter)
form.reset()
})

// function for when a file is uploaded it taked the url makes it readable and then displays the image 
function loadFile(event) {
document.getElementById('outputimg').src = URL.createObjectURL(event.target.files[0])
}


function removecurrentitem(e) {
    // find current position in array newpeople using the value of list number and id from array and checking if they are the same 
    let currentPosition = newCharacter.findIndex(item => item.id == e.parentNode.querySelector('.listnum').innerHTML)
    // remove from array using this
    newCharacter.splice(currentPosition, 1)
    // remove from html using this
    e.parentNode.parentNode.removeChild(e.parentNode)
}


function getvalue(e) {
    // set variavble for the parent node of this button
    let parentDiv = e.parentNode

    // get the current item id number and make sure it is a number 
    let itemId = parseInt(parentDiv.querySelector('.listnum').innerHTML)
    // use the item id to check the newpeople array and find the index location of the number
    let itemIndex = newCharacter.findIndex(item => item.id === itemId)

    // store the current values for first and last name in temp variables
    let originalFirstName = newCharacter[itemIndex].first
    let origionalLastName = newCharacter[itemIndex].last
    let origionalDesc = newCharacter[itemIndex].desc

    // change the text on the template item to a input textbox wiht the current value and an id 
    parentDiv.querySelector('.tempfname').innerHTML = `<input type="text" value="${originalFirstName}" id="editFirstName${itemId}"></input>`
    parentDiv.querySelector('.templname').innerHTML = `<input type="text" value="${origionalLastName}" id="editLastName${itemId}"></input>`
    parentDiv.querySelector('.tempdesc').innerHTML = `<input type="text" value="${origionalDesc}" id="editDesc${itemId}"></input>`

    // change the text of the button to save
    e.innerHTML = "Save"

    // cahnge the onclick of the button to savevalue(itemID) to pass the id to the next stage 
    e.setAttribute("onclick", `saveValue(${itemId})`)
}

// saving fnction after editing
function saveValue(itemId) {
    // use item id to check people array for index location in array 
    let itemIndex = newCharacter.findIndex(item => item.id === itemId)

    // get the value changed using the new id and save to a variable 
    let updateFirstName = document.getElementById(`editFirstName${itemId}`).value
    let updateLastName = document.getElementById(`editLastName${itemId}`).value
    let origionalDesc = document.getElementById(`editDesc${itemId}`).value

    // update the valies in the newpeope array
    newCharacter[itemIndex].first = updateFirstName
    newCharacter[itemIndex].last = updateLastName
    newCharacter[itemIndex].desc = origionalDesc

    // find the parent div with the id set before again as no referanse from this
    let parentDiv = document.getElementById(`item${itemId}`)

    // update first and last naem in html
    parentDiv.querySelector('.tempfname').innerHTML = updateFirstName
    parentDiv.querySelector('.templname').innerHTML = updateLastName
    parentDiv.querySelector('.tempdesc').innerHTML = origionalDesc

    // change text of button to Edit 
    parentDiv.querySelector('#editBtn').innerHTML = "Edit"

    // change onclick back to getvalue(this)
    parentDiv.querySelector('#editBtn').setAttribute("onclick", "getvalue(this)")
}
