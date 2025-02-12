import React from "react";
import{Card, CardContent, CardMedia, Typography} from '@mui/material';

function CountryCard({ country }){
    return(
        <Card sx={{ maxWidth: 345, m: 2, backgroundColor: '#fffff' }}>
            <CardMedia 
                component='img'
                height='140'
                image={country.flags.svg}
                alt={`Bandeira do ${country.name.common}`}
            />
            <CardContent>

                <Typography gutterBottom variant="h5" component='div' color="rgb(5, 34, 10)">
                    {country.name.common}
                </Typography>
                <Typography  color="rgb(5, 34, 10)">
                    Region: {country.region}
                </Typography>
                <Typography color="rgb(5, 34, 10)">
                    Language: {country.languages
                        ? Object.values(country.languages).join(',')
                        : 'Information unavailable now'}
                </Typography>
                <Typography color="rgb(5, 34, 10)">
                        Capital: {country.capital || 'Information unavailable now'}
                </Typography>

            </CardContent>
        </Card>
    );
}

export default CountryCard;