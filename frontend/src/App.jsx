import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./screens/Landing";
import Resume from "./screens/Resume";
import AiInterview from "./screens/AiInterview";
import Profile from "./screens/Profile";
import Assessment from "./screens/Assessment";
import Dashboard from "./screens/Dashboard";
import RankingSystem from "./screens/RankingSystem";
import InterviewSystem from "./screens/InterviewSystem";
import Sahayak from "./screens/Sahayak";
import Community from "./screens/Community";
import InterviewResult from "./screens/InterviewResult";

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
    {
        path: "/dashboard",
        Component: Dashboard,
    },
    {
        path: "/company-ranking",
        Component: RankingSystem,
    },
    {
        path: "interview-system",
        Component: InterviewSystem,
    },
    {
        path: "sahayak",
        Component: Sahayak,
    },
    {
        path: "community",
        Component: Community,
    },
    {
        path: "interview-result",
        Component: InterviewResult,
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
