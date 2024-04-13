const form = document.querySelector('form');

diceNumber = 0

form.addEventListener('submit', (e) => {
    e.preventDefault();


    const formData = new FormData(form);

    console.log(formData.get('FirstName'))


    const template = document.getElementById('list-template').content.cloneNode(true)

    template.querySelector('.tempfname').innerHTML = formData.get('FirstName')
    template.querySelector('.templname').innerHTML = formData.get('LastName')
    // template.querySelector('.tempimage').innerHTML =
    // template.querySelector('.tempnumber').innerHTML =
    
        
    document.querySelector("#characteroutput").appendChild(template)
        

})




function RollDice() {
    diceNumber= Math.floor(Math.random() * 6) + 1;
    console.log(diceNumber)
}