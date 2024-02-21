import { Box } from "@mui/material"

import { useState } from "react"

import HomePage from "./pages/HomePage"
import SecondaryPage from "./pages/SecondaryPage"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  const [tabValue, setTabValue] = useState(0)
  return (
    <AuthProvider>
      <Box>
        <Navbar tabValue={tabValue} setTabValue={setTabValue} />
        {tabValue === 0 && <HomePage />}
        {tabValue === 1 && <SecondaryPage />}
      </Box>
    </AuthProvider>
  )
}

export default App
