import React, { ReactNode, createContext, useContext } from "react"

interface AuthContextInterface {
  step: number
}
const AuthContext = createContext({} as AuthContextInterface)
export default AuthContext

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider value={{ step: 0 }}>{children}</AuthContext.Provider>
  )
}

function useAuthContext() {
  const appContext = useContext(AuthContext)
  if (appContext === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return appContext
}

export { AuthProvider, useAuthContext }
