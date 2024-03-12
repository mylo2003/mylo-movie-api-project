import { getBannerMain, getCategoriesPreview, getTrendingMoviesPreview  } from "/public/js/main.js";

/* Navegacion */

const menu = document.querySelector('#menu-icon');
const i = document.querySelector('#icon');
const navList = document.querySelector('.nav-list');
const etiquetas = document.querySelectorAll('.e');

function abrirCerrar () {
  i.classList.toggle('bx-x');

  if(navList.classList.contains('-top-full')){
    navList.classList.replace('-top-full', 'top-12');
    navList.classList.replace('hidden', 'flex');
  } else {
    navList.classList.replace('top-12', '-top-full');
    navList.classList.replace('flex', 'hidden');
  }
}

menu.addEventListener('click', abrirCerrar);

etiquetas.forEach(element => {
  element.addEventListener('click', abrirCerrar);
});

window.addEventListener('DOMContentLoaded', navigator);
window.addEventListener('hashchange', navigator);

function navigator () {
  console.log({ location });
  if(location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage ();
  }
}


function homePage () {
  console.log('Home!!!');
  getBannerMain();
  getCategoriesPreview();
  getTrendingMoviesPreview();
}

function categoriesPage () {
  console.log('Category!!!');
}

function movieDetailsPage () {
  console.log('Movie!!!');
}

function searchPage () {
  console.log('Search!!!');
}

function trendsPage () {
  console.log('Trends!!!');
}

