// Define the Characters function to fetch and display anime characters
function Characters(callback) {
    fetch('https://api.jikan.moe/v4/characters')
      .then(response => response.json())
      .then(data => {
        data.data.forEach(anime => {
            console.log(anime)
          const animeCard = document.createElement('div');
          animeCard.classList.add('char');
          animeCard.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="">
            <p class="name">${anime.name}</p>
            <p class="fav"><i class='bx bx-heart'></i> ${anime.favorites}</p>
            <div class="card" style="display:none;">
              <div class="top">
                <img src="${anime.images.jpg.image_url}" alt="">
                <h2 class="name">${anime.name}</h2>    
              </div>
              <div class="mid">
                <p class="kanji">Name_kanji : ${anime.name_kanji} </p>
                <p class="fav">favorites : ${anime.favorites}</p>
                <p class="nicknames">Nicknames :  ${anime.nicknames}</p>
              </div>
              <h2 class="about">About : </h2>
              <p class="info">
                ${anime.about}
              </p>
            </div>
          `;
          document.querySelector('.characters').appendChild(animeCard);
        });
        // Call the callback function after the Characters function has finished
        callback();
      });
  }
  
  // Define the charData function to retrieve and process anime character data
  function charData() {
    const char = document.querySelectorAll('.characters .char'), 
    dataContainer = document.querySelector('.character-details')

    char.forEach(character => {
        character.addEventListener('click' , () =>{
            let card = document.createElement('div');
            card.classList.add('card')
            let data = character.querySelector('.card').innerHTML;
            card.innerHTML = data;
            console.log(card.outerHTML)
            dataContainer.innerHTML = card.outerHTML;
        })
    });
  }
  
  // Call the Characters function with the charData function as a callback
  Characters(charData);

    function getCharacter(anime){
// Fetch recommended anime from Jikan API
fetch('https://api.jikan.moe/v4/characters?q='+anime)
    .then(response => response.json())
    .then(data => {
    document.querySelector('.characters-s').innerHTML = '';
    // Log the API response to the console
    console.log(data);

    // Loop through the anime data and create a card for each anime
    data.data.forEach(character => {
        const characterCard = document.createElement('a');
        characterCard.classList.add('char');
        characterCard.href = character.url;
        characterCard.innerHTML = `
        <img src="${character.images.jpg.image_url}" alt="">
        <p class="name">${character.name}</p>
        <p class="fav"><i class='bx bx-heart'></i> ${character.favorites}</p>
        `;
        document.querySelector('.characters-s').appendChild(characterCard);
    });
    })
    .catch(error => console.error(error));

    return true
}



const Form = document.querySelector('.search-form')

Form.addEventListener('submit'  , e =>{
    e.preventDefault()

    Char = document.querySelector('#search-char').value;

    getCharacter(Char)
})





