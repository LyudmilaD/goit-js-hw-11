const API_KEY = "7652668-fcb425495cfb1d754d33171ff"


export default class NewsApiService {
    constructor() {
        this.key = API_KEY;
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
        
    }

    async fetchPictures() {
        console.log("before", this);
        return await fetch(`https://pixabay.com/api/?key=${this.key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&per_page=${this.per_page}&page=${this.page}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            this.incrementPage();
            console.log("after", this);
            console.log(`Hooray! We found ${data.totalHits} images.`);
            console.log(data.hits.length);
            return data.hits;
            
        })
    }
    incrementPage() {
        this.per_page += 40;
        this.page += 1;
    }

    resetPage() {
        
        this.per_page = 40;
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    
};