// Load News Category
const loadNewsCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'

    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
        .catch(error => console.log(error))
}

// Display News Category
const displayNewsCategory = (categories) => {
    const categoriesContainer = document.getElementById('news-category-container')

    categories.forEach(category => {
        // console.log(category);
        const categoriesDiv = document.createElement('div')
        categoriesDiv.innerHTML = `
        <button onclick="loadCategoryDetails(${category.category_id})" id="categories" class="mx-3 btn btn-outline-primary">${category.category_name} </button>
        `
        categoriesContainer.appendChild(categoriesDiv)
    })
}

// Load Category-Wise News
const loadCategoryDetails = (categoryId) => {
    toggleSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryDetails(data.data))
        .catch(error => console.log(error))

}

// Display Category-Wise News
const displayCategoryDetails = (newses) => {

    // console.log(newses)

    // Sorting Function (Greater to Smaller)

    newses.sort(function (a, b) {
        return b.total_view - a.total_view;
    });

    const newsContainer = document.getElementById('news-container')
    newsContainer.textContent = ``;

    // Show Number Of News
    const newsItemContainer = document.getElementById('news-item-container')
    newsItemContainer.textContent = ``;
    const newsItem = newses.length

    // console.log(newsItem)
    if (newsItem > 0) {
        const newsItemDiv = document.createElement('div')
        newsItemContainer.classList.remove('d-none')
        newsItemDiv.innerHTML = `
        <p class="shadow p-3 my-2 bg-body rounded text-center fw-semibold">Total Number Of News Available: ${newsItem}</p>
        `
        newsContainer.appendChild(newsItemDiv)
    }

    else {
        const newsItemDiv = document.createElement('div')
        newsItemContainer.classList.remove('d-none')
        newsItemDiv.innerHTML = `<p class="shadow p-3 my-2 bg-body rounded text-center fw-semibold text-danger">There is No News Available ${newsItem}</p>`
        newsContainer.appendChild(newsItemDiv)
    }

    newses.forEach(news => {
        // console.log(news)

        const newsDiv = document.createElement('div')

        newsDiv.innerHTML = `
        <div onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsModal" class="col-sm-12 col-lg-12 border bg-light d-flex align-items-center">
        <div><img src="${news.thumbnail_url} " class="img-fixed me-3" alt=""></div>
        <div class="w-75 ms-3 mt-2">
            <div>
                <h5 class="fw-bold">${news.title}</h5>
                <p class="fs-6 text-black-50 col-10 text-truncate">${news.details}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div>
              <img class="rounded-circle me-2" style="height: 50px; width: 50px;" src="${news.author.img}" alt="">
              <a> ${news.author ? news.author.name : 'No Data Found'}</a>
              </div>
             <a class=""><i class="fa-solid fa-eye mx-1"></i>${news.total_view}</a>
             <a class="me-3">Rating: ${news.rating ? news.rating.number : "No Data Found"}<i class="ms-1 fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></a>
            </div>
        </div>
    </div>
        `
        newsContainer.appendChild(newsDiv)
    })
    toggleSpinner(false)
}

// Spinner Part
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// Load News Details For Modal
const loadNewsDetails = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
        .catch(error => console.log(error))
}

// Display News Details in Modal
const displayNewsDetails = (newsId) => {

    const newsIdContainer = document.getElementById('news-id-container')
    newsIdContainer.textContent = ``;
    newsId.forEach(news => {
        // console.log(news)
        const newsIdDiv = document.createElement('div')
        newsIdDiv.classList.add('modal-content')
        newsIdDiv.innerHTML = `
        
        <div class="modal-header">
        <h5 class="modal-title fw-semibold fst-italic" id="newsModalLabel">${news.title} </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p class="fs-6 text-black">${news.details.slice(0, 600)}</p>
            <div class="d-flex justify-content-between align-items-center">
            <div>
            <img class="rounded-circle me-2" style="height: 50px; width: 50px;" src="${news.author.img}" alt="">
            <a> ${news.author ? news.author.name : 'No Data Found'}</a>
            </div>
            <a class=""><i class="fa-solid fa-eye mx-1"></i>${news ? news.total_view : "No Data Found"}</a>
            <a class="me-3">Rating: ${news.rating ? news.rating.number : 'No Data Found'}<i class="ms-1 fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></a>
       </div>
       <p class="mt-3 fs-6 text-black text-center fst-italic">Published Date: ${news.author.published_date} </p>      
        </div>
        <div class="modal-footer">       
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>

        `
        newsIdContainer.appendChild(newsIdDiv)
    })

}

// Call News Category In Top
loadNewsCategory();