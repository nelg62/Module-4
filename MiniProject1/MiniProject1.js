// TODO ---  remove duplicate functions e.g try to make the form and the add to template on function as most elements are similar

// for the sorting a-z try to make into 1 function and use booliant true or false

//  for elements use flex display so that elements stick to the left rather then have space inbetween whent there are less then 4 items

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
  new Character(
    1,
    "Kazuma",
    "Kiryu",
    "Kiryu_Y0.webp",
    `"Kazuma Kiryu (Japanese: 桐生 一馬, Hepburn: Kiryū Kazuma) is a fictional character and the initial main protagonist of Sega's action-adventure beat 'em up Japanese role-playing game series Yakuza / Like a Dragon. He is popularly known as "the Dragon of Dojima" (堂島の龍, Dōjima no Ryū) due to the tattoo of a dragon on his back and him originally being a fearsome member of the yakuza group known as the Dojima Family, a subsidiary of the Tojo Clan."`
  ),
  new Character(
    2,
    "GIR",
    "",
    "Gir_mouth_open.webp",
    `"GIR (G Information Retrieval Unit) He is the hyperactive robotic assistant of Zim and the closest thing the incompetent Irken has to a friend, having been constructed from scrap parts by the Almighty Tallest just before it was handed to Zim, instead of a regular SIR (Standard-issue Information Retrieval) Unit."`
  ),
  new Character(
    3,
    "Goro",
    "Majima",
    "yakuza-0-release-date-set-for-january-1469635416610.webp",
    `"Goro Majima (Japanese: 真島 吾朗, Hepburn: Majima Gorō) is a major recurring character in Sega's Like a Dragon video game series, previously known as Yakuza outside of Japan. He is one of the main playable protagonists of Yakuza 0 and Yakuza: Dead Souls, as well as the Majima Saga of Yakuza Kiwami 2. Introduced as a member of the Tojo Clan and patriarch of its subsidiary group, the Majima Family as well as second-in-command of the Shimano Family, nicknamed "Mad Dog of Shimano""`
  ),
  new Character(
    4,
    "Zim",
    "",
    "Zim.yelling.svg",
    `"Zim is a member of the alien Irken race and a former Irken Invader; however, since his actions usually lead to disaster (having nearly destroyed the Irken homeworld during Operation Impending Doom) his leaders, the Almighty Tallest, banished him to Foodcourtia. While there, however, Zim heard of Operation Impending Doom II, and - obviously not understanding the purpose of his previous exile - "quit being banished" and ventured to Conventia in the hope of getting an assignment. Chagrined, the Almighty Tallest sent him on a "secret mission" to Earth, in order to keep him occupied and away from the real Operation Impending Doom II."`
  ),
  new Character(
    5,
    "Patrick",
    "Star",
    "Patrick_Star.svg.png",
    "Patrick is the ignorant but humorous best friend of SpongeBob SquarePants. He is portrayed as being an overweight pink starfish, who serves as the village idiot of the underwater city of Bikini Bottom."
  ),
];

// set the id number of the caracter from newcaracter array length
let itmlgth = newCharacter.length + 1;
console.log(itmlgth);

// fuction for adding / updating items to the template

