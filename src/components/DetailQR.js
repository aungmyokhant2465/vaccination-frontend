import React, { useEffect, useState } from "react";
import vaccinatedUserServices from "../services/vaccinatedUser";
import { useParams, useRouteMatch } from 'react-router-dom';
import Moment from 'react-moment';
import { BACKEND_URL } from '../constant'

const DetailQR = () => {
    const [ user, setUser ] = useState(null)
    const [qrcount, setQrcount] = useState(null)
    const params = useParams()

    useEffect(() => {
        vaccinatedUserServices.vaccinatedUser(params.id)
            .then(res => {
                setQrcount(res.data)
                setUser(res.data.vaccinateduser)
            }).catch(err => {
                console.log(err)
            })
    }, [params.id])

    const match = useRouteMatch('/users/:id/scaned')

    useEffect(() => {
        if(match && user) {
            console.log("matched")
            vaccinatedUserServices.incrCount(user.id, qrcount).then(res => console.log(res)).catch(err => console.log(err))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    if(!user) {
        return (
            <div>
                <em>Loading...</em>
            </div>
        )
    }

    return (
        <div className="landing-container">
            <div className="detail-container">
                <div>
                    <h2>VACCINATION ID</h2>
                </div>
                <div className="img-rounded-container">
                    {/* change DNS or ip */}
                    <img className="img-rounded" src={`${BACKEND_URL}/${user.photo}`} alt="vaccinated person" />
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <th>NRC</th>
                                <td>{user.nrc}</td>
                            </tr>
                            <tr>
                                <th>Date of birth</th>
                                <td><Moment date={user.dob} format="MMM DD YYYY" /></td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td>{user.gender}</td>
                            </tr>
                            <tr>
                                <th>Position</th>
                                <td>{user.position}</td>
                            </tr>
                            <tr>
                                <th>Department</th>
                                <td>{user.department}</td>
                            </tr>
                            <tr>
                                <th>Company</th>
                                <td>{user.company}</td>
                            </tr>
                            <tr>
                                <th>Joined Date</th>
                                <td><Moment date={user.joinDate} format="MMM DD YYYY" /></td>
                            </tr>
                            <tr>
                                <th>Vaccinated First Date</th>
                                <td><Moment date={user.vaccineFirstDate} format="MMM DD YYYY" /></td>
                            </tr>
                            <tr>
                                <th>Vaccinated Second Date</th>
                                <td>{
                                    user.vaccineSecondDate ? <Moment date={user.vaccineSecondDate} format="MMM DD YYYY" /> : ''
                                }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                <img src={user.qrcode} alt="qrcode" width="100"/>
                </div>
            </div>
        </div>
    )
}

export default DetailQR