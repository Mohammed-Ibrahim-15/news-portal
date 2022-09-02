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
        <div onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsModal" class="col-sm-12 col-lg-12 border bg-light d-flex align-items-center">
        <div><img src="${news.thumbnail_url} " class="img-fluid me-3" alt=""></div>
        <div class="ms-3 mt-2">
            <div>
                <h5 class="fw-bold">${news.title}</h5>
                <p class="fs-6 text-black-50">${news.details.slice(0, 200)}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div>
              <img class="rounded-circle me-2" style="height: 50px; width: 50px;" src="${news.author.img}" alt="">
              <a> ${news.author ? news.author.name : 'No Data Found'}</a>
              </div>
             <a class=""><i class="fa-solid fa-eye mx-1"></i>${news.total_view}</a>
             <a class="me-3">Rating: ${news.rating ? news.rating.number : 'No Data Found'}<i class="ms-1 fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></a>
            </div>
        </div>
    </div>
        `
        newsContainer.appendChild(newsDiv)
    })
}

const loadNewsDetails = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
}

const displayNewsDetails = (newsId) => {

    const newsIdContainer = document.getElementById('news-id-container')
    newsIdContainer.textContent = ``;
    newsId.forEach(news => {
        console.log(news)
        const newsIdDiv = document.createElement('div')
        newsIdDiv.classList.add('modal-content')
        newsIdDiv.innerHTML = `
        
        <div class="modal-header">
        <h5 class="modal-title" id="newsModalLabel">${news.title} </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p class="fs-6 text-black-50">${news.details}</p>
            <div class="d-flex justify-content-between align-items-center">
            <div>
            <img class="rounded-circle me-2" style="height: 50px; width: 50px;" src="${news.author.img}" alt="">
            <a> ${news.author ? news.author.name : 'No Data Found'}</a>
            </div>
            <a class=""><i class="fa-solid fa-eye mx-1"></i>${news.total_view}</a>
            <a class="me-3">Rating: ${news.rating ? news.rating.number : 'No Data Found'}<i class="ms-1 fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></a>
       </div>
          
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>

        `
        newsIdContainer.appendChild(newsIdDiv)
    })

}


loadNewsCategory();