import { API_KEY } from "/src/js/api-key.js";

/* API MOVIE DB*/ 

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },  
  params: {
    'api_key': API_KEY,
  },
});

swiperMain();
swiperCategories();
swiperSection();

const contenedor_banner = document.querySelector('#contenedor_banner');

export async function getBannerMain () {
  try { 
    const { data, status } = await api('movie/top_rated');

    if (status !== 200) throw Error('Error: ' + status);

    const banners = data.results;

    contenedor_banner.innerHTML = '';
    
    banners.forEach(banner => {
      contenedor_banner.innerHTML += `
        <div class="swiper-slide flex lg:bg-[#261a32]/80 backdrop-blur-md rounded-3xl my-4">
          <div class="w-[332px] h-[400px] mx-auto my-10 shadow-lg rounded-3xl md:w-[600px] md:h-[700px] md:my-14 lg:w-[400px] lg:h-[450px] lg:mx-16">
            <img class="w-full h-full rounded-3xl" src="https://image.tmdb.org/t/p/w500/${banner.poster_path}">
          </div>
          <div class="hidden lg:flex flex-col w-[525px] h-[400px] my-20">
            <h2 class="text-4xl mb-3 text-white font-bold">${banner.title} <span class="text-xl text-yellow-500 font-thin">${banner.vote_average} / 10</span></h2>
            <p class="text-balance text-xl text-white">${banner.overview}</p>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.log(error);
  }
}
const generos = document.querySelector('#generos');

export async function getCategoriesPreview () {
  try {
    const { data, status } = await api('genre/movie/list');

    if (status !== 200) throw Error('Error: ' + status);
    
    const categories = data.genres;

    generos.innerHTML = '';

    categories.forEach(gener => {
      generos.innerHTML += `
        <div class="swiper-slide cate w-[135px] h-[42px] md:h-[50px] md:w-[145px] lg:h-[55px] lg:w-[190px] text-center bg-[#22152D] rounded-full shadow-xl text-white font-semibold transition-all duration-100 ease-in-out hover:bg-[#5d3978] md:text-xl">
          <button id="${gener.id}" value="${gener.name}" class="py-3">${gener.name}</button>
        </div>  
      `;
    });
  } catch (error) {
    console.log(error);
  } finally {
    const categoria = document.querySelectorAll('.cate');

    categoria.forEach(element => {
     element.firstElementChild.addEventListener('click', () => {
        location.hash = `#category=${element.firstElementChild.id}-${element.firstElementChild.value}`;
     });
    });

    categoria.forEach(element => {
      element.firstElementChild.addEventListener('click', () => {
        getMoviesByCategory(element.firstElementChild.id, element.firstElementChild.value);
      });
     });
  }
}

const contenedor_trending = document.querySelector('#contenedor-trending');

export async function getTrendingMoviesPreview () {
  try {
    const { data, status } = await api('trending/movie/day');

    if (status !== 200) throw Error('Error: ' + status);

    const movies = data.results;

    contenedor_trending.innerHTML = '';

    movies.forEach(movie => {
      contenedor_trending.innerHTML += `
          <div class="swiper-slide flex justify-center">
          <div class="w-[155px] md:w-[190px] h-[250px] md:h-[350px] my-10 mx-8">
            <div class="w-[155px] h-[205px] mb-2 bg-white rounded-3xl md:w-[190px] md:h-[250px]"><img class="w-full h-full rounded-3xl" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"></div>
            <div class="w-[155px] h-[205px] md:w-[190px] md:h-[250px] sm:mb-2">
              <h3 class="text-center font-semibold text-black text-xl bg-[#D9D9D9] rounded-full mb-4">${movie.title}</h3>
              <p class="text-white text-center bg-yellow-300/50 rounded-full">Rate: <span class="text-base  font-normal">${movie.vote_average} / 10</span></p>
            </div>  
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.log(error);
  }
}

export async function getMoviesByCategory (id, name) {
  window.scrollTo(0, 0);
  try {
    const { data, status } = await api('discover/movie', {
      params: {
        with_genres: id,
      },
    });

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data);

    titulo_categoria.innerHTML = name;

  } catch (error) {
    console.log(error);
  } finally {
    contenedor_banner.innerHTML = '';
    generos.innerHTML = '';
    contenedor_trending.innerHTML = '';
  }
}

export async function getTrendingMoviesAll () {
  try {
    const { data, status } = await api('trending/movie/day');

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data);

    titulo_categoria.innerText = 'Trending';

  } catch (error) {
    console.log(error);
  } finally {
    contenedor_banner.innerHTML = '';
    generos.innerHTML = '';
    contenedor_trending.innerHTML = '';
  }
}

export async function getMoviesBySearch (query) {
  window.scrollTo(0, 0);
  query = decodeURI(query);
  try {
    const { data, status } = await api('search/movie', {
      params: {
        query,
      },
    });

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data);

    titulo_categoria.innerText = query;

  } catch (error) {
    console.log(error);
  } finally {
    contenedor_banner.innerHTML = '';
    generos.innerHTML = '';
    contenedor_trending.innerHTML = '';
  }
}

function genericList (data) {
  const movies_list = document.getElementById('movies-list');
  const titulo_categoria = document.getElementById('titulo_categoria');
  const movies = data.results;

  titulo_categoria.innerHTML = '';
  movies_list.innerHTML = '';

  movies.forEach(movie => {
    movies_list.innerHTML += `
      <div class="w-[150px] h-[230px] bg-white rounded-3xl lg:w-[180px] lg:h-[260px]">
        <img class="w-full h-full rounded-3xl" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}}">
      </div>
    `;
  });
}