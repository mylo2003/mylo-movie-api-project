/* Menu mobile and Tablet */
function abrirCerrarMenu () {
  i.classList.toggle('bx-x');

  if(navList.classList.contains('-top-full')){
    navList.classList.replace('-top-full', 'top-12');
    navList.classList.replace('hidden', 'flex');
  } else {
    navList.classList.replace('top-12', '-top-full');
    navList.classList.replace('flex', 'hidden');
  }
}
menu.addEventListener('click', abrirCerrarMenu);

etiquetas.forEach(element => {
  element.addEventListener('click', abrirCerrarMenu);
});

const navigator = () => {
  const HASHES = {
    '#list='    : () => listPage(),
    '#search='   : () => searchPage(),
    '#movie='    : () => movieDetailsPage(),
    '#category=' : () => categoriesPage()
  };

  for (const KEY of Object.keys(HASHES)) {
    if(location.hash.startsWith(KEY)) {
      HASHES[KEY]();

      return;
    }
  }

  homePage();
}

const homePage = () => {
  contenedor_banner.innerHTML = '';
  window.scrollTo(0, 0);

  titulo_pagina.classList.replace('flex', 'hidden');
  details_section.classList.add('hidden');
  movies_section.classList.add('hidden');

  nav_home_lg.classList.replace('lg:hidden', 'lg:flex');
  nav_home_sm.classList.replace('lg:flex', 'lg:hidden');
  
  main_banner.classList.remove('hidden');
  main_categories.classList.remove('hidden');
  main_sections.classList.remove('hidden');

  inputFormSearch.value = '';
  loadMoreBtn.value = '1';
  
  getBannerMain();
  getCategoriesPreview();
  getTrendingMoviesPreview();
  getNowPlayingMoviesPreview();
  getPopularMoviesPreview();
  getTopRatedMoviesPreview();
  getUpcomingMoviesPreview();
}

const categoriesPage = () => {
  window.scrollTo(0, 0);
  titulo_pagina.classList.replace('hidden', 'flex');

  nav_home_lg.classList.replace('lg:flex', 'lg:hidden');
  nav_home_sm.classList.replace('lg:hidden', 'lg:flex')

  details_section.classList.add('hidden');

  movies_section.classList.remove('hidden');
  main_banner.classList.add('hidden');
  main_categories.classList.add('hidden');
  main_sections.classList.add('hidden');

  formMovies.classList.replace('hidden', 'flex');
};

const movieDetailsPage = () => {
  window.scrollTo(0, 0);
  titulo_pagina.classList.replace('hidden', 'flex');

  nav_home_lg.classList.replace('lg:flex', 'lg:hidden');
  nav_home_sm.classList.replace('lg:hidden', 'lg:flex')

  movies_section.classList.add('hidden');

  details_section.classList.remove('hidden');
  main_banner.classList.add('hidden');
  main_categories.classList.add('hidden');
  main_sections.classList.add('hidden');

  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);
};

const searchPage = () => {
  window.scrollTo(0, 0);
  titulo_pagina.classList.replace('hidden', 'flex');

  nav_home_lg.classList.replace('lg:flex', 'lg:hidden');
  nav_home_sm.classList.replace('lg:hidden', 'lg:flex')

  details_section.classList.add('hidden');

  movies_section.classList.remove('hidden');
  main_banner.classList.add('hidden');
  main_categories.classList.add('hidden');
  main_sections.classList.add('hidden');

  formMovies.classList.replace('hidden', 'flex');

  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);
};

const listPage = () => {
  window.scrollTo(0, 0);
  titulo_pagina.classList.replace('hidden', 'flex');

  nav_home_lg.classList.replace('lg:flex', 'lg:hidden');
  nav_home_sm.classList.replace('lg:hidden', 'lg:flex')

  details_section.classList.add('hidden');

  movies_section.classList.remove('hidden');
  main_banner.classList.add('hidden');
  main_categories.classList.add('hidden');
  main_sections.classList.add('hidden');

  formMovies.classList.replace('flex', 'hidden');

  if(location.hash == '#list=trending'){
    getTrendingMoviesAll();
  } else if (location.hash == '#list=nowPlaying') {
    getNowPlayingMoviesAll();
  } else if (location.hash == '#list=popular') {
    getPopularMoviesAll();
  } else if (location.hash == '#list=toprated') {
    getTopratedMoviesAll();
  } else if (location.hash == '#list=upcoming') {
    getUpcomingMoviesAll();
  }
};

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

seeMoreBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    scrollUp();
    location.hash = `#list=${btn.value}`;
    loadMoreBtn.value = '1';
  });
});

arrowBtn.addEventListener('click', () => {
  location.hash = window.history.back();
  inputFormSearch.value = '';
  inputSectionSearch.value = '';
  loadMoreBtn.value = '1';
});

btnSearch.addEventListener('click', (e) => {
  if(inputFormSearch.value == '') {
    alert('Please, type the name of the film');
    return;
  } else {
    location.hash = `#search=${inputFormSearch.value.trim()}`;
    e.preventDefault();
  }
});

btnSectionSearch.addEventListener('click', (e) => {
  if(inputSectionSearch.value == '') {
    alert('Please, type the name of the film');
    return;
  } else {
    location.hash = `#search=${inputSectionSearch.value.trim()}`;
    e.preventDefault();
  }
});

loadMoreBtn.addEventListener('click', () => {
  const url = location.hash;
  const indexEqual = url.indexOf("=");
  const indexDash = url.indexOf("-", indexEqual);
  const numero = url.substring(indexEqual + 1, indexDash);
  const palabra = url.substring(indexDash + 1);

  const [_, query] = location.hash.split('=');

  loadMoreBtn.value = parseInt(loadMoreBtn.value) + 1;
  if(location.hash == '#list=trending'){
    getTrendingMoviesAll(loadMoreBtn.value, false);
  } else if (location.hash == '#list=nowPlaying') {
    getNowPlayingMoviesAll(loadMoreBtn.value, false);
  } else if (location.hash == '#list=popular') {
    getPopularMoviesAll(loadMoreBtn.value, false);
  } else if (location.hash == '#list=toprated') {
    getTopratedMoviesAll(loadMoreBtn.value, false);
  } else if (location.hash == '#list=upcoming') {
    getUpcomingMoviesAll(loadMoreBtn.value, false);
  } else if (location.hash == `#category=${numero}-${palabra}`) {
    getMoviesByCategory(numero, palabra, loadMoreBtn.value, false);
  } else if (location.hash == `#search=${query}`) {
    getMoviesBySearch(query, loadMoreBtn.value, false);
  }
});

function scrollUp() {
  window.scrollTo(0, 0);
}
