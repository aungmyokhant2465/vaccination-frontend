import React from "react";
import '../styles/landing.css'
import image1 from '../asset/images/images.jpeg'
import image2 from '../asset/images/images2.jpg'
import image3 from '../asset/images/images3.jpg'
import image4 from '../asset/images/images5.jpeg'
// import { Link } from 'react-router-dom'


const Landing = () => {
    return (
        <div className="home-container">
            <div className="home-nav">
                {/* <ul>
                    <li>
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
                    </li>
                </ul> */}
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
            <div className="home-content">
                <p>
                    Prevention is better than cure
                </p>
                <p>
                    Equitable access to safe and effective vaccines is critical to ending the COVID-19 pandemic, so it is hugely encouraging to see so many vaccines proving and going into development. WHO is working tirelessly with partners to develop, manufacture and deploy safe and effective vaccines. Safe and effective vaccines are a game-changing tool: but for the foreseeable future we must continue wearing masks, cleaning our hands, ensuring good ventilation indoors, physically distancing and avoiding crowds. 
                </p>
            </div>
            <footer>
                <div>
                    <h3>Content Us</h3>
                    <ul>
                        <li>Phone: <a href="/">0976654333</a></li>
                        <li>Email: <a href="mailto:example@gmail.com">example@gmail.com</a></li>
                    </ul>
                </div>
                <div>
                    <h3>About Us</h3>
                    <p>
                        Equitable access to safe and effective vaccines is critical to ending the COVID-19 pandemic, so it is hugely encouraging to see so many vaccines proving and going into development. WHO is working tirelessly with partners to develop, manufacture and deploy safe and effective vaccines. Safe and effective vaccines are a game-changing tool
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