import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav>
            <div className="logo-container">
                <div className="logo">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="logo-content">
                    <h3><Link to="/admin">Dashboard</Link></h3>
                    <Link to="/" style={{color: "#71C8F9"}}>View Forntend</Link>
                </div>
            </div>
            <div className="navbar-container">
                <ul>
                    <li>
                        <Link to="/admin/products/create">
                            <span className="material-icons md-36">qr_code</span><span className="navbar-content">Product QR Generator</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products?pages=0">
                            <span className="material-icons md-36">inventory_2</span><span className="navbar-content">Products Management</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/customers/create">
                            <span className="material-icons md-36">qr_code_2</span><span className="navbar-content">Staff QR Generator</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/customers?pages=0">
                            <span className="material-icons md-36">person</span><span className="navbar-content">Staff Management</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/import">
                            <span className="material-icons md-36">summarize</span><span className="navbar-content">Import Staff Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/register">
                            <span className="material-icons md-36">person_add</span><span className="navbar-content">Register</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar