/* DOM elements */
const poster1 = document.querySelector('#poster1')
const rating1 = document.querySelector('#rating1')
const title1 = document.querySelector('#title1')
const overview1 = document.querySelector('#overview1')
const provider1 = document.querySelector('#provider1')
/* movie1title.style.color = "yellow"
movie1title.textContent = ""
movie1rating.textContent = "uu" */

/* Get Provider Function */
 /* Function to get provider of specific movie by id. In this Example: Wakanda Forever id=505642 */
 const getProvider = async (movieId) => {
    try {
        let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=91240b71863b5bfeb50df48a1fc46e53`)
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

const discoverMovie = async () => {
   let discoverEndpoint = "/discover/movie";
   let language = "&language=en-US"
   let sortParam = "&sort_by=popularity.desc" 
   /* vote_average.asc, popularity.asc, popularity.desc, release_date, vote_count */
   let requestParams = `&vote_count.gte=200&vote_average.gte=5.9&page=1&with_watch_providers=337%7C119%7C384%7C467%7C300&watch_region=CL`;
   let urlToFetch = `${baseUrl}${discoverEndpoint}${apiKey}${language}${sortParam}${requestParams}`;

   try {
    let response = await fetch(urlToFetch);
    if(response.ok){
        let jsonResponse = await response.json();
        let movies = jsonResponse.results;
        console.log(movies);

        let poster1path = `https://image.tmdb.org/t/p/original${movies[0].poster_path}`;
        console.log(poster1path);
        let id1 = movies[0].id;
        

        poster1.src = poster1path;
        rating1.textContent = movies[0].vote_average;
        title1.textContent = movies[0].original_title;
        overview1.textContent = movies[0].overview;
        provider1.textContent = await getProvider(id1);
    }
    
   } catch (error) {
    console.log(error)
   }


};

discoverMovie()

let testProvider = getProvider(744276);
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

 /* 
 337: Disney(1)
 119: Amazon Prime(2)
 384: HBO Max(7)
 467: DirectvGO(15)
 300: PlutoTV(27)
 1,2,7,15,27
 337|119|384|467|300
  */





