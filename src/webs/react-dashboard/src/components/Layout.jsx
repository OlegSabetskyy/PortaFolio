import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col sm:flex-row">
            <Navbar />
            <div className="flex flex-1 justify-center items-start bg-slate-100 p-4 sm:py-8">
                <div className="flex flex-col flex-1 max-w-screen-lg">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
