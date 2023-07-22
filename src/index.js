let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");


let search = () => {
    let userInp = document.getElementById("user-inp").value;
    if (userInp.length == 0) {
        result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
      } else {
        fetch(url + userInp)
        .then (res => res.json())
        .then (data => {
            document.getElementById("user-inp").value = "";
//            console.log(data);
//            console.log(data.drinks[0]);
            let searchDrink = data.drinks[0];
//            console.log(searchDrink.strDrink);
//            console.log(searchDrink.strDrinkThumb);
//            console.log(searchDrink.strInstructions);
            let count = 1;
            let ingredientList = [];
            for (let i in searchDrink) {
                let ingredient = "";
                let measure = "";
                if (i.startsWith("strIngredient") && searchDrink[i]) {
                    ingredient = searchDrink[i];
                    if (searchDrink[`strMeasure` + count]) {
                    measure = searchDrink[`strMeasure` + count];
                    } else {
                    measure = "";
                    }
                    count += 1;
                    ingredientList.push(`${measure} ${ingredient}`);
                }
                // console.log(ingredientList);
                result.innerHTML = `
                <img src=${searchDrink.strDrinkThumb}>
                <h1>${searchDrink.strDrink}</h2>
                <h2>Ingredients:</h3>
                <ul class="ingredients"></ul>
                <h2>Instructions:</h3>
                <p>${searchDrink.strInstructions}</p>
                `;
                let recipe = document.querySelector(".ingredients");
                ingredientList.forEach((item) => {
                let listItem = document.createElement("li");
                listItem.innerText = item;
                recipe.appendChild(listItem);
                });
            } 
        })
    }
}
window.addEventListener("load", search);
searchBtn.addEventListener("click", search); 


window.addEventListener("DOMContentLoaded", (e) => {
    const toggle = document.getElementById('lightDark')
    const body = document.querySelector('body');
    const card = 

    toggle.addEventListener('click', function(){ 
        this.classList.toggle('bi-moon');
        if(this.classList.toggle('bi-brightness-high-fill')){
            body.style.background = 'rgb(210, 140, 176)';
            body.style.color = 'black';
            body.style.transition = '2s'; 
            result.style.color = 'rgb(70, 0, 36)';       
        } else {
            body.style.background = 'rgb(70, 0, 36)';
            body.style.color = 'white';
            body.style.transition = '2s';
            result.style.color = 'rgb(210, 140, 176)';
        }
    })
})
