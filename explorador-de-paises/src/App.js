import React, { useState, lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Box, Typography } from "@mui/material";
import Login from "./components/Login"; // Importe o componente Login

const CountriesPage = lazy(() => import("./components/Countries"));

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true); // Verifica se o token está presente no localStorage
        }
    }, []); // Roda uma vez ao carregar o componente



    return (
        <div className="app-background">
            <Box
                sx={{
                    textAlign: "center",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h2" gutterBottom className="MuiTypography-root title">
                    Countries Explorer
                </Typography>

                {isAuthenticated ? (
                        <Suspense fallback={<div>Carregando...</div>}>
                            <CountriesPage />
                        </Suspense>
                ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                )}
            </Box>
        </div>
    );

}
export default App;
