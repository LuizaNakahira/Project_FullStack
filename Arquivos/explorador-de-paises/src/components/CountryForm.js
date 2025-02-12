import React, { useState } from 'react';
import axios from 'axios';

const CountryForm = () => {
  const [name, setName] = useState('');
  const [capital, setCapital] = useState('');
  const [region, setRegion] = useState('');
  const [population, setPopulation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/countries',
        { name, capital, region, population },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('País inserido com sucesso!');
      setName('');
      setCapital('');
      setRegion('');
      setPopulation('');
    } catch (error) {
      setMessage('Erro ao inserir país. Tente novamente.');
    }
  };

  return (
    <div>
      <h3>Adicionar Novo País</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Capital" value={capital} onChange={(e) => setCapital(e.target.value)} required />
        <input type="text" placeholder="Região" value={region} onChange={(e) => setRegion(e.target.value)} required />
        <input type="number" placeholder="População" value={population} onChange={(e) => setPopulation(e.target.value)} required />
        <button type="submit">Adicionar País</button>
      </form>
    </div>
  );
};

export default CountryForm;
