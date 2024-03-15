const API_KEY = '719774223726a48b1961aa172e858123';

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

//Utils

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute('data-img');
      entry.target.setAttribute('src', url);
    }
  });
});

const contenedor_banner = document.querySelector('#contenedor_banner');

async function getBannerMain () {
  try { 
    const { data, status } = await api('movie/top_rated?page=2');

    if (status !== 200) throw Error('Error: ' + status);

    const banners = data.results;

    contenedor_banner.innerHTML = '';

    banners.forEach(banner => {
      contenedor_banner.innerHTML += `
        <div class="swiper-slide flex lg:bg-[#261a32]/80 backdrop-blur-md rounded-3xl my-4">
          <div id="${banner.id}" class="card w-[332px] h-[400px] bg-gray-500/60 mx-auto my-10 shadow-lg rounded-3xl md:w-[600px] md:h-[700px] md:my-14 lg:w-[400px] lg:h-[450px] lg:mx-16">
            <img class="w-full h-full rounded-3xl" data-img="https://image.tmdb.org/t/p/w500/${banner.poster_path}">
          </div>
          <div class="hidden lg:flex flex-col w-[525px] h-[400px] my-20">
            <h2 class="text-4xl mb-3 text-white font-bold">${banner.title} <span class="text-xl text-yellow-500 font-thin">${banner.vote_average} / 10</span></h2>
            <p class="text-balance text-xl text-white">${banner.overview}</p>
          </div>
        </div>
      `;
    });

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        location.hash = 'movie=' + card.id;
      });
      lazyLoader.observe(card.firstElementChild);
    });

  } catch (error) {
    console.log(error);
  } finally {
    swiperMain();
  }
}
const generos = document.querySelector('#generos');

async function getCategoriesPreview () {
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

    swiperCategories();
  }
}

const contenedor_trending = document.querySelector('#contenedor-trending');

async function getTrendingMoviesPreview () {
  try {
    const { data, status } = await api('trending/movie/day');

    if (status !== 200) throw Error('Error: ' + status);

    genericPreview(contenedor_trending, data);

  } catch (error) {
    console.log(error);
  } finally {
    swiperTrending();
  }
}

const contenedor_nowPlaying = document.querySelector('#contenedor-nowPlaying');

async function getNowPlayingMoviesPreview () {
  try {
    const { data, status } = await api('movie/now_playing');

    if (status !== 200) throw Error('Error: ' + status);

    genericPreview(contenedor_nowPlaying, data);

  } catch (error) {
    console.log(error);
  } finally {
    swiperPlaying();
  }
}

const contenedor_popular = document.querySelector('#contenedor-popular');

async function getPopularMoviesPreview () {
  try {
    const { data, status } = await api('movie/popular');

    if (status !== 200) throw Error('Error: ' + status);

    genericPreview(contenedor_popular, data);

  } catch (error) {
    console.log(error);
  } finally {
    swiperPopular();
  }
}

const contenedor_toprated = document.querySelector('#contenedor-toprated');

async function getTopRatedMoviesPreview () {
  try {
    const { data, status } = await api('movie/top_rated?page=5');

    if (status !== 200) throw Error('Error: ' + status);

    genericPreview(contenedor_toprated, data);

  } catch (error) {
    console.log(error);
  } finally {
    swiperRated();
  }
}

const contenedor_upcoming = document.querySelector('#contenedor-upcoming');

async function getUpcomingMoviesPreview () {
  try {
    const { data, status } = await api('movie/upcoming');

    if (status !== 200) throw Error('Error: ' + status);

    genericPreview(contenedor_upcoming , data);

  } catch (error) {
    console.log(error);
  } finally {
    swiperComing();
  }
}

async function getMoviesByCategory (id, name) {
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
  }
}

async function getTrendingMoviesAll () {
  try {
    const { data, status } = await api('trending/movie/day');

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data);

    titulo_categoria.innerText = 'Trending';

  } catch (error) {
    console.log(error);
  } finally {
    contenedor_banner.innerHTML = '';
  }
}

async function getNowPlayingMoviesAll () {
  try {
    const { data, status } = await api('movie/now_playing');

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data);

    titulo_categoria.innerText = 'Now Playing';

  } catch (error) {
    console.log(error);
  } finally {
    contenedor_banner.innerHTML = '';
  }
}

async function getPopularMoviesAll () {
  try {
    const { data, status } = await api('movie/popular');

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data);

    titulo_categoria.innerText = 'Popular';

  } catch (error) {
    console.log(error);
  } finally {
    contenedor_banner.innerHTML = '';
  }
}

