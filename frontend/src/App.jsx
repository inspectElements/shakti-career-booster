import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./screens/Landing";
import Resume from "./screens/Resume";

const router = createBrowserRouter([
    {
        path: "/landing",
        Component: Landing,
    },
    {
        path: "/resume-upload",
        Component: Resume,
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
