import {
    ChartBarIcon,
    UserIcon,
    Bars3CenterLeftIcon
} from "@heroicons/react/24/outline";
import { ReactComponent as GithubOutlineIcon } from "../assets/github-outline.svg";

const Navbar = () => {
    return (
        <nav>
            <div className="flex px-4 py-3">
                <button className="flex flex-col items-center group">
                    <Bars3CenterLeftIcon className={"w-8 text-slate-900"} />
                </button>
            </div>
            <ul className="flex flex-col bg-slate-900 px-2 gap-y-7 h-screen pt-8">
                <Item
                    Icon={GithubOutlineIcon}
                    text="Portfolio"
                    isActive={false}
                />
                <Item Icon={ChartBarIcon} text="Dashboard" isActive={true} />
                <Item Icon={UserIcon} text="Clients" isActive={false} />
            </ul>
        </nav>
    );
};

const Item = ({ Icon, text, isActive }) => {
    return (
        <li className="flex flex-col">
            <button className="flex flex-col items-center group">
                <Icon
                    className={`group-hover:text-white ${
                        isActive ? "text-white" : "text-slate-300"
                    } w-8 `}
                />
                <p
                    className={`text-sm group-hover:text-white ${
                        isActive ? "text-white" : "text-slate-300"
                    }`}
                >
                    {text}
                </p>
            </button>
        </li>
    );
};

export default Navbar;
