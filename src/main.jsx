import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import { Home, Categories, Login } from './pages'
import { Header } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from './contexts/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/login" element={<Login />} />
      </Routes>
</UserContextProvider>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>,
)
