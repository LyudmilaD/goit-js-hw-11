
import './sass/main.scss';
import articlesTpl from './partials/articles.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './fetchPictures';

const newsApiService = new NewsApiService();

const searchFormRef = document.querySelector('#search-form');
const inputSearchFormRef = document.querySelector('.input-search-form');
const galleryRef = document.querySelector('.gallery');
const buttonBoxRef = document.querySelector('.button-box')
const loadMoreBtnRef = document.querySelector('.load-more');
buttonBoxRef.classList.add('visually-hidden');

const container = document.getElementById('container');




searchFormRef.addEventListener('submit', onSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);

function onLoadMore() {
    newsApiService.fetchPictures()
    .then(appendArticlesMarkup);       
}

function onSearch(event) {
    event.preventDefault();

    clearGallery()
    newsApiService.query = event.currentTarget.elements.searchQuery.value;
    
    
    if (newsApiService.query === '' || newsApiService.query === ' ' ) {
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again");
        
    }
    
    cleanInput();
    
    newsApiService.resetPage();
    newsApiService.fetchPictures().then(appendArticlesMarkup)
        
    
    buttonBoxRef.classList.remove('visually-hidden');
    
}

function appendArticlesMarkup(hits) {
    if (hits.length !== 0) {
        galleryRef.insertAdjacentHTML('beforeend', articlesTpl(hits));
        Notiflix.Notify.success(`Hooray! We found ${hits.length} images.`);
    
        if (hits.length < 39) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        buttonBoxRef.classList.add('visually-hidden');
        }
        const lightbox = new SimpleLightbox('.gallery a', { close: true });  
        }
    else {
        Notiflix.Notify.info(`Hooray! We found ${hits.length} images.`);
        buttonBoxRef.classList.add('visually-hidden');
    }
}

function clearGallery() {
    galleryRef.innerHTML = '';
}

function cleanInput() {
    inputSearchFormRef.value = '';
    inputSearchFormRef.innerHTML = '';
}

function scrolling() {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
    const a = clientHeight + scrollTop >= scrollHeight - 20;
	if(a) {
        console.log(a);
        onLoadMoreA();
	}
};

function onLoadMoreA() {
    newsApiService.fetchPictures()
    .then(appendArticlesMarkup);       
}

