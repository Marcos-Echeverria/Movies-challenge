import withoutResults from '../mocks/no-results.json'
import {useState} from 'react'

export function useMovies({ search }) {
    const [responseMovies, setResponseMovies] = useState([])
    
    const movies = responseMovies.Search
    
    const mappedMovies = movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
    }))

    const getMovies = () => {
        if(search){
            fetch(  `https://www.omdbapi.com/?i=tt3896198&apikey=8a512644&s=${search}`)
            .then(res => res.json())
            .then(json => {
                setResponseMovies(json)
            })
        } else {
            setResponseMovies(withoutResults)
        }
    }

    return { movies: mappedMovies, getMovies }
}   