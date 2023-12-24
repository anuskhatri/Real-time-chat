import { useContext } from "react"
import { Container, Stack } from "react-bootstrap"

import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import UserChat from "../components/chats/UserChat"
import PotentialChat from "../components/chats/PotentialChat"
import ChatBox from "../components/chats/ChatBox"

const Chat = () => {
  const { user } = useContext(AuthContext)
  const { userChat, isUserChatsLoading, userChatError,updateCurrentChat,userMessage,isUserMessageLoading } = useContext(ChatContext)
  return (
    <>
      <Container>
        <PotentialChat></PotentialChat>
        {userChat?.length < 1 ?
          null :
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
              {isUserChatsLoading ? <p>Chat Loading...</p> : null}
              {userChat?.map((chat, index) => {
                return (
                  <div onClick={()=>updateCurrentChat(chat)} key={index}>
                    <UserChat chat={chat} user={user}></UserChat>
                  </div>)
              })}
            </Stack>
            <ChatBox></ChatBox>
          </Stack>}
      </Container>
    </>
  )
}

export default Chat
