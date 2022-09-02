const loadNewsCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
}

const displayNewsCategory = (categories) => {
    const categoriesContainer = document.getElementById('news-category-container')
    categories.forEach(category => {
        console.log(category);
        const categoriesDiv = document.createElement('div')
        categoriesDiv.innerHTML = `
        <a onclick="loadCategoryDetails(${category.category_id})" id="categories" class="btn btn-outline-primary">${category.category_name} </a>
        `
        categoriesContainer.appendChild(categoriesDiv)
    })
}

const loadCategoryDetails = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryDetails(data.data))

}

const displayCategoryDetails = (newses) => {
    console.log(newses)
    const newsContainer = document.getElementById('news-container')
    newsContainer.textContent = ``;
    newses.forEach(news => {
        const newsDiv = document.createElement('div')
        newsDiv.innerHTML = `
        <div>
        <img src="${news.image_url} ">
        </div>
        `
        newsContainer.appendChild(newsDiv)
    })
}


loadNewsCategory();