import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

const SearchForm = (setResult) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setError('O nome do país é obrigatório!');
            return;
        }
        setError('');
        setResult(name);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <TextField
                label="Nome do País"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!error}
                helperText={error}
            />

        </Box>
    );
};

export default SearchForm;
