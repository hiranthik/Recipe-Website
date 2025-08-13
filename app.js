const searchbtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");


searchbtn.addEventListener('click',async ()=> {
    resultsDiv.innerHTML = '<p>Loading....</p>';


const term = searchInput.value.trim();


document.getElementById('category-section').style.display='none';
document.getElementById('cuisine-section').style.display='none';
const res = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
   
);
console.log(res)

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

<a href="meal.html?id=${meal.idMeal}" class="read-more-link">Read More...</a>
`
;

resultsDiv.appendChild(mealCard);

});

});
// function debounce(func, delay) {
//   let timeoutId;
//   return function(...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// }


async function loadCategories(){
   const container = document.getElementById('categories');
    try{
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

console.log(res)
        const data = await res.json()
        const categories = data.categories;
        
        // const container = document.getElementById('categories')
        container.innerHTML = '';

        categories.forEach(category =>{
            const card = document.createElement('div')
            card.className = 'category-card';

            card.innerHTML = `
            <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
            <h3>${category.strCategory}</h3>`;

            card.addEventListener('click',()=>{
                window.location.href=`categoryMeals.html?category=${category.strCategory}`;
            });
            container.appendChild(card)
        });    
    }
    catch(error){
        container.innerHTML=`<p>Failed to load categories:${error.message}</p>`
    }
}

loadCategories();



async function loadCuisines(){
         const res=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        const data = await res.json()

       
        const cuisinesDiv=document.getElementById('cuisines');
        cuisinesDiv.innerHTML=''
    
    for(const area of data.meals){
        const areaName = area.strArea;


        try{
     
        const mealRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
        );
        console.log(mealRes)
        const mealData = await mealRes.json();

        // console.log(mealData)
        if(mealData.meals && mealData.meals.length>0){
            const firstMeal = mealData.meals[0];
        

        const card = document.createElement('div')
        card.className='cuisine-card';

        card.innerHTML=`
        <img src="${firstMeal.strMealThumb}" alt="${areaName}"
        <h3 style="padding:1rem"><strong>${areaName}</strong></h3>
        `
        card.addEventListener('click',()=>{
            window.location.href=`areaMeals.html?area=${areaName}`
        });

        cuisinesDiv.appendChild(card);
    }
       } 
    catch(error){
        cuisinesDiv.innerHTML=`<p>Failed to load cuisines:${error.message}</p>`
}
}
}
loadCuisines()
 

