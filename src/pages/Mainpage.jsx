import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Mainpage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const logout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }    

    //function to get token expiration
    const getTokenExpiration = (token) => {
        if (!token) {
            return true // 
        }

        const decodedPayload = JSON.parse(atob(token.split('.')[1]))

        if (!decodedPayload.exp) {
            return true // token has no expiration, treat as invalid
        }

        const currentDate = Date.now()
        const expiryTime = decodedPayload.exp * 1000 // convert to ms

        console.log("current date " + currentDate, " " +"expiry " + expiryTime)

        return currentDate >= expiryTime // true if expired
    }

    useEffect(() => {
        const token = localStorage.getItem('token')


        if (!token || getTokenExpiration(token)) {
            logout()
        } else {
            setLoading(false)
        }
    }, [])

    if (loading) {
        return <div>Loading...</div> // Show a loading state while checking the token
    }

    return (
        <div>Welcome</div>
    )
}

export default Mainpage