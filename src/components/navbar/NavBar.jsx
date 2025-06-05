import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";

function NavBar() {
    return (
        <nav>
            <div>
                <h1>ElectroMart.</h1>
                <div>
                    <Link>Home</Link>
                    <Link>Store</Link>
                </div>
            </div>
            <div>
                <SearchBar></SearchBar>
                <div>
                    <Link>
                        <FavoutiesLink></FavoutiesLink>
                    </Link>
                    <Link>
                        <ShoppingCartLink></ShoppingCartLink>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

function FavoutiesLink(){
    return <></>
}

function ShoppingCartLink(){
    return <></>
}

export default NavBar;