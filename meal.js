async function fetchMealDetails() {
    
    const params = new URLSearchParams(window.location.search);
    const mealId = params.get('id');

    const container= document.getElementById('meal-details');
   

    if(!mealId){
        container.innerHTML= '<p>meal ID could not be found</p>';
        return;
    }

   try{
    
    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await res.json();

    if(!data.meals){
        container.innerHTML='<p>Meal not found</p>'
        return;
    }

    const meal = data.meals[0];
     document.title = meal.strMeal;
        let ingredientsHTML = '<ul>'
            for(let i=1;i<=20;i++){
                const ingredient=meal[`strIngredient${i}`]
                const measure = meal[`strMeasure${i}`]
                if(ingredient&&ingredient.trim()){
                    ingredientsHTML += `<li>${measure} ${ingredient}</li>`;
                }
            }
            ingredientsHTML+='</ul>'

            let stepsHTML = '';
            if(meal.strInstructions.includes('STEP 1')){
                const steps = meal.strInstructions.split(/STEP \d+/).filter(s=>s.trim()!=='');
                stepsHTML=steps.map((s,index)=>`<li>STEP ${index +1} : ${s.trim()}</li>`).join('\n');

            }
            else{
            const steps = meal.strInstructions.replace(/^\d+\.\s*/gm,'')
            .split(/\r?\n/)
            .filter(step => step.trim() !=='');
            stepsHTML = steps.map(step=>`<li>${step.trim()}</li>`).join('\n')
           
            }

             container.innerHTML = `
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div><strong>Category: ${meal.strCategory}</strong></div>
            <div><strong>Cuisine: ${meal.strArea}</strong></div>

            <h2>Ingredients</h2>
                ${ingredientsHTML}

            <h2>Instructions</h2>
                <ol class="hello">${stepsHTML}</ol>

            <a href="index.html" class="back-link">Back to search</a>

            `;

   }
   catch(error){
    container.innerHTML=`<p>Error loading meals: ${error.message}</p>`
   }

}

fetchMealDetails()