const artist = {
    name: "Van Gogh",
    portfolio: [
      {
        title: "portrait",
        url: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/436532/1671316/main-image",
      },
      {
        title: "sky",
        url: "https://mymodernmet.com/wp/wp-content/uploads/2020/11/White-house-night-van-goh-worldwide-2.jpg",
      },
    ],
  };

  function addCard(element) {

    const template = document.getElementById('card-template').content.cloneNode(true)

    template.querySelector(".card-title").innerText = `Artist ${artist.name}`;
    template.querySelector("#card-img").src = element.url
    template.querySelector(".card-text").innerText = `Title: ${element.title}`
    
    document.querySelector("#card-list").appendChild(template);
  }

  artist.portfolio.forEach(element => addCard(element))