import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import '../styles/Home.scss';
import profileState from './atoms';
import { useRecoilState } from 'recoil';

export default function Home() {
    const [profile] = useRecoilState(profileState);

    const conditionalRender = () => {
        if (profile.length === 0) {
            return (
                <>
                      <h1>
                    <p class="line-1 anim-typewriter">Welcome to Vessel</p>
                </h1>
                <Link to="login">
                    <Button>Login</Button>
                </Link>
                </>
            )
        } else {
            return (
                <>
                    <p class="line-1 anim-typewriter2">{`Hello, ${profile.first_name}, ready to order?`}</p>
                    <Button>Order</Button>
                </>
            )
        }
    }
    return(
        <div className="parent">
            <div classname="welcome">
              {conditionalRender()}
            </div>
        </div>
    )
}