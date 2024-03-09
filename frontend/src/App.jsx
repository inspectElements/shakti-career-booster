import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./screens/Landing";
import Resume from "./screens/Resume";
import Profile from "./screens/Profile";

const router = createBrowserRouter([
    {
        path: "/landing",
        Component: Landing,
    },
    {
        path: "/resume-upload",
        Component: Resume,
    },
    {
        path: "/profile",
        Component: Profile,
    },
]);
function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
