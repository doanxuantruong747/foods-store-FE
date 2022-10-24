import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Router from './routes'
import ThemeProvider from './theme'

const PRIMARY = {
    lighter: "#80deea",
    light: "#00acc1",
    main: "#0097a7",
    dark: "#00838f",
    darker: "#006064",
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