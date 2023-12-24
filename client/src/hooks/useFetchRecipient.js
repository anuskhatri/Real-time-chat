import { useEffect, useState } from "react"
import { baseUrl, getReq } from "../utils/services"

const useFetchRecipient = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null)
    const [error, setError] = useState(null)
    const recipientId = chat?.members?.find((id) => Number(id) !== user?.id)
    useEffect(() => {
        const getUserReceipient = async () => {
            if (!recipientId) return null
            const response = await getReq(`${baseUrl}/api/user/find/${recipientId}`)
            const userData = response.userData
            if (response.error) return setError(response.error)
            return setRecipientUser(userData)
        }
        getUserReceipient()
    }, [recipientId])
    return { recipientUser, error }
}

export default useFetchRecipient