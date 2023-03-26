import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ClientsTable from "../components/ClientsTable";
import FiltersBtn from "../components/FiltersBtn";

const Clients = () => {
    return (
        <div className="flex flex-col gap-5 rounded-2xl bg-white p-4">
            <Header />
            <ClientsTable />
        </div>
    );
};

const Header = () => {
    return (
        <div className="flex justify-between gap-4">
            <div className="relative flex grow">
                <input
                    variant="text"
                    placeholder="Search"
                    className="rounded-2xl bg-slate-100 h-full w-full placeholder:text-slate-500 placeholder:text-base py-2 pr-4 pl-10"
                    id="search-input"
                />
                <MagnifyingGlassIcon
                    className="text-slate-400 absolute top-2 left-2 h-6"
                    onClick={() =>
                        document.getElementById("search-input").focus()
                    }
                />
            </div>
            <FiltersBtn />
        </div>
    );
};

export default Clients;
