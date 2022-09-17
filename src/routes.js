import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile";
import User from "./pages/User";

export default function Routing() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={ <User/> }/>
                <Route path="/create" element={ <Profile/> }/>
                <Route path="/update/:id" element={ <Profile/> }/>
            </Routes>
        </BrowserRouter>
    );
}