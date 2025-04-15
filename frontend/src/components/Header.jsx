import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import React from "react"
function Header() {
   

    return (
        <>
        <h1>Header</h1>
        <nav>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        </nav>
 
        </>
    )
}

export default Header