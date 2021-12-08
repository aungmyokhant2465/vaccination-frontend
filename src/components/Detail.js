import React, { useEffect, useState } from "react";
import vaccinatedUserService from "../services/vaccinatedUser";
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { BACKEND_URL } from '../constant'

const Detail = () => {
    const [ user, setUser ] = useState(null)
    const params = useParams()

    useEffect(() => {
        vaccinatedUserService.vaccinatedUser(params.id)
            .then(res => {
                setUser(res.data.vaccinateduser)
            }).catch(err => {
                console.log(err)
            })
    }, [params.id])

    if(!user) {
        return (
            <div>
                <em>Loading...</em>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="detail-container">
                <div>
                    <h2>ID CARD</h2>
                </div>
                <div className="img-rounded-container">
                    <img className="img-rounded" src={`${BACKEND_URL}/${user.photo}`} alt="a person" />
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
                            {/* <tr>
                                <th>Date of birth</th>
                                <td><Moment date={user.dob} format="MMM DD YYYY" /></td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td>{user.gender}</td>
                            </tr> */}
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
                                <th>ID Number</th>
                                <td>{user.id_no}</td>
                            </tr>
                            {/* <tr>
                                <th>Vaccinated First Date</th>
                                <td><Moment date={user.vaccineFirstDate} format="MMM DD YYYY" /></td>
                            </tr>
                            <tr>
                                <th>Vaccinated Second Date</th>
                                <td>{
                                    user.vaccineSecondDate ? <Moment date={user.vaccineSecondDate} format="MMM DD YYYY" /> : ''
                                }</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                <div className="record-img">
                    <img src={`${BACKEND_URL}/${user.recordCard}`} alt="record card" />
                </div>
                <div>
                    <img src={user.qrcode} alt="qrcode" />
                </div>
            </div>
        </div>
    )
}

export default Detail