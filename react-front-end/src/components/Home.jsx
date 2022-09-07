import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import '../styles/Home.scss';

export default function Home() {
    return(
        <div className="parent">
            <div classname="welcome">
                <h1>
                    <p class="line-1 anim-typewriter">Welcome to Vessel Packaging</p>
                </h1>
                <Link to="login">
                    <Button>Login</Button>
                </Link>
            </div>
        </div>
    )
}