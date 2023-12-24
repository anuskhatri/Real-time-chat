import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import { AuthContextProvider, AuthContext } from './context/AuthContext'
import { useContext } from 'react'
import { ChatContextProvider } from './context/ChatContext'

const App = () => {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <ChatContextProvider user={user}>
        <NavBar />
        <Container>
          <Routes>
            <Route path='/' element={user ? <Chat /> : <Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={user ? <Navigate to="/" /> : <Login />} />
          </Routes>
        </Container>
      </ChatContextProvider>
    </Router>
  )
}

export default App
