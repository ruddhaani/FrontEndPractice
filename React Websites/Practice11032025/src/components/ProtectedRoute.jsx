import React from 'react'
import { Navigate } from 'react-router'

const ProtectedRoute = ({isAllowed, children}) => {
  return isAllowed? children : <Navigate to="/" />
}

export default ProtectedRoute