import React from "react";
import '../styles/landing.css'
import image4 from '../asset/images/qrcode.jpeg'
import image2 from '../asset/images/image1.jpg'
import image1 from '../asset/images/staffs.webp'
import image3 from '../asset/images/image2.jpg'
import { Link } from 'react-router-dom'


const Landing = () => {
    return (
        <div className="home-container">
            <div className="home-nav">
                <ul>
                    {/* <li>
                        <Link to="/new">
                            Create
                        </Link>
                    </li>
                    <li>
                        <Link to="/customers">
                            User Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/customers/create">
                            QR Generator
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/admin">
                            Dashboard
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="home-content">
                {/* <p>
                    Prevention is better than cure
                </p>
                <p>
                    Equitable access to safe and effective vaccines is critical to ending the COVID-19 pandemic, so it is hugely encouraging to see so many vaccines proving and going into development. WHO is working tirelessly with partners to develop, manufacture and deploy safe and effective vaccines. Safe and effective vaccines are a game-changing tool: but for the foreseeable future we must continue wearing masks, cleaning our hands, ensuring good ventilation indoors, physically distancing and avoiding crowds. 
                </p> */}
            </div>
            <div className="img-container">
                <div>
                    <div className="img-content">
                        <img src={image1} alt="" />
                    </div>
                    <div className="img-content">
                        <img src={image2} alt="" />
                    </div>
                    <div className="img-content">
                        <img src={image3} alt="" />
                    </div>
                    <div className="img-content">
                        <img src={image4} alt="" />
                    </div>
                </div>
            </div>
            <div className="second-content" >
                <div className="card">
                    <div className="card-header"><span className="material-icons md-68">badge</span></div>
                    <div className="card-content">
                        We are committed to helping businesses evolve through innovative solutions designed on your related platforms.
                    </div>
                </div>
                <div className="card">
                    <div className="card-header"><span className="material-icons md-68">inventory</span></div>
                    <div className="card-content">
                        We are committed to helping businesses evolve through innovative solutions designed on your related platforms.
                    </div>
                </div>
            </div>
            <footer>
                <div>
                    <h3>Content Us</h3>
                    <address>
                        <ul>
                            <li>Phone: <a href="/">+959258285209</a></li>
                            <li>Email: <a href="mailto:example@gmail.com">info@axratech.com</a></li>
                            <li>Address: Yangon, Myanmar </li>
                        </ul>
                    </address>
                </div>
                <div>
                    <h3>About Us</h3>
                    <p>
                        We are committed to helping businesses evolve through innovative solutions designed on your related platforms. We would like to help your enterprises analyze and transform from current operations and technology, to become more cost efficient and effective processes.
                    </p>
                </div>
                <div>
                    <h3>Menu</h3>
                    <ul>
                        {/* <li>
                            <Link to="/new">
                                Create
                            </Link>
                        </li>
                        <li>
                            <Link to="/customers">
                                User Management
                            </Link>
                        </li>
                        <li>
                            <Link to="/customers/create">
                                QR Generator
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                Report
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Landing