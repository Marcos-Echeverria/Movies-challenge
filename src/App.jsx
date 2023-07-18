import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies';
import { useEffect, useState, useRef } from 'react';
import Footer from './components/Footer';

function useSearch(){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const firsInput = useRef(true)

  useEffect(() =>{
    if (firsInput.current){
      firsInput.current = search === ''
      return
    }

    if (search === ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
  
    if (search.match(/^\d+$/)){
      setError('No se puede buscar una pelicula con un numero')
      return
    }
  
    if (search.length < 3 ){
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }
  
    setError(null)
  },[search])
  return {search, updateSearch, error}
} //Black box

function App() {
  const {search, updateSearch, error} = useSearch()
  const { movies, getMovies } = useMovies({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }


  return (
    <>
  <div className='page'>
    <header>
      <h1>Buscador de peliculas</h1>
      <form className='from' onSubmit={handleSubmit}>
        <input value={search} onChange={handleChange} name='query' placeholder='Star Wars, Forrest Gump'/>
        <button type='submit'>Buscar</button>
      </form>
        {error && <p style={{color:'red'}} >{error}</p>}
    </header>

    <main>
      <Movies movies={movies} />
    </main>
  </div>
  <Footer/>
  
  </>


  )
}

export default App
