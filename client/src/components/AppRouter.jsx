import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { Context } from '..'

export const AppRouter = () => {
  const {user} = useContext(Context)
  
  return (
    <Routes>
      {user.isAuth && authRoutes.map(({ path, Component }) => 
        <Route key={path} path={path} element={Component}/>
      )}
      
      {publicRoutes.map(({ path, Component }) => 
        <Route key={path} path={path} element={Component} />
      )}
      <Route path='*' element={<Navigate to={'/'}/>} />
    </Routes>
  )
}
