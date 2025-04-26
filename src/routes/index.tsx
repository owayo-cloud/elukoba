import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Explore from "../pages/explore";
import Details from "../pages/detail";
import Search from "../pages/search";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : ":explore",
                element : <Explore/>
            },
            {
                path : ":explore/:id",
                element : <Details/>
            },
            {
                path : "search",
                element : <Search/>
            }
        ] 
    }  
])
export default router;