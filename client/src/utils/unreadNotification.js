const unreadNotificationFunc = (notification) => {
    return notification.filter((n)=> n.isRead === false)
}
 
export default unreadNotificationFunc