import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Router from './routes'
import ThemeProvider from './theme'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ThemeProvider>
                    <Router />
                </ThemeProvider>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App