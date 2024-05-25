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

swiperSection();
swiperBanner();

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
    const { data, status } = await api('movie/top_rated');

    if (status !== 200) throw Error('Error: ' + status);

    const banners = data.results;

    contenedor_banner.innerHTML = '';

    banners.forEach(banner => {
      contenedor_banner.innerHTML += `
        <div class="swiper-slide flex justify-center">
          <div id="${banner.id}" class="card w-[250px] shadow-lg">
            <img class="object-cover rounded-xl w-full h-full" data-img="https://image.tmdb.org/t/p/w400/${banner.poster_path}">
          </div>
          <div class="hidden w-[500px] h-fit ml-5 py-10 px-10 lg:flex flex-col">
            <h2 class="text-3xl text-white font-bold">${banner.title} <span class="text-xl text-yellow-500 font-thin">${banner.vote_average} / 10</span></h2>
            <p class="text-balance text-base text-white">${banner.overview}</p>
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
  }
}

async function getCategoriesPreview () {
  try {
    const { data, status } = await api('genre/movie/list');

    if (status !== 200) throw Error('Error: ' + status);
    
    const categories = data.genres;

    const generos = document.querySelector('#generos');
    generos.innerHTML = '';

    categories.forEach(gener => {
      generos.innerHTML += `
        <div class="swiper-slide flex items-center justify-center cate w-[135px] h-[42px] md:h-[50px] md:w-[145px] lg:h-[50px] lg:w-[190px] text-center bg-gray-700 rounded-full shadow-xl text-white font-semibold transition-all hover:bg-black md:text-xl">
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

async function getTrendingMoviesPreview () {
  try {
    const { data, status } = await api('trending/movie/day');

    if (status !== 200) throw Error('Error: ' + status);

    const contenedor_trending = document.querySelector('#contenedor-trending');
    genericPreview(contenedor_trending, data);

  } catch (error) {
    console.log(error);
  }
}

async function getNowPlayingMoviesPreview () {
  try {
    const { data, status } = await api('movie/now_playing');

    if (status !== 200) throw Error('Error: ' + status);

    const contenedor_nowPlaying = document.querySelector('#contenedor-nowPlaying');
    genericPreview(contenedor_nowPlaying, data);

  } catch (error) {
    console.log(error);
  }
}

async function getPopularMoviesPreview () {
  try {
    const { data, status } = await api('movie/popular');

    if (status !== 200) throw Error('Error: ' + status);

    const contenedor_popular = document.querySelector('#contenedor-popular');
    genericPreview(contenedor_popular, data);

  } catch (error) {
    console.log(error);
  }
}

async function getTopRatedMoviesPreview () {
  try {
    const { data, status } = await api('movie/top_rated?page=5');

    if (status !== 200) throw Error('Error: ' + status);

    const contenedor_toprated = document.querySelector('#contenedor-toprated');
    genericPreview(contenedor_toprated, data);

  } catch (error) {
    console.log(error);
  }
}

async function getUpcomingMoviesPreview () {
  try {
    const { data, status } = await api('movie/upcoming');

    if (status !== 200) throw Error('Error: ' + status);

    const contenedor_upcoming = document.querySelector('#contenedor-upcoming');
    genericPreview(contenedor_upcoming , data);

  } catch (error) {
    console.log(error);
  }
}

async function getMoviesByCategory (id, name, page, clean = true) {
  try {
    const { data, status } = await api('discover/movie', {
      params: {
        with_genres: id,
        page,
      },
    });

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data, clean);

    titulo_categoria.innerHTML = name;

  } catch (error) {
    console.log(error);
  }
}

async function getTrendingMoviesAll (page, clean = true) {
  try {
    const { data, status } = await api('trending/movie/day', {
      params: {
        page,
      }
    });

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data, clean);

    titulo_categoria.innerText = 'Trending';

  } catch (error) {
    console.log(error);
  }
}

async function getNowPlayingMoviesAll (page, clean = true) {
  try {
    const { data, status } = await api('movie/now_playing', {
      params: {
        page,
      }
    });

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data, clean);

    titulo_categoria.innerText = 'Now Playing';

  } catch (error) {
    console.log(error);
  }
}

async function getPopularMoviesAll (page, clean = true) {
  try {
    const { data, status } = await api('movie/popular', {
      params: {
        page,
      }
    });

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data, clean);

    titulo_categoria.innerText = 'Popular';

  } catch (error) {
    console.log(error);
  }
}

async function getTopratedMoviesAll (page, clean = true) {
  try {
    const { data, status } = await api('movie/top_rated', {
      params: {
        page,
      }
    });

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data, clean);

    titulo_categoria.innerText = 'Top Rated';

  } catch (error) {
    console.log(error);
  }
}

async function getUpcomingMoviesAll (page, clean = true) {
  try {
    const { data, status } = await api('movie/upcoming', {
      params: {
        page,
      }
    });

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data, clean);

    titulo_categoria.innerText = 'Upcoming';

  } catch (error) {
    console.log(error);
  }
}

async function getMoviesBySearch (query, page, clean = true) {
  query = decodeURI(query);
  try {
    const { data, status } = await api('search/movie', {
      params: {
        query,
        page,
      },
    });

    if (status !== 200) throw Error('Error: ' + status);

    genericList(data, clean);

    titulo_categoria.innerText = query;

  } catch (error) {
    console.log(error);
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
          <div class="w-[332px] h-[430px] overflow-hidden mx-auto my-10 rounded-xl md:w-[410px] md:h-[500px] md:my-20 lg:mx-10 lg:my-5">
            <img class="w-full h-full object-cover rounded-xl" src="https://image.tmdb.org/t/p/w500/${data.poster_path}">
          </div>
          <div class="lg:w-[500px] lg:h-[500px]">
            <div class="text-white text-center md:text-left lg:text-left">
              <h4 class="text-yellow-500 mb-2 md:text-xl">${data.vote_average} / 10</h4>
              <h2 class="text-white text-3xl font-semibold md:text-4xl">${data.title}</h2>
              <p class="text-white mt-5 text-balance md:text-xl">
                ${data.overview}
              </p>
            </div>
            <div id="tags" class="mt-5 h-[100px] flex justify-start flex-wrap gap-2 flex-auto"> 
            </div>
          </div>
        </div>
      `;

    const tags = document.getElementById('tags');

    data.genres.forEach((genre) => {
      tags.innerHTML += `
        <span class="w-[115px] h-[40px] bg-gray-700 rounded-full shadow-xl text-white font-semibold text-center leading-10">${genre.name}</span>
      `;
    });

  } catch (error) {
    console.log(error);
  }
}

function genericList (data, clean) {
  const movies_list = document.getElementById('movies-list');
  const titulo_categoria = document.getElementById('titulo_categoria');
  const movies = data.results;

  if (clean){
    titulo_categoria.innerHTML = '';
    movies_list.innerHTML = '';
  }

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
      <div class="swiper-slide flex justify-center w-[240px]">
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