function addtotemplate(input) {
  document.getElementById("characteroutput").innerHTML = "";
  input.forEach((element) => {
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

// display characters in array to the template call function
addtotemplate(newCharacter);

// get form data on submit and prevent default
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // get the formdata form the form and assign to a variable formData
  const formData = new FormData(form);

  // set formdata to the template via class names
  //   const template = document
  //     .getElementById("list-template")
  //     .content.cloneNode(true);

  //   // same as addtotemplat function byt ues formdata info
  //   // console.log("formData",formData.get('image').name)
  //   // console.log(document.getElementById("outputimg").src)
  //   template.querySelector(".listnum").innerHTML += itmlgth;
  //   template.querySelector(".tempfname").innerHTML = formData.get("FirstName");
  //   template.querySelector(".templname").innerHTML = formData.get("LastName");
  //   template.querySelector(".tempimage").src =
  //     document.getElementById("outputimg").src;
  //   template.querySelector(".tempdesc").innerHTML = formData.get("description");
  //   template.querySelector(".listitem").setAttribute("id", `item${itmlgth}`);

  //   // push template to the div with id caracteroutput so that it can be displaed
  //   document.querySelector("#characteroutput").appendChild(template);

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

  addtotemplate(newCharacter);
  console.log(newCharacter);
  form.reset();
});

// function for when a file is uploaded it taked the url makes it readable and then displays the image
function loadFile(event) {
  document.getElementById("outputimg").src = URL.createObjectURL(
    event.target.files[0]
  );
}

// function for removing Character card
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

// edit button function
function getvalue(e) {
  // set variavble for the parent node of this button
  let parentDiv = e.parentNode;

  // get the current item id number and make sure it is a number
  let itemId = parseInt(parentDiv.querySelector(".listnum").innerHTML);
  // use the item id to check the newpeople array and find the index location of the number
  let itemIndex = newCharacter.findIndex((item) => item.id === itemId);

  // store the current values for first and last name and description in temp variables
  let originalFirstName = newCharacter[itemIndex].first;
  let origionalLastName = newCharacter[itemIndex].last;
  let origionalDesc = newCharacter[itemIndex].desc;

  // change the text on the template item to a input textbox wiht the current value and an id got from id number
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

let bool = false;

// function sorting A-Z button
function sortfun() {
  const sortedResult = newCharacter.sort((a, b) => {
   
    const aname = a.first.toLowerCase();
    const bname = b.first.toLowerCase();

    return aname === bname ? 0 : aname ? -1 : 1;
    // console.log("aname",aname)
    // console.log("bname",bname)

    // if (aname < bname) {
    //     document.getElementById("sortbtn").innerHTML = "Z-A";
    //     return console.log("value",(aname === bname) ? 0 : aname ? -1 : 1)
    // }else {
    //     document.getElementById("sortbtn").innerHTML = "A-Z";
    //     return console.log("value1",(bname === aname) ? 0 : bname ? -1 : 1)
    // }
  });

  const result = bool ? newCharacter : newCharacter.reverse();

  //   newCharacter.sort((a, b) => {
  //     const aname = a.first.toLowerCase();
  //     const bname = b.first.toLowerCase();
  //     console.log(aname);
  //     console.log(bname);

  //     if (aname < bname) {
  //       return -1;
  //     } else if (aname > bname) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });

  console.log(result);
  document.getElementById("characteroutput").innerHTML = "";

  bool = !bool;
  addtotemplate(result);

  //   document.getElementById("sortbtn").setAttribute("onclick", "sortfunrev()");
  //   document.getElementById("sortbtn").innerHTML = "Z-A";
}

// function sorting Z-A button
// function sortfunrev() {
//   newCharacter.sort((a, b) => {
//     const aname = a.first.toLowerCase();
//     const bname = b.first.toLowerCase();
//     console.log(aname);
//     console.log(bname);

//     if (bname < aname) {
//       return -1;
//     } else if (bname > aname) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });

//   console.log(newCharacter);
//   document.getElementById("characteroutput").innerHTML = "";

//   addtotemplate(newCharacter);

//   document.getElementById("sortbtn").setAttribute("onclick", "sortfun()");
//   document.getElementById("sortbtn").innerHTML = "A-Z";
// }

// event listener for search bar
document.getElementById("searchBar").addEventListener("input", function () {
  const searchingfor = this.value.toLowerCase();

  // filter newcharacter array and check first name last name and description set to a variable and then check if the seach value includes what is searched for
  const filtercaracter = newCharacter.filter((character) => {
    const alltext = `${character.first.toLowerCase()} ${character.last.toLowerCase()} ${character.desc.toLowerCase()}`;
    return alltext.includes(searchingfor);
  });

  document.getElementById("characteroutput").innerHTML = "";

  // sort and display cards by what is search in the search bar by what first name last name and description contains the searchbar value
  addtotemplate(filtercaracter);
  //   filtercaracter.forEach((character) => {
  //     const template = document
  //       .getElementById("list-template")
  //       .content.cloneNode(true);

  //     template.querySelector(".listnum").innerHTML += character.id;
  //     template.querySelector(".tempfname").innerHTML = character.first;
  //     template.querySelector(".templname").innerHTML = character.last;
  //     template.querySelector(".tempimage").src = character.img;
  //     template.querySelector(".tempdesc").innerHTML = character.desc;
  //     template
  //       .querySelector(".listitem")
  //       .setAttribute("id", `item${character.id}`);

  //     // push template to the div with id caracteroutput so that it can be displaed
  //     document.querySelector("#characteroutput").appendChild(template);
  //   });
});
