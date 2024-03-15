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
  window.scrollTo(0, 0);
  location.hash = '#home';

  titulo_pagina.classList.replace('flex', 'hidden');
  details_section.classList.add('hidden');
  movies_section.classList.add('hidden');

  nav_home_lg.classList.replace('lg:hidden', 'lg:flex');
  nav_home_sm.classList.replace('lg:flex', 'lg:hidden');
  
  main_banner.classList.remove('hidden');
  main_categories.classList.remove('hidden');
  main_sections.classList.remove('hidden');

  inputFormSearch.value = '';
  
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
    location.hash = `#list=${btn.value}`
  });
});

arrowBtn.addEventListener('click', () => {
  location.hash = window.history.back();
  inputFormSearch.value = '';
  inputSectionSearch.value = '';
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