import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from 'react-router-dom'
import vaccinatedUserService from "../services/vaccinatedUser";
import Moment from 'react-moment';
import AlertBox from "./AlertBox";

const User = () => {

    const [ users, setUsers ] = useState([])
    const [ noti, setNoti]  = useState(null)
    const [ alert, setAlert ] = useState(false)
    const [ confirmId, setConfirmId ] = useState(null)
    const [ totalPages, setTotalPages ] = useState(0)

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery()
    let history = useHistory();

    const updateUsers = (page) => {
        // setPage(query.get('pages'))
        vaccinatedUserService.vaccinatedUsers(page)
        .then( res => {
            setTotalPages(res.counts)
            setUsers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        updateUsers(query.get('pages'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const prev = () => {
        updateUsers(Number(query.get('pages')) - 1)
        history.push(`/admin/customers?pages=${Number(query.get('pages')) - 1}`)
    }

    const next = () => {
        updateUsers(Number(query.get('pages')) + 1)
        history.push(`/admin/customers?pages=${Number(query.get('pages')) + 1}`)
    }

    const handleAlert = (id) => {
        setConfirmId(id)
        setAlert(true)
    }

    const handleDelete = () => {
        if( confirmId !== null ) {
            vaccinatedUserService.deleteVaccinatedUser(confirmId)
            .then(result => {
                setNoti(result.message)
                setTimeout(() => {
                    setNoti(null)
                }, 3000);
                setUsers(users.filter(u => u.id !== confirmId))
                setAlert(false)
                setConfirmId(null)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div className="container">
            <AlertBox show={alert} hide={() => setAlert(false)} confirm={handleDelete} />
            {
                !alert &&   <div className="customer-container">
                {
                    !users && <div>Loading...</div>
                }
                {
                    users && <ul>
                    {
                        users.map(user => (
                            <li key={user.id}>
                                <div>
                                    <span>{user.vaccinateduser.username}</span>
                                    <time>
                                        <span className="material-icons md-36 time">history</span>
                                        <Moment className="date" date={user.vaccinateduser.createdAt} format="MMM-DD-YYYY" />
                                    </time>
                                </div>
                                <div>
                                    <span className="counts">{user.times}</span><span>Scans</span>
                                </div>
                                <Link to={`/admin/users/${user.vaccinateduser.id}`} className="detail-edit-link">Detail</Link>
                                <div>
                                    <img src={user.vaccinateduser.qrcode} alt="qrcode"/>
                                </div>
                                <div>
                                    <a href={user.vaccinateduser.qrcode} download={`${user.vaccinateduser.username}.png`} className="download-btn">Download</a>
                                    <div>
                                        <Link to={`/admin/customers/edit/${user.vaccinateduser.id}`} className="detail-edit-link">Edit</Link> | <button className="delete-btn" onClick={() => handleAlert(user.vaccinateduser.id)} >Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                    </ul>
                }
                <div>
                    {
                        (Number(query.get('pages')) > 0) && <button onClick={prev} className="pag-btn">Previous</button>
                    }
                    {
                        !(totalPages <= ((Number(query.get('pages')) + 1) * 5)) &&  <button onClick={next} className="pag-btn">Next</button>
                    }
                </div>
            </div> 
            }
            {
                noti && <p className="noti">{noti}</p>
            }
        </div>
    )
}

export default  User