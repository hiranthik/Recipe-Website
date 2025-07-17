const searchbtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");

searchbtn.addEventListener('click',async ()=> {
    resultsDiv.innerHTML = '<p>Loading....</p>';

const term = searchInput.value.trim();


try{
const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);

const data = await res.json();

resultsDiv.innerHTML='';

if(!data.meals){
    resultsDiv.innerHTML='<p> No meals found </p>'
    return;
}


data.meals.forEach(meal =>{
    const mealCard = document.createElement('div');
    mealCard.className='meal-card';

    const shortInstructions = meal.strInstructions.substring(0,100);
    const longInstructions = meal.strInstructions;


    mealCard.innerHTML=`<img src="${meal.strMealThumb}" alt="${meal.strMeal}"><h3>${meal.strMeal}</h3>
<p><strong>Category:</strong>${meal.strCategory}</p>
<p><strong>Cuisine: </strong>${meal.strArea}</p>
<p><strong>Instructions:</strong>
<span class="short-text">${shortInstructions}</span>
<span class="full-text" style="display:none">${longInstructions}</span>
<a href="#" class="toggle-text">Read More</a>
</p>
`;

const toggleLink = mealCard.querySelector('.toggle-text');
const shortText = mealCard.querySelector('.short-text');
const fullText = mealCard.querySelector('.full-text');

toggleLink.addEventListener('click',(e)=>{
    e.preventDefault();

    const isExpanded = fullText.style.display==='inline';

    if(isExpanded){
        shortText.style.display='inline';
        fullText.style.display='none';
        toggleLink.textContent='Read more';
    }
    else{
        shortText.style.display='none';
        fullText.style.display='inline';
        toggleLink.textContent='Read less';
    }

});
resultsDiv.appendChild(mealCard);
});

} catch(error){
    resultsDiv.innerHTML='<p>Error fetching meals</p>'
}
});





