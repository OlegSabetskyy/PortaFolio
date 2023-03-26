import { useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel
} from "@tanstack/react-table";
import { tableData } from "../data/TableData";
import Checkbox from "./Checkbox";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    EyeIcon,
    TrashIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import Button from "./Button";
import Drawer from "./Drawer";

const ClientsTable = () => {
    const [data, setData] = useState(() => [...tableData]);
    const [currentDataOnDisplay, setCurrentDataOnDisplay] = useState(data[0]);
    const [sorting, setSorting] = useState([]);
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor("select", {
            header: ({ table }) => (
                <Checkbox
                    {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler()
                    }}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    {...{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler()
                    }}
                />
            ),
            enableSorting: false
        }),
        ...["id", "name", "surname", "email", "country", "phone"].map((item) =>
            columnHelper.accessor(item.toString(), {
                header: (row) => <HeaderWrapper>{row.header.id}</HeaderWrapper>,
                cell: (row) => <span>{row.getValue()}</span>
            })
        ),
        columnHelper.accessor("details", {
            header: () => "",
            cell: ({ row }) => (
                <Button
                    variant="secondary"
                    className={
                        "flex items-center justify-center w-8 aspect-square rounded-lg !p-0"
                    }
                    onClick={() => {
                        setCurrentDataOnDisplay(row.original);
                        setDrawerDetailsIsOpen(true);
                    }}
                >
                    <EyeIcon className="w-4 aspect-square" />
                </Button>
            )
        }),
        columnHelper.accessor("delete", {
            header: () => "",
            cell: () => (
                <Button
                    variant="delete-secondary"
                    className={
                        "flex items-center justify-center w-8 aspect-square rounded-lg !p-0"
                    }
                >
                    <TrashIcon className="w-4 aspect-square" />
                </Button>
            )
        })
    ];
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });
    const [drawerDetailsIsOpen, setDrawerDetailsIsOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            {/* table header */}
            <div className="flex border-b-[1px] border-slate-100 border-dashed pb-3.5">
                {table.getHeaderGroups().map((headerGroup) => (
                    <div
                        key={headerGroup.id}
                        className="flex flex-grow gap-5 space-between"
                    >
                        {headerGroup.headers.map((header) => (
                            <div
                                key={header.id}
                                className={`flex ${
                                    headerClassNamesPerColumn[header.id] || ""
                                }
                                    `}
                            >
                                <div
                                    className={`flex select-none
                                            ${
                                                header.column.getCanSort()
                                                    ? "cursor-pointer justify-between items-center gap-4"
                                                    : ""
                                            }
                                            `}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}

                                    {getSortIcon(header.column.getIsSorted())}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* table body */}
            <div className="flex flex-col gap-5">
                {table.getRowModel().rows.map((row) => (
                    <div className="flex gap-5" key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <div
                                key={cell.id}
                                className={`flex ${
                                    headerClassNamesPerColumn[
                                        cell.id.split("_")[1]
                                    ] || ""
                                }
                                    `}
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* pagination */}
            <div className="flex gap-4 justify-center pt-2">
                {Array.from({ length: table.getPageCount() }, (_, index) => (
                    <Button
                        onClick={() => table.setPageIndex(index)}
                        className={"rounded-lg w-8 h-8 p-0 flex justify-center"}
                        key={index}
                        variant={
                            table.getState().pagination.pageIndex == index
                                ? "primary"
                                : "secondary"
                        }
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
            <DrawerDetails
                isOpen={drawerDetailsIsOpen}
                onClose={() => setDrawerDetailsIsOpen(false)}
                details={currentDataOnDisplay}
            />
        </div>
    );
};

const DrawerDetails = ({ isOpen, onClose, details }) => {
    return (
        <Drawer isOpen={isOpen} position="bottom" onClose={onClose}>
            <div className="rounded-tl-2xl rounded-tr-2xl bg-white flex flex-col p-4 h-full gap-2">
                <button
                    className="self-end text-slate-500 hover:text-slate-800 focus:text-slate-800"
                    onClick={onClose}
                >
                    <XMarkIcon className="w-8 h-8" />
                </button>

                <div className="flex flex-col gap-5 flex-grow overflow-y-auto">
                    {Object.entries(details).map(
                        ([key, value], index, array) => (
                            <div
                                key={index}
                                className={`flex flex-col gap-2 pb-4 ${
                                    index != array.length - 1 &&
                                    "border-b-[1px] border-slate-100 border-dashed"
                                }`}
                            >
                                <p className="text-slate-400 text-base capitalize">
                                    {key}
                                </p>
                                <p className="text-slate-900 text-base">
                                    {value}
                                </p>
                            </div>
                        )
                    )}
                </div>

                <Button
                    variant="delete"
                    className={"py-4 flex justify-center text-base"}
                >
                    Delete
                </Button>
            </div>
        </Drawer>
    );
};

const getSortIcon = (direction) => {
    const classes = "w-3 text-slate-300";
    switch (direction) {
        case "asc":
            return <ChevronUpIcon className={classes} />;
        case "desc":
            return <ChevronDownIcon className={classes} />;
    }
};

const HeaderWrapper = ({ children, className: extraClassNames }) => {
    return (
        <span
            className={`flex uppercase text-slate-400 font-normal ${extraClassNames}`}
        >
            {children}
        </span>
    );
};

const headerClassNamesPerColumn = {
    id: "w-10",
    name: "w-20",
    surname: "w-36 hidden min-[450px]:flex",
    email: "w-56 hidden min-[700px]:flex",
    country: "w-24 hidden min-[900px]:flex",
    phone: "w-32 hidden min-[1000px]:flex",
    delete: "hidden flex-grow justify-end min-[1000px]:flex",
    details: "flex flex-grow justify-end min-[1000px]:hidden"
};

export default ClientsTable;