async function getTopratedMoviesAll () {
  try {
    const { data, status } = await api('movie/top_rated');

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data);

    titulo_categoria.innerText = 'Top Rated';

  } catch (error) {
    console.log(error);
  } finally {
    contenedor_banner.innerHTML = '';
  }
}

async function getUpcomingMoviesAll () {
  try {
    const { data, status } = await api('movie/upcoming');

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data);

    titulo_categoria.innerText = 'Upcoming';

  } catch (error) {
    console.log(error);
  } finally {
    contenedor_banner.innerHTML = '';
  }
}

async function getMoviesBySearch (query) {
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
  }
}

async function getMovieById (id) {
  try {
    const { data, status } = await api('movie/' + id);

    if (status !== 200) throw Error('Error: ' + status);

    const container = document.getElementById('details-section');

    container.innerHTML = '';

    container.innerHTML = `
        <div class="my-10 mx-5 lg:flex lg:justify-center lg:items-center lg:my-0">
          <div class="w-[332px] h-[430px]  mx-auto my-10 rounded-3xl md:w-[410px] md:h-[500px] md:my-20 lg:mx-10 lg:my-5">
            <img class="w-full h-full rounded-2xl" src="https://image.tmdb.org/t/p/w500/${data.poster_path}">
          </div>
          <div class="lg:w-[500px] lg:h-[500px]">
            <div class="text-white text-center md:text-left">
              <h4 class="text-yellow-500 mb-2 md:text-xl">${data.vote_average} / 10</h4>
              <h2 class="text-3xl font-semibold md:text-4xl">${data.title}</h2>
              <p class="mt-5 text-balance md:text-xl">
                ${data.overview}
              </p>
            </div>
            <h5 class="text-yellow-600 font-semibold ml-5 mt-5 md:ml-0">Tags</h5>
            <div id="tags" class="mt-5 h-[100px] flex justify-start flex-wrap gap-2 flex-auto"> 
            </div>
          </div>
        </div>
      `;

    const tags = document.getElementById('tags');

    data.genres.forEach((genre) => {
      tags.innerHTML += `
        <span class="w-[115px] h-[40px] bg-[#39234a] rounded-full shadow-xl text-white font-semibold text-center leading-10">${genre.name}</span>
      `;
    });

  } catch (error) {
    console.log(error);
  } finally {
    contenedor_banner.innerHTML = '';
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
      <div id=${movie.id} class="card w-[150px] h-[230px] bg-gray-500/60 rounded-3xl lg:w-[180px] lg:h-[260px]">
        <img class="movieImg w-full h-full rounded-3xl" alt='${movie.title}' data-img="https://image.tmdb.org/t/p/w300/${movie.poster_path}}">
      </div>
    `;
  });

  const cards = document.querySelectorAll('.card');
  const pelis = document.querySelectorAll('.movieImg');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      location.hash = 'movie=' + card.id;
    });

    card.firstElementChild.addEventListener('error', () => {
      card.innerHTML = `<p class="py-10 h-10 text-center text-xl">${card.firstElementChild.alt}<br>No image found</p>`;
    });
  });

  pelis.forEach(peli => {
    lazyLoader.observe(peli);
  });
}

function genericPreview (container, data) {
  const preview = data.results;
  container.innerHTML = '';

  preview.forEach(movie => {
    container.innerHTML += `
      <div class="swiper-slide flex justify-center">
        <div id=${movie.id} class="card flex flex-col justify-center items-center w-[155px] md:w-[190px] h-[250px] md:h-[350px] my-10 mx-8 cursor-pointer">
          <div class="w-[155px] h-[205px] mb-2 bg-gray-500/60 rounded-3xl md:w-[190px] md:h-[250px]"><img class="movieImg w-full h-full rounded-3xl" data-img="https://image.tmdb.org/t/p/w300/${movie.poster_path}"></div>
          <div class="w-[200px] h-[205px] md:w-[195px] md:h-[250px] sm:mb-2">
            <h3 class="text-center font-semibold text-black text-xl bg-[#D9D9D9] rounded-full mb-4">${movie.title}</h3>
            <p class="text-white text-center bg-yellow-300/50 rounded-full">Rate: <span class="text-base  font-normal">${movie.vote_average} / 10</span></p>
          </div>  
        </div>
      </div>
    `;
  });
  
  const cards = document.querySelectorAll('.card');
  const pelis = document.querySelectorAll('.movieImg');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      location.hash = 'movie=' + card.id;
    });
  });

  pelis.forEach(peli => {
    lazyLoader.observe(peli);
  });
}
