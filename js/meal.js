const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    if (searchText == '') {
        return 'white something to display'
    }
    // clear input field 
    searchField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displaySearchResult(data.meals)

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displaySearchResult(data.meals));
}

const displaySearchResult = (meals) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (meals.length == 0) {
        const errorMessage = document.getElementById('error-message');
        const div = document.createElement('div');
        div.innerText = `<p>Not found</p>`;
        errorMessage.appendChild(div)
    } else {
        meals.forEach(meal => {
            // console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div  onclick="loadMealDetail('${meal.idMeal}')" class="card  text-black rounded small shadow">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text overflow-hidden">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
            
            `;
            searchResult.appendChild(div);
        })
    }
}
const loadMealDetail = async (mealId) => {
    const url = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)

    const res = await fetch(url)
    const data = await res.json();
    mealDisplayDetails(data.meals[0])

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => mealDisplayDetails(data.meals[0]))
}

const mealDisplayDetails = (meal) => {
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    mealDetails.textContent = ' ';
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">More food</a>
    </div>
    `;
    mealDetails.appendChild(div);
}

