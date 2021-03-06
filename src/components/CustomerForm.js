import React, { useState } from "react";
import vaccinatedUserService from "../services/vaccinatedUser";

const CustomerForm = () => {

    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ nrc, setNrc ] = useState('')
    const [ dob, setDob ] = useState('')
    const [ gender, setGender ] = useState('')
    const [ address, setAddres ] = useState('')
    const [ vaccineFirstDate, setVaccineFirstDate ] = useState('')
    const [ vaccineSecondDate, setVaccineSecondDate ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ note, setNote ] = useState('')
    const [ photo, setPhoto ] = useState('')
    const [ recordCard, setRecordCard ] = useState('')
    const [ position, setPosition ] = useState('')
    const [ department, setDepartment ] = useState('')
    const [ company, setCompany ] = useState('')
    const [ joinDate, setJoinDate ] = useState('')
    const [ idNo, setIdNo ] = useState('')

    const [ progress, setProgress ] = useState(false)

    const [noti, setNoti] = useState({})

    const handleForm = async (e) => {
        e.preventDefault()
        let newVaccinatedUser = {
            username: `${firstName} ${lastName}`, nrc, dob, gender, address, photo: null,
            vaccineFirstDate, vaccineSecondDate, phone, note, position, department, company, joinDate, id_no: idNo
        }
        setProgress(true)
        try {
            if(photo) {
                const formData = new FormData()
                formData.append('file', photo)
                const uploadedFile = await vaccinatedUserService.imageUpload(formData)
                if(uploadedFile.error === true) {
                    setTimeout(() => {
                        setNoti({})
                    }, 3000);
                    setNoti(uploadedFile)
                    return
                }
                newVaccinatedUser = { ...newVaccinatedUser, photo: uploadedFile.file.filename }
            }
            if(recordCard) {
                const formData = new FormData()
                formData.append('file', recordCard)
                const uploadedFile = await vaccinatedUserService.imageUpload(formData)
                if(uploadedFile.error === true) {
                    setTimeout(() => {
                        setNoti({})
                    }, 3000);
                    setNoti(uploadedFile)
                    return
                }
                newVaccinatedUser = { ...newVaccinatedUser, recordCard: uploadedFile.file.filename }
            }
            const result = await vaccinatedUserService.createVaccinatedUser(newVaccinatedUser)
            setTimeout(() => {
                setNoti({})
            }, 3000);
            setNoti({message: result.message, error: false})
            setFirstName('')
            setLastName('')
            setNrc('')
            setDob('')
            setGender('')
            setAddres('')
            setVaccineFirstDate('')
            setVaccineSecondDate('')
            setPhone('')
            setNote('')
            setPhoto('')
            setRecordCard('')
            setPosition('')
            setDepartment('')
            setCompany('')
            setJoinDate('')
            setIdNo('')
        } catch(error) {
            console.error(error)
        }
        setProgress(false)
    }

    return (
        <div className="container">
            <div className="form-header">
                <span><span className="material-icons md-36">add_circle_outline</span><h2>Create New Staff</h2></span>
            </div>
            <div className="form-main">
                <section>
                    <h3><span className="material-icons md-36 info">info</span> Enter information</h3>
                    <form onSubmit={handleForm} id="customer-form" encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="name">Name :</label>
                            <div className="name-input">
                                <input id="name" name="first-name" type="text" placeholder="first name"
                                    value={firstName} onChange={({target}) => setFirstName(target.value)}
                                />
                                <input name="last-name" type="text" placeholder="last name"
                                    value={lastName} onChange={({target}) => setLastName(target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="photo">Photo :</label>
                            <input id="photo" name="photo" type="file" placeholder="Enter your image" 
                             onChange={({target}) => setPhoto(target.files[0])} accept="image/*"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="recordCard">Record Card :</label>
                            <input id="recordCard" name="recordCard" type="file" placeholder="Enter your reord card image" 
                             onChange={({target}) => setRecordCard(target.files[0])} accept="image/*"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nrc">NRC :</label>
                            <input id="nrc" name="nrc" type="text" placeholder="Enter your NRC number" 
                                value={nrc} onChange={({target}) => setNrc(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of birth :</label>
                            <input id="dob" name="dob" type="date" placeholder="your date of birth" 
                                value={dob} onChange={({target}) => setDob(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender :</label>
                            <select id="gender" name="gender" value={gender} onChange={({target}) => setGender(target.value)} >
                                <option value="">Enter your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address :</label>
                            <input id="address" name="address" type="text" placeholder="Enter your address"
                                value={address} onChange={({target}) => setAddres(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="position">Position :</label>
                            <input id="position" name="position" type="text" placeholder="Enter your position"
                                value={position} onChange={({target}) => setPosition(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department :</label>
                            <input id="department" name="department" type="text" placeholder="Enter your department"
                                value={department} onChange={({target}) => setDepartment(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company">Comapny :</label>
                            <input id="company" name="company" type="text" placeholder="Enter your comapny name"
                                value={company} onChange={({target}) => setCompany(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="joinDate">Join Date :</label>
                            <input id="joinDate" name="joinDate" type="date" placeholder="Joined date (mm/dd/yyyy)" 
                                value={joinDate} onChange={({target}) => setJoinDate(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="idNo">ID Number :</label>
                            <input id="idNo" name="idNo" type="text" placeholder="Enter your ID Number"
                                value={idNo} onChange={({target}) => setIdNo(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vaccineFirstDate">Vaccinated first date :</label>
                            <input id="vaccineFirstDate" name="vaccineFirstDate" type="date" placeholder="your vaccinated first date (mm/dd/yyyy)" 
                                value={vaccineFirstDate} onChange={({target}) => setVaccineFirstDate(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vaccineSecondDate">Vaccinated second date :</label>
                            <input id="vaccineSecondDate" name="vaccineSecondDate" type="date" placeholder="your vaccinated second date (mm/dd/yyyy)" 
                                value={vaccineSecondDate} onChange={({target}) => setVaccineSecondDate(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Phone :</label>
                            <input id="phone" name="phone" type="tel" placeholder="enter your phone number" 
                                value={phone} onChange={({target}) => setPhone(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="note">Note :</label>
                            <textarea id="note" value={note} onChange={({target}) => setNote(target.value)}></textarea>
                        </div>
                    </form>
                    <div className="generator-group">
                        <span className="material-icons md-36 form">qr_code_2</span>
                        <button disabled={progress} type="submit" form="customer-form" className="btn">
                            {
                                !progress ? 'QR Generate': 'Processing...'
                            }
                        </button>
                    </div>
                </section>
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

export default CustomerForm