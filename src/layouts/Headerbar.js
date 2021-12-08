import React, { useState } from 'react'
import vaccinatedUserService from '../services/vaccinatedUser'
import { useHistory } from 'react-router-dom'

const Headerbar = ({ username, handleLogout }) => {

    const [ search , setSearch ] = useState('')
    const [ noti, setNoti ] = useState({})

    const history = useHistory()

    const handleFind = () => {
        if(!search) {
            setTimeout(() => {
                setNoti({})
            }, 3000)
            setNoti({ message: 'Please enter NRC number', error: true })
            return
        }

        vaccinatedUserService.findByNrc(search)
            .then(result => {
                if(result.status === 404) {
                    setTimeout(() => {
                        setNoti({})
                    }, 3000)
                    setNoti({ message: 'Sorry! user not found or incorrect NRC number.', error: true })
                    return
                }
                history.push('/admin/users/'+result.data)
                setSearch('')
            })
            .catch(err => {
                console.log("error :", err)
            })
    }

    return (
        <header>
            <div>
                <h1>Admin Dashboard </h1>
            </div>
            <div className="form-group search">
                <input id="search" name="search" type="search" value={search} onChange={({target}) =>setSearch(target.value)} required placeholder="Enter by NRC number"/>
                <button onClick={handleFind} className="search-btn">Search</button>
            </div>
            <div>
                <span>{username}</span>
                <div className="profile-container">
                    {/* <img src={profile_image} alt="profile" /> */}
                    <span className="material-icons md-40">account_circle</span>
                    <button onClick={handleLogout} className="logout-btn">Log out</button>
                </div>
            </div>
            {
                noti.error === false && <p className="noti">{noti.message}</p>
            }
            {
                noti.error === true && <p className="noti err">{noti.message}</p>
            }
        </header>
    )
}

export default Headerbar