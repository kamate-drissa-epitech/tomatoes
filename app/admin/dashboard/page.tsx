"use client";

import { useState, useEffect } from 'react';

import axios from 'axios';

import React from 'react';
import '../../globals.css';
import Link from 'next/link';

interface Movie {
  _id: string;
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  genre: string;
  publisher: string;
  image: string;
  notes: number;
}
export default function Dashboard() {
  const [data, setData] = useState<{ movieCount: number; topMovies: Movie[] }>({
    movieCount: 0,
    topMovies: [],
  });
  const [newMovie, setNewMovie] = useState<Movie>({
    _id: '',
    id: '',
    title: '',
    description: '',
    duration: '',
    date: '',
    genre: '',
    publisher: '',
    image: '',
    notes: 0,
  });
  useEffect(() => {
    fetchDashboardData();
  }, []);
  const fetchDashboardData = async () => {
    const response = await axios.get('/api/dashboard');
    setData(response.data);
  };
  const handleDelete = async (id: string) => {
    await axios.delete(`/api/movies/${id}`);
    fetchDashboardData();
  };
  const handleEdit = async (id: string, newTitle: string) => {

    await axios.put(`/api/movies/${id}`, { title: newTitle });

    fetchDashboardData();
  };
  const handleAdd = async () => {
    await axios.post('/api/fetch-movie', newMovie);
    setNewMovie({
      _id: '',
      id: '',
      title: '',
      description: '',
      duration: '',
      date: '',
      genre: '',
      publisher: '',
      image: '',
      notes: 0,
    });
    fetchDashboardData();
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Tableau de Bord des Films</h1>
      <div className="dashboard-stats">
        <div className="dashboard-stat">Mes Films: {data.movieCount}</div>
        {/* <div className="dashboard-stat">Utilisateurs: {userCount}</div> */}
      </div>
      <h2>Top 5 des Films les Mieux Notés</h2>
      <ul className="dashboard-list">
        {data.topMovies.map((movie) => (
          <li key={movie._id} className="dashboard-list-item">
            <h3>{movie.title} ({movie.notes}/10)</h3>
            <p>{movie.description}</p>
            <img src={movie.image} alt={movie.title} width="150" />
            <p><strong>Durée :</strong> {movie.duration}</p>
            <p><strong>Date de sortie :</strong> {movie.date}</p>
            <p><strong>Genre :</strong> {movie.genre}</p>
            <p><strong>Réalisateur :</strong> {movie.publisher}</p>
            <button className="dashboard-button1" onClick={() => handleDelete(movie._id)}>Supprimer</button>
            <button className="dashboard-button" onClick={() => handleEdit(movie._id, prompt('Nouveau titre', movie.title) || movie.title)}>Éditer le titre</button>
          </li>
        ))}
      </ul>

      <h2>Ajouter un Nouveau Film</h2>


      <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
        <input
          type="text"
          placeholder="ID"
          value={newMovie.id}
          onChange={(e) => setNewMovie({ ...newMovie, id: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Titre"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newMovie.description}
          onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Durée"
          value={newMovie.duration}
          onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Date de sortie"
          value={newMovie.date}
          onChange={(e) => setNewMovie({ ...newMovie, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Réalisateur"
          value={newMovie.publisher}
          onChange={(e) => setNewMovie({ ...newMovie, publisher: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Chemin de l'affiche"
          value={newMovie.image}
          onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Notes"
          value={newMovie.notes}
          onChange={(e) => setNewMovie({ ...newMovie, notes: parseFloat(e.target.value) })}
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* <Link href="/search">
        <button>Voir tous les films</button>
      </Link> */}
    </div>
  )
}
