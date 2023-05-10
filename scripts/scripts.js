/* DOM elements */
const tvOrSeries = document.querySelectorAll('input[name="movie-or-series"]')
const subscribedProviders = document.querySelectorAll('#subscribed-provider div div input')
const sortBys = document.querySelectorAll('input[name="sort-by"]')
const minimumRatings = document.querySelectorAll('input[name="minimum-rating"]')

const settings = document.querySelector('#settings')
const settingsButton = document.querySelector('#settings-button')
const findButton = document.querySelector('#find')
const cards = document.querySelectorAll('.card')

const poster1 = document.querySelector('#poster1')
const rating1 = document.querySelector('#rating1')
const title1 = document.querySelector('#title1')
const overview1 = document.querySelector('#overview1')
const provider1 = document.querySelector('#provider1')

const poster2 = document.querySelector('#poster2')
const rating2 = document.querySelector('#rating2')
const title2 = document.querySelector('#title2')
const overview2 = document.querySelector('#overview2')
const provider2 = document.querySelector('#provider2')

const poster3 = document.querySelector('#poster3')
const rating3 = document.querySelector('#rating3')
const title3 = document.querySelector('#title3')
const overview3 = document.querySelector('#overview3')
const provider3 = document.querySelector('#provider3')

const poster4 = document.querySelector('#poster4')
const rating4 = document.querySelector('#rating4')
const title4 = document.querySelector('#title4')
const overview4 = document.querySelector('#overview4')
const provider4 = document.querySelector('#provider4')

const nextButton = document.querySelector('#next-button')

/* movie1title.style.color = "yellow"
movie1title.textContent = ""
movie1rating.textContent = "uu" */

