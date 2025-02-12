import React, { useState } from 'react';
import axios from 'axios';

const Insert = () => {
  const [country, setCountry] = useState({ name: '', region: '', languages: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCountry({ ...country, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/countries', country, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('País inserido com sucesso!');
    } catch (error) {
      console.error('Erro ao inserir país', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={country.name}
        onChange={handleChange}
        placeholder="Nome do País"
      />
      <input
        type="text"
        name="region"
        value={country.region}
        onChange={handleChange}
        placeholder="Região"
      />
      <input
        type="text"
        name="languages"
        value={country.languages}
        onChange={handleChange}
        placeholder="Línguas"
      />
      <button type="submit">Inserir</button>
    </form>
  );
};

export default Insert;
