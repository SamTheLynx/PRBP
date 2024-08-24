import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import "./Layout.css"

export default function Layout(){
    return(
        <div>
            <Navbar/>
            <Outlet className="main-container"/>
        </div>
    )
}