import { useContext, useEffect, useRef, useState } from "react"
import { Stack } from "react-bootstrap"
import moment from 'moment'
import InputEmoji from 'react-input-emoji'

// Internal imports
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import useFetchRecipient from "../../hooks/useFetchRecipient"

const ChatBox = () => {
    const { user } = useContext(AuthContext)
    const { currentChat, userMessage, isUserMessageLoading, sendMessage, isSendMessagesLoading, newMessage, potentialChat,notification } = useContext(ChatContext)
    const { recipientUser } = useFetchRecipient(currentChat, user)
    const [textMessage, setTextMessage] = useState()
    const scroll = useRef()

    const onSend = () => {
        sendMessage(user.id, textMessage, currentChat.chat_id)
        setTextMessage()
    }

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior:"smooth"})
    }, [userMessage])

    if (!recipientUser && potentialChat.length > 1) {
        return <>
            <p style={{ textAlign: "center", width: "100%" }}>No conversation Started yet...</p>
        </>
    }
    if (potentialChat.length < 1) {
        return null
    }
    if (isUserMessageLoading) {
        return <>
            <p style={{ textAlign: "center", width: "100%" }}>Loading Chats...</p>
        </>
    }

    return (
        <>
            <Stack gap={4} className="chat-box">
                <div className="chat-header">
                    <strong>
                        {recipientUser?.name}
                    </strong>
                </div>
                <Stack gap={3} className="messages">
                    {userMessage && userMessage.map((message, index) => {
                        let formattedTimestamp = moment(message.timestamp).calendar()
                        return (
                            <Stack
                            ref={scroll}
                                key={index} // Add a unique key
                                className={`${message.sender_id == user.id ?
                                    "message self align-self-end flex-grow-0" :
                                    "message align-self-start flex-grow-0"}`}
                            >
                                <span>{message.message}</span>

                                <span className="message-footer">{formattedTimestamp}</span>
                            </Stack>
                        )
                    })}

                </Stack>
                <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                    <InputEmoji value={textMessage} onChange={setTextMessage} ></InputEmoji>
                    <button onClick={onSend} className="send-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                        </svg>
                    </button>
                </Stack>
            </Stack>
        </>
    )
}

export default ChatBox