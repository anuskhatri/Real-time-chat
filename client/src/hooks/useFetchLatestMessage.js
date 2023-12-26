import { useContext, useEffect, useState } from "react"
import { baseUrl, getReq } from "../utils/services"
import { ChatContext } from "../context/ChatContext"

const useFetchLatestMessage = (chat) => {

    const { newMessage, notification } = useContext(ChatContext)
    const [latestMessage, setLatestMessage] = useState()
    useEffect(() => {
        const getMessage = async () => {
            const response = await getReq(`${baseUrl}/api/message/${chat?.chat_id}`)
            if (response.error) {
                return
            }
            const lastMessage = response[response?.length - 1]
            setLatestMessage(lastMessage)
        }
        getMessage()
    }, [newMessage, notification])
    return { latestMessage }
}

export default useFetchLatestMessage