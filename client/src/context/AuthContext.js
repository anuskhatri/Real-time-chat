import { createContext, useCallback, useEffect, useState } from 'react'
import { baseUrl, getReq, postReq } from '../utils/services'

export const AuthContext = createContext()

// AuthContextProvider
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [registerError, setRegisterError] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const response = await postReq(`${baseUrl}/api/user/user_data`, { token })
      if (!response.error) {
        setUser(response.data)
      } 
      else {
        console.error('Error fetching user info:', response.error)
      }
    } 
    else {
      setUser(null)
      console.log('Token not found in localStorage')
    }
  }


  const registerUser = useCallback(async (e) => {
    e.preventDefault()

    setRegisterError(null)
    setRegisterLoading(true)

    const response = await postReq(`${baseUrl}/api/user/register`, registerInfo)

    if (response.error) {
      return setRegisterError(response.data)
    }
    setUser(response.data.user)
    localStorage.setItem('token', response.data.token)
    setRegisterLoading(false)
  })

  const updateRegisterInfo = (info) => {
    setRegisterInfo(info)
  }

  const loginUser = useCallback(async (e) => {
    e.preventDefault()
    setLoginError(null)
    setLoginLoading(true)

    const response = await postReq(`${baseUrl}/api/user/login`, loginInfo)
    if (response.error) {
      return setLoginError(response.data)
    }
    localStorage.setItem('token', response.data.token)
    setUser(response.data.user)
    setLoginLoading(false)
  })

  const updateLoginInfo = (info) => {
    setLoginInfo(info)
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    setUser(null)

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        registerError,
        registerLoading,
        registerUser,
        updateRegisterInfo,
        loginInfo,
        loginError,
        loginLoading,
        loginUser,
        updateLoginInfo,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
