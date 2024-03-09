import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./screens/Landing";
import Resume from "./screens/Resume";
import AiInterview from "./screens/AiInterview";
import Profile from "./screens/Profile";

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
]);
function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