/* Get Provider Function */
 /* Function to get provider of specific movie by id. In this Example: Wakanda Forever id=505642 */

 const getProvider = async (type, id) => {
    try {
        let response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=91240b71863b5bfeb50df48a1fc46e53`)
    if(response.ok){
        let jsonResponse = await response.json();
        let provider = jsonResponse.results.CL.flatrate[0].provider_name;
        return provider;
    }
    } catch (error) {
        console.log(error)
    }

 }; 

/* Movie discovery Function*/
const apiKey = '?api_key=91240b71863b5bfeb50df48a1fc46e53';
const baseUrl = 'https://api.themoviedb.org/3';

let movieIndex1 = 0;
let movieIndex2 = 1;
let movieIndex3 = 2;
let movieIndex4 = 3;
let pageIndex = 1;
let showType = "";
let endpointProviders = "";
let sortParam = "";
let endpointMinimumRating = "";





const discoverMovie = async () => {
   let language = "&language=en-US"
   /* vote_average.asc, popularity.asc, popularity.desc, release_date, vote_count */
   let requestParams = `&vote_count.gte=200${endpointMinimumRating}&primary_release_date.gte=2000-01-01&page=${pageIndex}&with_watch_providers=${endpointProviders}&watch_region=CL`;
   let urlToFetch = `${baseUrl}/discover/${showType}${apiKey}${language}${sortParam}${requestParams}`;
   console.log(urlToFetch);

   
/*    showType = 'tv';
   let testUrl = `https://api.themoviedb.org/3/discover/${showType}?api_key=91240b71863b5bfeb50df48a1fc46e53&language=en-US&sort_by=popularity.desc&vote_count.gte=200&vote_average.gte=6&primary_release_date.gte=2000-01-01&page=1&with_watch_providers=%7C8%7C119%7C337%7C384%7C467%7C300&watch_region=CL`;
 */
   try {
    let response = await fetch(urlToFetch);
    if(response.ok){
        let jsonResponse = await response.json();
        let movies = jsonResponse.results;
        console.log(movies);

        /* Set 1st Card */
        let poster1path = `https://image.tmdb.org/t/p/original${movies[movieIndex1].poster_path}`;
        let id1 = movies[movieIndex1].id;
        
        poster1.src = poster1path;
        rating1.textContent = movies[movieIndex1].vote_average;
        if (showType === 'movie') {
            title1.textContent = movies[movieIndex1].original_title;
        } else {
            title1.textContent = movies[movieIndex1].name;
        }
        overview1.textContent = movies[movieIndex1].overview;
        provider1.textContent = await getProvider(`${showType}`,id1);

        /* Set 2nd Card */
        let poster2path = `https://image.tmdb.org/t/p/original${movies[movieIndex2].poster_path}`;
        let id2 = movies[movieIndex2].id;
        
        poster2.src = poster2path;
        rating2.textContent = movies[movieIndex2].vote_average;
        if (showType === 'movie') {
            title2.textContent = movies[movieIndex2].original_title;
        } else {
            title2.textContent = movies[movieIndex2].name;
        }
        overview2.textContent = movies[movieIndex2].overview;
        provider2.textContent = await getProvider(`${showType}`,id2);

        /* Set 3rd Card */
        let poster3path = `https://image.tmdb.org/t/p/original${movies[movieIndex3].poster_path}`;
        let id3 = movies[movieIndex3].id;
        
        poster3.src = poster3path;
        rating3.textContent = movies[movieIndex3].vote_average;
        if (showType === 'movie') {
            title3.textContent = movies[movieIndex3].original_title;
        } else {
            title3.textContent = movies[movieIndex3].name;
        }
        overview3.textContent = movies[movieIndex3].overview;
        provider3.textContent = await getProvider(`${showType}`,id3);

        /* Set 4th Card */
        let poster4path = `https://image.tmdb.org/t/p/original${movies[movieIndex4].poster_path}`;
        let id4 = movies[movieIndex4].id;
        
        poster4.src = poster4path;
        rating4.textContent = movies[movieIndex4].vote_average;
        if (showType === 'movie') {
            title4.textContent = movies[movieIndex4].original_title;
        } else {
            title4.textContent = movies[movieIndex4].name;
        }
        overview4.textContent = movies[movieIndex4].overview;
        provider4.textContent = await getProvider(`${showType}`, id4);


    }
    
   } catch (error) {
    console.log(error)
   }


};

/* discoverMovie(); */


let testProvider = getProvider('tv', 100088);
testProvider.then(data => console.log(data))



const getProviders = async () => {
    let discoverEndpoint = "/discover/movie";
    let sortParam = "vote_average.desc" 
    /* vote_average.asc, popularity.asc, popularity.desc, release_date, vote_count */
    let requestParams = `?api_key=${apiKey}&language=en-US&vote_count.gte=1000&sort_by=${sortParam}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
    let urlToFetch = `https://api.themoviedb.org/3/watch/providers/movie?api_key=91240b71863b5bfeb50df48a1fc46e53&language=en-US&watch_region=CL`;
 
    try {
     let response = await fetch(urlToFetch);
     if(response.ok){
         let jsonResponse = await response.json();
         console.log(jsonResponse);
     }
     
    } catch (error) {
     console.log(error)
    }
 };

 /* Next button function */

 const showNext = () => {
    if (movieIndex4%19==0) {
        pageIndex += 1;
        movieIndex1 = 0;
        movieIndex2 = 1;
        movieIndex3 = 2;
        movieIndex4 = 3;
    } else {
        movieIndex1 += 4;
        movieIndex2 += 4;
        movieIndex3 += 4;
        movieIndex4 += 4;
    }
    
    console.log(pageIndex, movieIndex4)
    discoverMovie()
 }

/*  getProviders() */
console.log(showType);

findButton.addEventListener('click', () => {

    for (let type of tvOrSeries){
        if(type.checked){
            showType = type.value;
        }
    }
    
    /* Set providers parameters */
    endpointProviders = "";
    for (let provider of subscribedProviders){
        if(provider.checked)
        endpointProviders += provider.value;
    }

   for (let sorting of sortBys){
    if(sorting.checked){
        sortParam = sorting.value;
    }
   }

   for (let rating of minimumRatings){
    if(rating.checked){
        endpointMinimumRating = rating.value;
    }
   }
    

    for (const card of cards) {
        card.style.display = 'flex'
    }
    discoverMovie()
    nextButton.style.display = 'block';
    settingsButton.style.display = 'block';
    settings.style.display = 'none';
})

nextButton.addEventListener('click', showNext);
settingsButton.addEventListener('click', () => {

    for (const card of cards) {
        card.style.display = 'none'
    }
    nextButton.style.display = 'none';
    settingsButton.style.display = 'none';
    settings.style.display = 'block';

})
 /* 
 8: Netflix
 337: Disney(1)
 119: Amazon Prime(2)
 384: HBO Max(7)
 467: DirectvGO(15)
 300: PlutoTV(27)
 1,2,7,15,27
 337|119|384|467|300
  */





