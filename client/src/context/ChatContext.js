import { createContext, useCallback, useEffect, useState } from 'react'
import { baseUrl, getReq, postReq } from '../utils/services'
import { Socket, io } from "socket.io-client"
export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
  // Chat
  const [userChat, setUserChat] = useState()
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
  const [userChatError, setUserChatError] = useState(null)
  const [potentialChat, setPotentialChat] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [allUser, setAllUser] = useState(null)

  // Get mesage
  const [userMessage, setUserMessage] = useState([])
  const [isUserMessagesLoading, setIsUserMessagesLoading] = useState(false)
  const [userMessageError, setUserMessageError] = useState(null)

  // Send Message
  const [newMessage, setNewMessage] = useState(null)
  const [isSendMessagesLoading, setIsSendMessagesLoading] = useState(false)
  const [sendMessageError, setSendMessageError] = useState(null)

  // Socket
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [notification, setNotification] = useState([])

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postReq(`${baseUrl}/api/chat`, { firstId, secondId })
    setUserChat((prev) => [...prev, response.data[0]])
  })

  const updateCurrentChat = useCallback(async (chat) => {
    setCurrentChat(chat)
  }, [])

  // Socket 
  useEffect(() => {
    const newSocket = io("http://localhost:5000")
    setSocket(newSocket)
    // Cleanup function
    return () => {
      newSocket.disconnect()
    }
  }, [])

  // Socket Add new users
  useEffect(() => {
    const addNewUser = () => {
      if (!socket && !user) {
        return
      }
      socket.emit("addNewUser", user?.id)
    }
    addNewUser()
  }, [socket, user])

  // Socket get onlineUsers
  useEffect(() => {
    if (!socket) return
    socket.on("onlineUsers", (res) => {
      setOnlineUsers(res)
    })
    return () => {
      socket.off("onlineUsers")
    }
  }, [socket])

  // // Socket send messsage
  useEffect(() => {
    if (!socket) return
    const recipientId = currentChat?.members?.find((id) => Number(id) !== user?.id)
    const message = { ...newMessage, recipientId }
    socket.emit("sendMessage", message)
  }, [newMessage])

  useEffect(() => {
    if (!socket) return
    socket.on("getMessage", (message) => {
      setUserMessage((prev) => [...prev, message])
    })

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some((id) => id === res.senderId)
      if (isChatOpen) {
        setNotification(prev => [
          { ...res, isRead: true },
          ...prev
        ]);
      } else {
        setNotification(prev => [{ ...res }, ...prev]);
      }
    })
    return () => {
      socket.off("getMessage")
      socket.off("getNotification")
    }
  }, [socket, currentChat])

  // Send Message
  const sendMessage = useCallback(async (senderId, message, chatId,) => {
    setIsSendMessagesLoading(true)
    setSendMessageError(null)
    if (!message) return { message: "you must type something" }
    const response = await postReq(`${baseUrl}/api/message`, { senderId, message, chatId })
    setIsSendMessagesLoading(false)
    if (response.error) return setSendMessageError(response.error)
    setNewMessage(response.data)
    setUserMessage((prev) => [...prev, response.data])
  })

  // get User
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getReq(`${baseUrl}/api/user`)
        console.log(response);
        setAllUser(response)
        const pchats = response.filter((u) => {
          // To get the user with whom we don't have a created chat
          let isChatCreated = false

          if (Number(user.id) === Number(u.id)) {
            return false
          } // Remove our user_id

          if (userChat) {
            isChatCreated = userChat?.some((chat) => {
              return Number(chat.members[0]) === Number(u.id) || Number(chat.members[1]) === Number(u.id)
            })
          }
          return !isChatCreated
        })

        setPotentialChat(pchats)
      } catch (error) {
        console.error("Error fetching potential chat users:", error)
      }
    }
    getUser()
  }, [userChat])

  // Get Message
  useEffect(() => {
    const getUserMessage = async () => {
      setUserMessageError(null)
      setIsUserMessagesLoading(true)
      if (currentChat) {
        const response = await getReq(`${baseUrl}/api/message/${currentChat?.chat_id}`)
        if (response.error) {
          setIsUserMessagesLoading(false)
          return setUserMessageError(response.error)
        }
        setUserMessage(response)
      }
      setIsUserMessagesLoading(false)
    }
    getUserMessage()
  }, [currentChat])

  // Get userChat
  useEffect(() => {
    const getUserChat = async () => {
      setUserChatError(null)
      setIsUserChatsLoading(true)
      if (user?.id) {
        const response = await getReq(`${baseUrl}/api/chat/${user?.id}`)
        if (response.error) {
          setIsUserChatsLoading(false)
          return setUserChatError(response.error)
        }
        setUserChat(response)
      }
      setIsUserChatsLoading(false)
    }
    getUserChat()
  }, [user,notification])

  const markAllNotificationRead = useCallback((notification) => {
    const mNotification = notification.map((n) => {
      return { ...n, isRead: true }
    })
    setNotification(mNotification)

  }, [])

  const markNotificationRead = useCallback((n, userChat, user, notifications) => {
    // find chat to open
    const desiredChat = userChat.find(chat => {
      const chatMembers = [Number(user.id), Number(n.senderId)]
      const isDesireChat = chat?.members.every((member) => {
        return chatMembers.includes(Number(member))
      })
      return isDesireChat
    })
    // mark notification as read
    const mNotification = notifications.map((el) => {
      if (Number(n.senderId) === Number(el.senderId)) {
        return { ...n, isRead: true }
      }
      else {
        return el
      }
    })
    updateCurrentChat(desiredChat)
    setNotification(mNotification)
  }, [])

  const markThisNotificationRead = useCallback((thisUserNotification, notification) => {
    const mNotification = notification.map((el) => {
      let updatedNotification = el;

      thisUserNotification.forEach((n) => {
        console.log("this user notification", n.senderId);
        console.log("notification", el);
        if (n?.senderId === el?.senderId) {
          console.log("true");
          updatedNotification = { ...n, isRead: true };
        }
      });

      console.log(updatedNotification);
      return updatedNotification;
    });
    console.log(mNotification);
    setNotification(mNotification);
  });


  return (
    <ChatContext.Provider
      value={{
        userChat,
        isUserChatsLoading,
        userChatError,
        potentialChat,
        createChat,
        userMessage,
        userMessageError,
        currentChat,
        sendMessage,
        sendMessageError,
        isSendMessagesLoading,
        newMessage,
        onlineUsers,
        notification,
        allUser,
        markNotificationRead,
        markAllNotificationRead,
        updateCurrentChat,
        markThisNotificationRead
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
