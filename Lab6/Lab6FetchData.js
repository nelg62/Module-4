axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10').then(response => response.data.forEach(element => {
    addCard(element)
}))


function addCard(element) {
    console.log(element)
    const template = document.getElementById('card-template').content.cloneNode(true)

    template.querySelector(".cardUserID").innerText = `UserID: ${element.userId}`
    template.querySelector(".cardID").innerText = `ID: ${element.id}`
    template.querySelector(".card-title").innerText = `Title: ${element.title}`;
    template.querySelector(".card-text").innerText = `Body: ${element.body}`


    document.querySelector("#card-list").appendChild(template);
}

