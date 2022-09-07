import React from "react";
import Button from "./Button";
import '../styles/Home.scss';

export default function Home() {
    return(
        <div className="parent">
            <div classname="welcome">
                <h1>
                <p class="line-1 anim-typewriter">Welcome to Vessel Packaging</p>
                </h1>
                <Button>Login</Button>
            </div>
        </div>
    )
}