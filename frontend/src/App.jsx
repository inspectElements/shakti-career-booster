import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./screens/Landing";
import Resume from "./screens/Resume";
import AiInterview from "./screens/AiInterview";
import Profile from "./screens/Profile";
import Assessment from "./screens/Assessment";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Landing,
    },
    {
        path: "/ai-interview",
        Component: AiInterview,
    },
    {
        path: "/resume-upload",
        Component: Resume,
    },
    {
        path: "/profile",
        Component: Profile,
    },
    {
        path: "/skill-assesment",
        Component: Assessment,
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
