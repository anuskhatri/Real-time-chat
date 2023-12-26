import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { AuthContext } from "../../context/AuthContext"

const PotentialChat = () => {
    const { potentialChat, createChat, onlineUsers } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    return (
        <>
            <div className="all-users">
                {potentialChat && potentialChat.map((u, index) => {
                    return (
                        <div onClick={() => createChat(user.id, u.id)} className="single-user" key={index}>
                            {u.name}
                            <span className={onlineUsers?.some((user) => user.userId == user?.id) ? "useronline" : ""}>
                            </span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PotentialChat