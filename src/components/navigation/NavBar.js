import React from 'react';
import { Link } from "react-router-dom";
//Icons
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const NavBar = () => {
    return(
        <div className="nav-bar-container">
            <div className="nav-bar-top">
                <input />
                <KeyboardDoubleArrowLeftIcon />
            </div>
            <ul className="nav-bar-bottom">
                <Link to={`/`}>
                    <li>
                        <HomeOutlinedIcon />
                        <span>Home</span>
                    </li>
                </Link>
                <Link to={`Calendar`}>
                    <li>
                        <CalendarMonthOutlinedIcon />
                        <span>Calendar</span>
                    </li>
                </Link>
            </ul>
        </div>
    )
}

export default NavBar;