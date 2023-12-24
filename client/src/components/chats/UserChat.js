import { useContext, useEffect } from "react"
import { Stack } from 'react-bootstrap'

import {ChatContext} from '../../context/ChatContext'
import useFetchRecipient from "../../hooks/useFetchRecipient"

const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipient(chat, user)
    const {onlineUsers} = useContext(ChatContext)
    const isOnline = onlineUsers?.some((user)=>user.userId == recipientUser?.id)
    return (
        <>
            <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between">
                <div className="d-flex">
                    <div className="text-content">
                        <div className="name">
                            {recipientUser?.name}
                        </div>
                        <div className="text">Text message</div>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                    {/* <div className="date">12/10/2023</div>
                    <div className="this-user-notification">2</div> */}
                    <span className={isOnline? "user-online":""}></span>
                </div>
            </Stack>
        </>
    )
}

export default UserChat