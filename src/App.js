"use client"

import { useState, useEffect } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import theme from "src/theme/theme"

// Layouts
import AdminLayout from "src/layouts/admin"
import AuthLayout from "src/layouts/auth"

// Components
import AIOnboardingFlow from "src/components/onboarding/AIOnboardingFlow"

const App = () => {
  const [isFirstLogin, setIsFirstLogin] = useState(false) // Changed to false initially to avoid issues

  useEffect(() => {
    // Check if this is the user's first login
    const hasLoggedInBefore = localStorage.getItem("hasLoggedInBefore")
    if (hasLoggedInBefore) {
      setIsFirstLogin(false)
    } else {
      // Set flag for future visits
      localStorage.setItem("hasLoggedInBefore", "true")
      setIsFirstLogin(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    setIsFirstLogin(false)
  }

  return (
    <ChakraProvider theme={theme}>
      <Router>
        {isFirstLogin && <AIOnboardingFlow isFirstLogin={isFirstLogin} onComplete={handleOnboardingComplete} />}
        <Switch>
          <Route path="/auth" component={AuthLayout} />
          <Route path="/admin" component={AdminLayout} />
          <Redirect from="/" to="/admin/innovation" />
        </Switch>
      </Router>
    </ChakraProvider>
  )
}

export default App
