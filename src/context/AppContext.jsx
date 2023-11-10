import React from 'react'
import { createContext } from 'react'

const AppContext = createContext()

const AppProvider = ({ children }) => {

   const values = {
   } 

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }