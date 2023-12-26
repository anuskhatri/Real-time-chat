import { useContext } from 'react'
import { Navbar, Nav, Container, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import Notification from './chats/Notification'
const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext)
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ChatApp</Navbar.Brand>
          <Nav className="me-auto">
            {
              user ?
                <>
                  <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
                  <Stack gap={3}>
                    <Nav.Link href="#">Hi {user ? user.name : ''}</Nav.Link>
                  </Stack>
                  <Stack gap={10}>
                    <Notification />
                  </Stack>
                </>
                :
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
            }
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar