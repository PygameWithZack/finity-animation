const SearchInput = document.querySelector('#search-anime'),
SearchForm = document.querySelector('.search-form')

// Initialize Swiper
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
});
var swiper = new Swiper('.swiper-container1', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
});
var swiper = new Swiper('.swiper-container-search', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
recomendation()
Upcoming()

SearchInput.addEventListener('keyup' , e =>{
  let anime = capitalize(e.target.value)
  if (anime.length > 0){
    document.querySelector('#search-info').classList.remove('hide');
    getAnime(anime)
  }else{
    document.querySelector('#search-info').classList.add('hide');
  }
})

SearchForm.addEventListener('submit' , (e) =>{
  e.preventDefault();
  const anime = SearchInput.target.value;
  getAnime(anime)
})
function recomendation(){
  
// Fetch recommended anime from Jikan API
fetch('https://api.jikan.moe/v4/recommendations/anime')
.then(response => response.json())
.then(data => {
  
  // Loop through the recommendations and create HTML for each anime
  data.data.forEach(anime => {
    anime.entry.forEach(element => {
      
      const animeCard = document.createElement('a');
      animeCard.classList.add('anime-card');
      animeCard.classList.add('swiper-slide')
      animeCard.href = element.url;
      animeCard.innerHTML = `
        <img src="${element.images.jpg.image_url}" alt="" class="a-img">
        <p class="name">${element.title}</p>
      `;
      document.querySelector('.recomendation').appendChild(animeCard);
    

    });
  });
})
.catch(error => console.error(error));


}

function Upcoming(){
  
let base_url = `https://api.jikan.moe/v4/seasons/upcoming`;
fetch(base_url )
  .then(response => response.json())
  .then(data => {
    // Print the titles of the top 10 action anime
    console.log(data)
    data.data.forEach(anime => {
    
        if (anime.year === null){
          anime.year = 'Unknown'
        }
        const animeCard = document.createElement('a');
        animeCard.classList.add('anime-card');
        animeCard.classList.add('swiper-slide')
        animeCard.href = anime.url;
        animeCard.innerHTML = `
          <img src="${anime.images.jpg.image_url}" alt="" class="a-img">
          <p class="name">${anime.title}</p>
          <p class="year">${anime.year}</p>
          
        `;
        document.querySelector('.upcoming').appendChild(animeCard);
      

    });
    
  })
  .catch(error => console.error(error));


}

function getAnime(anime){
  document.querySelector('.search-box').innerHTML = '';  
  document.querySelector('.search-box').parentElement.querySelector('.title-a').innerHTML = `<i class='bx bx-search-alt'></i> Result from ${anime}`;  
let url = `https://api.jikan.moe/v4/anime?q=${anime}`;
fetch(url )
  .then(response => response.json())
  .then(data => {
    data.data.forEach(anime => {
    
      if (anime.year === null){
        anime.year = 'Unknown'
      }
      const animeCard = document.createElement('a');
      animeCard.classList.add('anime-card');
      animeCard.classList.add('swiper-slide')
      animeCard.href = anime.url
      animeCard.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="" class="a-img">
        <p class="name">${anime.title}</p>
        <p class="year">${anime.year}</p>
        
      `;
      document.querySelector('.search-box').appendChild(animeCard);
    

  });

  })
  .catch(error => console.error(error));
}