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
                console.log(ingredientList);
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