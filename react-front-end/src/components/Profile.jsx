import React from "react";
import '../styles/Profile.scss';
import { useRecoilState } from "recoil";
import profileState from "./atoms";

export default function Profile() {
    const [profile] = useRecoilState(profileState);
    console.log(profile);
    return(
        <div className="parent">
            <div classname="welcome">
                <h1>
                    <p>{`Hello ${profile.first_name}`}</p>
                </h1>
            </div>
        </div>
    )
}