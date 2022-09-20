import React from "react";
import '../styles/Profile.scss';
import { useRecoilState } from "recoil";
import profileState from "./atoms";

export default function Profile() {
    const [profile] = useRecoilState(profileState);
    const conditionalRender = () => {
        if (profile.length === 0) {
            return (
                <>
                    <p>Not Logged In</p>
                </>
            )
        } else {
            return (
                <>
                    <p>{`Hello ${profile.first_name}`}</p>
                </>
            )
        }
    }

    console.log(profile);
    return(
        <div className="parent">
            <div classname="welcome">
                <h1>
                    {conditionalRender()}
                </h1>
            </div>
        </div>
    )
}