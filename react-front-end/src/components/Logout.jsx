import React from "react";
import { useSetRecoilState } from "recoil";
import profileState from "./atoms";
import Button from "./Button";

export default function Logout() {
    const setProfile = useSetRecoilState(profileState);
    const logout = () => {
        setProfile([]);
    }
    return (
        <>
            <Button onClick={logout}>Logout</Button>
        </>
    )
}