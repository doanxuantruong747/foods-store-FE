import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Router from './routes'
import ThemeProvider from './theme'

const PRIMARY = {
    lighter: "#a5d6a7",
    light: "#43a047",
    main: "#388e3c",
    dark: "#2e7d32",
    darker: "#1b5e20",
    contrastText: "#FFF",
};


function App() {
    const [themes, setThemes] = useState(PRIMARY)

    return (
        <AuthProvider>
            <BrowserRouter>
                <ThemeProvider themes={themes} setThemes={setThemes}>
                    <Router setThemes={setThemes} />
                </ThemeProvider>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App