import { AppBar, Toolbar } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';


export function Navbar( ){
    return (
        <AppBar className='navbar' position="static">
            <Toolbar>
                <Link to={'/article'} className="navbar-button"><HomeIcon /></Link>
                <Link to={'/bookings'} className="navbar-button">Einbuchen</Link>
                <Link to={'/bookings/out'} className="navbar-button">Ausbuchen</Link>
            </Toolbar>
        </AppBar>
    )
}