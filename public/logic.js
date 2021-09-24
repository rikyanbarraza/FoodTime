const searchInput = document.getElementById('search');
const formSubmit = document.getElementById('form-submit');
const randomBtn = document.getElementById('random-btn');
const meal = document.getElementById('meal');
const meals = document.getElementById('meals');
const keyword = document.getElementById('keyword');
const myBtn = document.getElementById('my-btn');

const searchMeal = async (e) => {
  e.preventDefault();
  const input = searchInput.value;
  keyword.innerHTML = '';
  meal.innerHTML = '';

  if (input.trim()) {
    try {
      const data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
      ).then((res) => res.json());

      if (data.meals === null) {
        keyword.innerHTML = `To hipster, try something old fashion!`;
      } else {
        keyword.innerHTML = `<h2>Showing result for: ${input}</h2>`;
        meals.innerHTML = data.meals
          .map(
            (meal, index) => `
            <div class='meal' key='${index}'>
                <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
                <div class='meal-info' data-mealID='${meal.idMeal}'>
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        `
          )
          .join('');
        searchInput.value = '';
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    alert('Please type something!');
  }
};

const displayMeal = (mealDetails) => {
  const ingredient1 = [];
  for (let i = 1; i <= 20; i++) {
    if (mealDetails[`strIngredient${i}`].length > 0) {
      ingredient1.push(
        `${mealDetails[`strIngredient${i}`]} - ${mealDetails[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  meal.innerHTML = 
    `<div class='meal'>
        <h1>${mealDetails.strMeal}</h1>
            <img src='${mealDetails.strMealThumb}' alt='${mealDetails.strMeal}'/>
                <div class='single-meal-info'>${mealDetails.strCategory ? `
                    <p>${mealDetails.strCategory}</p>` : ''}
                    ${mealDetails.strArea ? `
                    <p>${mealDetails.strArea}</p>` : ''}
                </div>

    <div class='single-meal-details'>
      ${
        mealDetails.strInstructions ? `
        <p>${mealDetails.strInstructions}</p>`
          : ''
      }
        <h2>Ingrediants</h2>
            <ul>
                ${ingredient1.map((ing) => `
                <li>${ing}</li>`).join('')}
            </ul>
    </div>
  </div>`;
};

const getMealById = async (mealID) => {
  try {
    const mealData = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    ).then((res) => res.json());

    displayMeal(mealData.meals[0]);

    document.querySelector('#single-meal').scrollIntoView({
      behavior: 'smooth',
    });
  } catch (err) {
    console.error(err);
  }
};

const getMealDetails = (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealID');
    getMealById(mealID);
  }
};

const getRandomMealDetails = async () => {
  keyword.innerHTML = '';
  meals.innerHTML = '';

  try {
    const mealData = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    ).then((res) => res.json());

    displayMeal(mealData.meals[0]);
  } catch (err) {
    console.error(err);
  }
};

formSubmit.addEventListener('submit', searchMeal);
meals.addEventListener('click', getMealDetails);
randomBtn.addEventListener('click', getRandomMealDetails);

async function collectText() {
    const textToDisplay = await makeRequest("http://localhost:3000/api", "GET")
    const header = document.getElementsByTagName("h1")[0]
    header.innerText = textToDisplay
}

async function fetchApiData() {
    const status = await makeRequest("/api/meals", "GET")
    document.getElementById("meal").innerText=status 
}

async function addApiData() { 
  let search = document.getElementById("search")
  let add = search.value
  const status = await makeRequest("/api/meals/add", "POST", {add} )
  console.log(status)
}

async function makeRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method,
            body: JSON.stringify(body)
        })
        console.log(response)
        const result = await response.json()
        return result
    } catch(err) {
        console.error(err)
    }
}