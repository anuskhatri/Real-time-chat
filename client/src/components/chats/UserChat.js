import { useContext, useEffect } from "react"
import { Stack } from 'react-bootstrap'
import moment from 'moment'

import { ChatContext } from '../../context/ChatContext'
import useFetchRecipient from "../../hooks/useFetchRecipient"
import unreadNotificationFunc from "../../utils/unreadNotification";
import useFetchLatestMessage from "../../hooks/useFetchLatestMessage"

const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipient(chat, user)

    const { onlineUsers, allUser, notification, markThisNotificationRead } = useContext(ChatContext)
    const { latestMessage } = useFetchLatestMessage(chat)
    const unreadNotification = unreadNotificationFunc(notification)
    const thisUserNotification = unreadNotification?.filter(
        n => Number(n.senderId) === Number(recipientUser.id)
    )

    const truncateText = (text) => {
        console.log("message", text);
        let shortText = text.substring(0, 20);
        if (text.length > 20) {
            shortText = shortText + "...";
        }
        return shortText;
    };
    
    const isOnline = onlineUsers?.some((user) => user.userId == recipientUser?.id)
    return (
        <>
            <Stack
                direction="horizontal"
                gap={3}
                className="user-card align-items-center p-2 justify-content-between"
                onClick={() => {
                    if (thisUserNotification?.length !== 0) {
                        markThisNotificationRead(thisUserNotification, notification)
                    }
                }}
            >
                <div className="d-flex">
                    <div className="text-content">
                        <div className="name">
                            {recipientUser?.name}
                        </div>
                        <div className="text">
                            {latestMessage?.message && (
                                <span>{truncateText(latestMessage?.message)}</span>)}</div>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <div className="date">{moment(latestMessage?.timestamp).calendar()}</div>
                    <div className={thisUserNotification?.length > 0 ? "this-user-notifications" : ""}>
                        {thisUserNotification?.length > 0 ? thisUserNotification?.length : ""}
                    </div>
                    <span className={isOnline ? "user-online" : ""}></span>
                </div>
            </Stack>
        </>
    )
}

export default UserChat