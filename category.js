
async function categoryMeals(){

   
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category')
    console.log(params)
    const catRes = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const catData = await catRes.json();
    const selectedCategory = catData.categories.find(c=>c.strCategory==category)

    document.getElementById('catTitle').textContent=selectedCategory.strCategory;
    document.getElementById('categoryImage').src=selectedCategory.strCategoryThumb;
    document.getElementById('catDescript').textContent=selectedCategory.strCategoryDescription;


}



categoryMeals();