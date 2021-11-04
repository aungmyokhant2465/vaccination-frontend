import React, { useEffect, useState } from "react";
import vaccinatedUserServices from "../services/vaccinatedUser";
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';

const Detail = () => {
    const [ user, setUser ] = useState(null)
    const params = useParams()

    useEffect(() => {
        vaccinatedUserServices.vaccinatedUser(params.id)
            .then(res => {
                console.log(res)
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
                    <h2>VACCINATION ID</h2>
                </div>
                <div className="img-rounded-container">
                    {/* <span className="material-icons md-80">account_circle</span> */}
                    <img className="img-rounded" src={`http://192.168.100.3:4000/${user.profile}`} alt="profile" />
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

export default Detail