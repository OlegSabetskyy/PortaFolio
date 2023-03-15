import {
    ChartBarIcon,
    UserIcon,
    Bars3CenterLeftIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { ReactComponent as GithubOutlineIcon } from "../assets/github-outline.svg";
import { NavLink } from "react-router-dom";
import ConditionalWrapper from "./ConditionalWrapper";
import "./navbar.css";

const Navbar = () => {
    let [isExpanded, setIsExpanded] = useState(false);
    let closeDrawer = () => setIsExpanded(false);

    return (
        <nav id="nav" is-expanded={isExpanded.toString()}>
            <div className="flex px-4 py-3 sm:hidden">
                <button
                    className="
                        flex flex-col items-center group 
                    "
                    onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
                >
                    <Bars3CenterLeftIcon className={"w-8 text-slate-900"} />
                </button>
            </div>

            <ul
                id="navbar-icons"
                className={`
                        flex flex-col bg-slate-900 p-2 z-10 absolute w-80 bottom-0 top-0 transition-all 
                        sm:static sm:left-0 sm:w-auto sm:h-screen
                    `}
            >
                <ItemButton
                    Icon={XMarkIcon}
                    onClick={closeDrawer}
                    closeDrawer={closeDrawer}
                />
                <ItemLink
                    Icon={GithubOutlineIcon}
                    text="Portfolio"
                    external={true}
                    to="https://github.com/OlegSabetskyy/PortaFolio"
                    closeDrawer={closeDrawer}
                />
                <ItemLink
                    Icon={ChartBarIcon}
                    text="Dashboard"
                    to="/"
                    closeDrawer={closeDrawer}
                />
                <ItemLink
                    Icon={UserIcon}
                    text="Clients"
                    to="/clients"
                    closeDrawer={closeDrawer}
                />
            </ul>
            <div
                id="navbar-backdrop"
                className="absolute inset-0 bg-black/[.5] z-0 transition-all sm:hidden"
                onClick={closeDrawer}
            />
        </nav>
    );
};

const ItemLink = ({ Icon, text, to, external = false, closeDrawer }) => {
    let linkClasses =
        "flex gap-3 group px-3 py-4 sm:flex-col sm:items-center sm:py-7 sm:gap-0 sm:px-1 sm:py-4 sm:gap-1";

    return (
        <ItemWrapper>
            <ConditionalWrapper
                wrappers={[
                    external
                        ? (children) => (
                              <a
                                  href={to}
                                  className={`${linkClasses} text-slate-300`}
                                  target="_blank"
                              >
                                  {children}
                              </a>
                          )
                        : (children) => (
                              <NavLink
                                  to={to}
                                  className={({ isActive }) =>
                                      `${linkClasses} ${
                                          isActive
                                              ? "text-white"
                                              : "text-slate-300"
                                      }`
                                  }
                                  onClick={closeDrawer}
                              >
                                  {children}
                              </NavLink>
                          )
                ]}
            >
                <Icon className={`group-hover:text-white w-8`} />
                <p
                    className={`text-sm group-hover:text-white flex items-center`}
                >
                    {text}
                </p>
            </ConditionalWrapper>
        </ItemWrapper>
    );
};

const ItemButton = ({ Icon, onClick }) => {
    return (
        <ItemWrapper>
            <button
                type="button"
                className="px-3 py-4 group sm:hidden"
                onClick={onClick}
            >
                <Icon
                    className={`group-hover:text-white text-slate-300 w-8 `}
                />
            </button>
        </ItemWrapper>
    );
};

const ItemWrapper = ({ children }) => (
    <li className="flex flex-col">{children}</li>
);

export default Navbar;
