import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Layout;
