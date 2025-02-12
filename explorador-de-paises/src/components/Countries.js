// Lista de países (depois do Login)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormularioInsercao from './FormularioInsercao';
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";

const Countries = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');

  const [mostrarFormulario, setMostrarFormulario] = useState(false); //

  const logoff = () => {
    localStorage.removeItem("token");
    window.location.href = '/Login';
  }

  useEffect(() => {
    const token = localStorage.getItem('token'); // Pegue o token do localStorage
    axios
      .get('http://localhost:5000/api/countries', {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      })
      .then((response) => {
        setAllCountries(response.data);
        // setFilteredCountries(response.data); // Mostra todos os países inicialmente
      })
      .catch((error) => {
        console.error('Erro ao buscar países', error);
      });
  }, []);

  useEffect(() => {
    if (search) {
      const countries = allCountries.filter(country => country.name.includes(search));
      setFilteredCountries(countries);
    } else {
      setFilteredCountries([]);
    }
  }, [search])

  return (
    <Box 
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "70vh",
      backgroundColor: "#05220a",
      color: "white",
      padding: 3,
    }}
  >
    <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
      Lista de Países
    </Typography>

    {!mostrarFormulario && (
    <TextField
    label="Nome do País"
    variant="outlined"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    sx={{ width: "100%", maxWidth: 400, marginBottom: 3, backgroundColor: "white", borderRadius: 1 }}
    />
    )}

    <Card sx={{ width: "100%", maxWidth: 500, backgroundColor: "#1E1E1E", color: "white", borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <Typography key={country._id} variant="h6" sx={{ padding: "8px 0", borderBottom: "1px solid gray" }}>
              {country.name}
            </Typography>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", padding: "10px 0" }}>
            Nenhum país encontrado
          </Typography>
        )}
      </CardContent>
    </Card>

    <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
      <Button 
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": { backgroundColor: "red" },
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={logoff}
      >
        Sair
      </Button>

      <Button 
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": { backgroundColor: "red" },
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => setMostrarFormulario(true)}
      >
        Inserir País
      </Button>
    </Box>

    {mostrarFormulario && <FormularioInsercao onClose={() => setMostrarFormulario(false)} />}
  </Box>
  );
};

export default Countries;
