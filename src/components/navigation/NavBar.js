import React from 'react';
import { Link } from "react-router-dom";
//Icons
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const tabs = [
    {
        title: "Home",
        path: "/",
        icon: <HomeOutlinedIcon />
    },
    {
        title: "Calendar",
        path: "calendar",
        icon: <CalendarMonthOutlinedIcon />
    },
    {
        title: "Table",
        path: "table",
        icon: <TableChartOutlinedIcon />
    },
]

const NavBar = () => {
    return(
        <div className="nav-bar-container">
            <div className="nav-bar-top">
                <input type="text" />
                <KeyboardDoubleArrowLeftIcon />
            </div>
            <ul className="nav-bar-bottom">
                {
                    tabs.map((tab, idx) => {
                        return(
                            <Link key={idx} to={tab.path}>
                                <li>
                                    {tab.icon}
                                    <span>{tab.title}</span>
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default NavBar;