// set variable Form for the form data
const form = document.querySelector("form");

// class for creating the character
class Character {
  constructor(id, first, last, img, desc) {
    this.id = id;
    this.first = first;
    this.last = last;
    this.img = img;
    this.desc = desc;
  }
}

// array for storing the new character
const newCharacter = [
  new Character(1, "Steve", "bob", "user.png", "description"),
  new Character(2, "bob", "George", "user.png", "description"),
  new Character(3, "Sally", "Yellow", "user.png", "description"),
];

// set the id number of the caracter from newcaracter array length
let itmlgth = newCharacter.length + 1;
console.log(itmlgth);

// display characters in array to the template
addtotemplate();

// get form data on submit and prevent default
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // get the formdata form the form and assign to a variable formData
  const formData = new FormData(form);

  // set formdata to the template via class names
  const template = document
    .getElementById("list-template")
    .content.cloneNode(true);

  // same as addtotemplat function byt ues formdata info
// console.log("formData",formData.get('image').name)
// console.log(document.getElementById("outputimg").src)
  template.querySelector(".listnum").innerHTML += itmlgth;
  template.querySelector(".tempfname").innerHTML = formData.get("FirstName");
  template.querySelector(".templname").innerHTML = formData.get("LastName");
  template.querySelector(".tempimage").src = document.getElementById("outputimg").src;
  template.querySelector(".tempdesc").innerHTML = formData.get("description");
  template.querySelector(".listitem").setAttribute("id", `item${itmlgth}`);

  // push template to the div with id caracteroutput so that it can be displaed
  document.querySelector("#characteroutput").appendChild(template);

  // add the new character to the array newCharacter
  newCharacter.push(
    new Character(
      itmlgth++,
      formData.get("FirstName"),
      formData.get("LastName"),
      // formData.get("image").name,
      document.getElementById("outputimg").src,
      formData.get("description")
    )
  );

  console.log(newCharacter);
  form.reset();
});

// function for when a file is uploaded it taked the url makes it readable and then displays the image
function loadFile(event) {
  document.getElementById("outputimg").src = URL.createObjectURL(
    event.target.files[0]
  );
}

function removecurrentitem(e) {
  // find current position in array newpeople using the value of list number and id from array and checking if they are the same
  let currentPosition = newCharacter.findIndex(
    (item) => item.id == e.parentNode.querySelector(".listnum").innerHTML
  );
  // remove from array using this
  newCharacter.splice(currentPosition, 1);
  // remove from html using this
  e.parentNode.parentNode.removeChild(e.parentNode);
}

function getvalue(e) {
  // set variavble for the parent node of this button
  let parentDiv = e.parentNode;

  // get the current item id number and make sure it is a number
  let itemId = parseInt(parentDiv.querySelector(".listnum").innerHTML);
  // use the item id to check the newpeople array and find the index location of the number
  let itemIndex = newCharacter.findIndex((item) => item.id === itemId);

  // store the current values for first and last name in temp variables
  let originalFirstName = newCharacter[itemIndex].first;
  let origionalLastName = newCharacter[itemIndex].last;
  let origionalDesc = newCharacter[itemIndex].desc;

  // change the text on the template item to a input textbox wiht the current value and an id
  parentDiv.querySelector(
    ".tempfname"
  ).innerHTML = `<input type="text" value="${originalFirstName}" id="editFirstName${itemId}"></input>`;
  parentDiv.querySelector(
    ".templname"
  ).innerHTML = `<input type="text" value="${origionalLastName}" id="editLastName${itemId}"></input>`;
  parentDiv.querySelector(
    ".tempdesc"
  ).innerHTML = `<input type="text" value="${origionalDesc}" id="editDesc${itemId}"></input>`;

  // change the text of the button to save
  e.innerHTML = "Save";

  // cahnge the onclick of the button to savevalue(itemID) to pass the id to the next stage
  e.setAttribute("onclick", `saveValue(${itemId})`);
}

