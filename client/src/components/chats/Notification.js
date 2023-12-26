import { useContext, useState } from "react";
import moment from 'moment'

import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import unreadNotificationFunc from "../../utils/unreadNotification";

const Notification = () => {
    const { user } = useContext(AuthContext)
    const { notification, userChat, allUser, markAllNotificationRead, markNotificationRead } = useContext(ChatContext)

    const [isOpen, setIsOpen] = useState(false)
    const unreadNotification = unreadNotificationFunc(notification)
    const modifyNotification = notification.map((n) => {
        const sender = allUser.find((sender) => Number(sender.id) === Number(n.senderId))
        return {
            ...n,
            senderName: sender?.name
        }
    })
    return (
        <>
            <div className="notification">
                <div className="notification-icon" onClick={() => setIsOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    </svg>
                    {unreadNotification?.length === 0 ? null : (
                        <>
                            <span className="notification-count">
                                <span>{unreadNotification.length}</span>
                            </span>
                        </>
                    )}
                </div>
                {isOpen ? (
                    <div className="notifications-box">
                        <div className="notifications-header">
                            <h3>Notifications</h3>
                            <div
                                onClick={() => {
                                    markAllNotificationRead(notification)
                                    setIsOpen(false)
                                }} className="mark-as-read">
                                Mark all as read
                            </div>
                        </div>
                        {modifyNotification?.length === 0 ? <span className="notification">No notification yet...</span> : null}
                        {modifyNotification && modifyNotification.map((n, index) => {
                            return <>
                                <div
                                    onClick={() => {
                                        markNotificationRead(n, userChat, user, notification)
                                        setIsOpen(false)
                                    }}
                                    key={index} className={n.Isread ? 'notification' : 'notification not-read'}>
                                    <span>{`${n.senderName} sent a new message`}</span>
                                    <span className="notification-time">{moment(n.date).calendar()}</span>
                                </div >
                            </>
                        })}
                    </div>) : null}
            </div >
        </>
    );
}

export default Notification;