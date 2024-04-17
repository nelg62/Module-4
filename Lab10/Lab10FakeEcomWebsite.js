// class creator for products
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
// array to store products to update and diplay
const newItem = []

// array to store caregorys for drpdown sort
const tempCategorys = []
const tempCategorys2 = []

// axios get fake stor api data 
axios.get('https://fakestoreapi.com/products').then((response) => {
    // console.log(response.data)

    // sort through data
    for (const iterator of response.data) {
        // push items to the new item array using the class constrructor 
        newItem.push(new Items(iterator.category, iterator.description, iterator.id, iterator.image, iterator.price, iterator.rating, iterator.title))

        // use upadte data on template with api data
        const template = document.getElementById('list-template').content.cloneNode(true)
        template.querySelector(".card-img-top").src = iterator.image
        template.querySelector(".card-title").innerHTML = iterator.title
        template.querySelector(".card-text").innerHTML = iterator.description
        template.querySelector(".categorycard").innerHTML = `Category: ${iterator.category}`
        template.querySelector(".cardid").innerHTML = iterator.id
        template.querySelector(".cardprice").innerHTML = `$${iterator.price}`
        template.querySelector(".cardratingCount").innerHTML = `Number of Ratings: ${iterator.rating.count}`
        template.querySelector(".cardratingRate").innerHTML = iterator.rating.rate
        // console.log(newItem)
        // console.log(template)

        // show the data for the template in html
        document.querySelector("#main").appendChild(template)

        // push caterories to the temp array tempcaregories
        tempCategorys.push(iterator.category)
        // console.log(iterator.category)     
    }

    const setArray = new Set(tempCategorys)
    // console.log(...setArray)
    tempCategorys2.push(...setArray)
    console.log(tempCategorys2)

    tempCategorys2.forEach((item) => {
        const option = document.createElement('option')
        option.text = item
        option.value = item
        template2.querySelector(".dropdownOption").appendChild(option)
    })
    document.querySelector("#sortmenu").appendChild(template2)

    console.log(newItem)


    document.querySelector('.dropdownOption').addEventListener('change', function (event) {
        const selectedCategory = event.target.value
        console.log(selectedCategory)

        document.getElementById('main').innerHTML = ''

        const filterItems = selectedCategory === 'all' ? newItem : newItem.filter(item => item.category === selectedCategory)

        filterItems.forEach(item => {
            const template = document.getElementById('list-template').content.cloneNode(true)
            template.querySelector(".card-img-top").src = item.image
            template.querySelector(".card-title").innerHTML = item.title
            template.querySelector(".card-text").innerHTML = item.description
            template.querySelector(".categorycard").innerHTML = `Category: ${item.category}`
            template.querySelector(".cardid").innerHTML = item.id
            template.querySelector(".cardprice").innerHTML = `$${item.price}`
            template.querySelector(".cardratingCount").innerHTML = `Number of Ratings: ${item.rating.count}`
            template.querySelector(".cardratingRate").innerHTML = item.rating.rate

            document.getElementById('main').appendChild(template)
        })
    })

})


const template2 = document.getElementById('dropsort').content.cloneNode(true)