// saving fnction after editing
function saveValue(itemId) {
  // use item id to check people array for index location in array
  let itemIndex = newCharacter.findIndex((item) => item.id === itemId);

  // get the value changed using the new id and save to a variable
  let updateFirstName = document.getElementById(`editFirstName${itemId}`).value;
  let updateLastName = document.getElementById(`editLastName${itemId}`).value;
  let origionalDesc = document.getElementById(`editDesc${itemId}`).value;

  // update the valies in the newpeope array
  newCharacter[itemIndex].first = updateFirstName;
  newCharacter[itemIndex].last = updateLastName;
  newCharacter[itemIndex].desc = origionalDesc;

  // find the parent div with the id set before again as no referanse from this
  let parentDiv = document.getElementById(`item${itemId}`);

  // update first and last naem in html
  parentDiv.querySelector(".tempfname").innerHTML = updateFirstName;
  parentDiv.querySelector(".templname").innerHTML = updateLastName;
  parentDiv.querySelector(".tempdesc").innerHTML = origionalDesc;

  // change text of button to Edit
  parentDiv.querySelector("#editBtn").innerHTML = "Edit";

  // change onclick back to getvalue(this)
  parentDiv.querySelector("#editBtn").setAttribute("onclick", "getvalue(this)");
}

function sortfun() {
  newCharacter.sort((a, b) => {
    const aname = a.first.toLowerCase();
    const bname = b.first.toLowerCase();
    console.log(aname);
    console.log(bname);

    if (aname < bname) {
      return -1;
    } else if (aname > bname) {
      return 1;
    } else {
      return 0;
    }
  });

  console.log(newCharacter);
  document.getElementById("characteroutput").innerHTML = "";

  addtotemplate();

  document.getElementById("sortbtn").setAttribute("onclick", "sortfunrev()");
  document.getElementById("sortbtn").innerHTML = "Z-A";
}

function sortfunrev() {
  newCharacter.sort((a, b) => {
    const aname = a.first.toLowerCase();
    const bname = b.first.toLowerCase();
    console.log(aname);
    console.log(bname);

    if (bname < aname) {
      return -1;
    } else if (bname > aname) {
      return 1;
    } else {
      return 0;
    }
  });

  console.log(newCharacter);
  document.getElementById("characteroutput").innerHTML = "";

  addtotemplate();

  document.getElementById("sortbtn").setAttribute("onclick", "sortfun()");
  document.getElementById("sortbtn").innerHTML = "A-Z";
}

function addtotemplate() {
  newCharacter.forEach((element) => {
    console.log(element);

    const template = document
      .getElementById("list-template")
      .content.cloneNode(true);

    template.querySelector(".listnum").innerHTML += element.id;
    template.querySelector(".tempfname").innerHTML = element.first;
    template.querySelector(".templname").innerHTML = element.last;
    template.querySelector(".tempimage").src = element.img;
    template.querySelector(".tempdesc").innerHTML = element.desc;
    template.querySelector(".listitem").setAttribute("id", `item${element.id}`);

    // push template to the div with id caracteroutput so that it can be displaed
    document.querySelector("#characteroutput").appendChild(template);
  });
}

document.getElementById("searchBar").addEventListener("input", function () {
  const searchingfor = this.value.toLowerCase();

  const filtercaracter = newCharacter.filter((character) => {
    const alltext = `${character.first.toLowerCase()} ${character.last.toLowerCase()} ${character.desc.toLowerCase()}`;
    return alltext.includes(searchingfor);
  });

  document.getElementById("characteroutput").innerHTML = "";

  filtercaracter.forEach((character) => {
    const template = document
      .getElementById("list-template")
      .content.cloneNode(true);

    template.querySelector(".listnum").innerHTML += character.id;
    template.querySelector(".tempfname").innerHTML = character.first;
    template.querySelector(".templname").innerHTML = character.last;
    template.querySelector(".tempimage").src = character.img;
    template.querySelector(".tempdesc").innerHTML = character.desc;
    template
      .querySelector(".listitem")
      .setAttribute("id", `item${character.id}`);

    // push template to the div with id caracteroutput so that it can be displaed
    document.querySelector("#characteroutput").appendChild(template);
  });
});
