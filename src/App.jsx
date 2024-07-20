import React, { useState, useEffect } from 'react';
import './App.css'
import { Card } from './components/Card/Card';
import lupa from '../src/assets/Images/lupa.png'

const API_KEY = "AIzaSyD2pKw8pFb6xvWx5AEfprwZe3owwSVkQ5g";
const TRENDING_ENDPOINT = `https://tenor.googleapis.com/v2/featured?key=${API_KEY}&client_key=my_test_app`;
const SEARCH_ENDPOINT = `https://tenor.googleapis.com/v2/search?key=${API_KEY}&client_key=my_test_app&limit=23`;

function App() {
  const [gifs, setGifs] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const fetchGifs = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const { results } = await response.json();
      setGifs(results?.map(gif => gif.media_formats.gif.url) || []);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setGifs([]);
    }
  };

  useEffect(() => {
    fetchGifs(TRENDING_ENDPOINT);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchGifs(`${SEARCH_ENDPOINT}&q=${(searchInput)}`);
    }
  };

  return (
    <div className='container'>
      <div className='div-header'>
        <br />
        <h1 className=''>Tenor GIF</h1>
        <br />
        <form onSubmit={handleSearch}>
          <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search GIFs" />
          <button className='btnSearch' type="submit"><img src={lupa} alt="" /></button>
        </form>
        <br />
        <br />
      </div>
        <br />
        <br />
      <div className="app">
        {gifs.map((e, index) => (
          <Card key={index} src={e} styleDiv='box-card' styleImg='character' />
        ))}
      </div>
    </div>
  );
}

export default App;
