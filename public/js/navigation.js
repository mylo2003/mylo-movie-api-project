import { getBannerMain, getCategoriesPreview, getTrendingMoviesPreview, getMoviesByCategory, getTrendingMoviesAll, getMoviesBySearch } from "/public/js/main.js";

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
    '#trends'    : () => trendsPage(),
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

const trendsPage = () => {
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

  getTrendingMoviesAll();
};

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

seeTrendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
  location.hash = window.history.back();
});

btnSearch.addEventListener('click', (e) => {
  location.hash = `#search=${inputFormSearch.value.trim()}`;
	e.preventDefault();
});