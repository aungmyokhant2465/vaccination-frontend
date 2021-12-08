import React, { useState } from "react";
import loginService from '../services/login'
import { useHistory } from "react-router-dom";
import '../styles/login.css'

const Login = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [noti, setNoti] = useState(null)

    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()
        if(!email || !password) {
            setTimeout(() => {
                setNoti(null)
            }, 3000);
            setNoti("Please fill all field")
            return
        }
        loginService.login({ email: email, password: password })
        .then(res => {
            if(res.message) {
                setTimeout(() => {
                    setNoti(null)
                }, 3000);
                setNoti(res.message)
                return
            }
          window.localStorage.setItem('loggedUser', JSON.stringify(res))
          history.push('/admin')
        })
        .catch(err => {
          console.log("error :", err)
        })
      }

    return (
        <div className="login-container">
            <div className="login-content">
                <div>
                    <h2>Login</h2>
                </div>
                <div>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Eamil :</label>
                            <input id="email" name="email" type="email" value={email} onChange={({target}) =>setEmail(target.value)} required placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password :</label>
                            <input id="password" name="password" type="password"  value={password} onChange={({target}) =>setPassword(target.value)} required placeholder="Enter your password"/>
                        </div>
                        <div className="form-group">
                            <button className="login-btn" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            {
                noti && <p className="noti err">{noti}</p>
            }
        </div>
    )
}

export default Login