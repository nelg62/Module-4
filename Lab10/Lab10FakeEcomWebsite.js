class Items {
    constructor(category, description, id, image, price, rating, title) {
        this.category = category
        this.description = description
        this.id = id
        this.image = image
        this.price = price
        this.rating = rating
        this.title = title
    }
}

const newItem = []

axios.get('https://fakestoreapi.com/products').then((response) => {
    console.log(response.data)
for (const iterator of response.data) {
    newItem.push(new Items(iterator.category, iterator.description, iterator.id, iterator.image, iterator.price, iterator.rating, iterator.title))

    const template = document.getElementById('list-template').content.cloneNode(true)
template.querySelector(".card-img-top").src = iterator.image
template.querySelector(".card-title").innerHTML = iterator.title
template.querySelector(".card-text").innerHTML = iterator.description
template.querySelector(".categorycard").innerHTML = `Category: ${iterator.category}`
template.querySelector(".cardid").innerHTML = iterator.id
template.querySelector(".cardprice").innerHTML = `$${iterator.price}`
template.querySelector(".cardratingCount").innerHTML = `Number of Ratings: ${iterator.rating.count}`
template.querySelector(".cardratingRate").innerHTML = iterator.rating.rate
    console.log(newItem)
    console.log(template)

    document.querySelector("#main").appendChild(template)
}

    // use this JSON to find and set correct option data for the chart
})
