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
        <div class="col-sm-12 col-lg-12 border bg-light d-flex align-items-center">
        <div><img src="${news.thumbnail_url} " class="img-fluid me-3" alt=""></div>
        <div class="ms-3 mt-2">
            <div>
                <h5 class="fw-bold">${news.title}</h5>
                <p class="fs-6 text-black-50">${news.details.slice(0, 100)}</p>
            </div>
            <div>
            <img class="rounded-circle m-2" style="height: 50px; width: 50px;" src="${news.author.img}" alt="">
    
            <a> ${news.author.name}</a>
            </div>
        </div>
    </div>
        `
        newsContainer.appendChild(newsDiv)
    })
}


loadNewsCategory();