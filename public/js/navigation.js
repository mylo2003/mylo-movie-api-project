import { getBannerMain, getCategoriesPreview, getTrendingMoviesPreview  } from "/public/js/main.js";

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
  console.log({ location });

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
  location.hash = '#home';
  getBannerMain();
  getCategoriesPreview();
  getTrendingMoviesPreview();
}

const categoriesPage = () => {
  location.hash = '#category=';
};

const movieDetailsPage = () => {
  location.hash = '#movie=';
};

const searchPage = () => {
  location.hash = '#search=';
};

const trendsPage = () => {
  location.hash = '#trends';
};

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);