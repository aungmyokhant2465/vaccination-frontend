import React, {useState} from "react";
import loginService from '../services/login'

const Register = () => {

    const [ noti, setNoti ] = useState({})
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repassword, setRepassword ] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        if(!email || !password || !username || !repassword) {
            setTimeout(() => {
                setNoti({})
            }, 3000);
            setNoti({message: "Please fill all field", error: true})
            return
        }
        if(password !== repassword) {
            setTimeout(() => {
                setNoti({})
            }, 3000);
            setNoti({message: "Password and Re-password are not match", error: true})
            return
        }
        try {
            const result = await loginService.register({
                username,
                email,
                password
            })
            setTimeout(() => {
                setNoti({})
            }, 3000);
            setNoti({message: result.message, error: false})
            setUsername('')
            setEmail('')
            setPassword('')
            setRepassword('')
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div className="container">
        <div className="register-content">
            <div>
                <h2>Register</h2>
            </div>
            <div>
                <form onSubmit={handleRegister} >
                    <div className="form-group">
                        <label htmlFor="username">Username :</label>
                        <input id="username" name="username" type="text" value={username} onChange={({target}) =>setUsername(target.value)} required placeholder="Enter your username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Eamil :</label>
                        <input id="email" name="email" type="email" value={email} onChange={({target}) =>setEmail(target.value)} required placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password :</label>
                        <input id="password" name="password" type="password"  value={password} onChange={({target}) =>setPassword(target.value)} required placeholder="Enter your password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="repassword">Re-Password :</label>
                        <input id="repassword" name="repassword" type="password"  value={repassword} onChange={({target}) =>setRepassword(target.value)} required placeholder="Enter your password again"/>
                    </div>
                    <div className="form-group">
                        <button className="form-btn" type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
        {
            noti.error === false && <p className="noti">{noti.message}</p>
        }
        {
            noti.error === true && <p className="noti err">{noti.message}</p>
        }
    </div>
    )
}

export default Register