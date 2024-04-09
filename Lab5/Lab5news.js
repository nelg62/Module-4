let news = [
    {
        id: 1, title: 'Election Results',
        content: "Newly elected minister..."
    },
    {
        id: 2, title: 'Sporting Success',
        content: "World Cup winners..."
    },
    {
        id: 3, title: 'Tornado Warning',
        content: "Residents should prepare..."
    }
];


let newsrefresh
const form = document.querySelector('form')
function getNews() {
    return new Promise(resolve => {
        newsrefresh = setInterval(() => {
            resolve(news)
            console.log(news)
        }, 5000)
    })
}

function stopRefresh() {
    clearInterval(newsrefresh)
    console.log("news has been paused")
}

function startRefresh() {
    stopRefresh()
    document.querySelector('#newsStories').innerHTML = ""
    getNews().then((news) => news.forEach(newss => addNews(newss)))
}


function formInfo(event) {
    event.preventDefault()
    const formData = new FormData(form)
    console.log(formData.get("NewsContentTitleInput"))
    console.log(formData.get("NewsContentFormInput"))
    const newNews = {id: news.length+1, title: formData.get("NewsContentTitleInput"), content: formData.get("NewsContentFormInput")}
    news.push(newNews)
    addNews(newNews)
    form.reset()
}

function addNews(newsInfo) {
    const template = document.getElementById('newsTemplate').content.cloneNode(true)
    console.log(template)
    console.log("addnews in news info", newsInfo)
    template.querySelector('.newsID').innerHTML = newsInfo.id
    template.querySelector('.newsTitle').innerHTML = newsInfo.title
    template.querySelector('.newsContent').innerHTML = newsInfo.content

    document.querySelector('#newsStories').appendChild(template)
}

getNews().then((news) => news.forEach(newss => addNews(newss)))