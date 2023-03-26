import { FunnelIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { Popover, Transition, Listbox } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import rangeSlider from "range-slider-input";
import "range-slider-input/dist/style.css";
import "../styles/filters-btn.css";

const FiltersBtn = () => {
    const rangeSliderContainer = useRef(null);
    const initRangeSliderValues = [20, 100];
    const [rangeSliderValues, setRangeSliderValues] = useState(
        initRangeSliderValues
    );
    const [rangeSliderTextPositions, setRangeSliderTextPositions] = useState(
        initRangeSliderValues
    );
    let rangeSliderObj = null;

    // inits range slider
    const initRangeSlider = () => {
        rangeSliderObj = rangeSlider(rangeSliderContainer.current, {
            min: 1,
            max: 100,
            value: initRangeSliderValues,
            onInput: onRangeSliderUpdate
        });

        updateRangeSliderTooltipPositions();
    };
    const updateRangeSliderTooltipPositions = () => {
        setRangeSliderTextPositions(
            [
                ...document
                    .getElementById("range-slider")
                    .querySelectorAll(".range-slider__thumb")
            ]
                // sort the obtained range-slider's to get first the one most to the left
                .sort((thumb, thumb2) => {
                    const getCalculatedLeftCSSProperty = (elem) =>
                        parseFloat(
                            window
                                .getComputedStyle(elem, null)
                                .getPropertyValue("left")
                                .replace("px", "")
                        );

                    return getCalculatedLeftCSSProperty(thumb) <
                        getCalculatedLeftCSSProperty(thumb2)
                        ? -1
                        : 0;
                })
                // returns the left properties
                .map((thumb) => thumb.style.left)
        );
    };

    const onRangeSliderUpdate = (values) => {
        setRangeSliderValues(values);
        updateRangeSliderTooltipPositions();
    };

    return (
        <Popover className="relative">
            <Popover.Button as={Fragment}>
                <Button>
                    <FunnelIcon className="h-6" />
                    <span>Filters</span>
                </Button>
            </Popover.Button>
            <Transition
                as={Fragment}
                beforeEnter={initRangeSlider}
                beforeLeave={() =>
                    rangeSliderObj &&
                    rangeSliderObj.removeGlobalEventListeners()
                }
                afterLeave={() => setRangeSliderValues(initRangeSliderValues)}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
            >
                <Popover.Panel className="flex flex-col absolute z-10 mt-2 w-80 p-4 rounded-2xl bg-white gap-4 right-0 shadow-lg">
                    <p className="text-slate-500 text-base pb-2 origin-top-right border-b-[1px] border-slate-100 border-dashed">
                        Filter Options
                    </p>

                    <div className="flex flex-col gap-4">
                        {/* range slider */}
                        <div className="flex flex-col">
                            <SectionTitle>Id</SectionTitle>
                            <div id="range-slider" ref={rangeSliderContainer} />
                            <div className="relative mb-4">
                                <p
                                    className="absolute text-base text-slate-500 top-2"
                                    style={{
                                        left: `calc(${rangeSliderTextPositions[0]} - 10px)`
                                    }}
                                >
                                    {rangeSliderValues[0]}
                                </p>
                                <p
                                    className="absolute text-base text-slate-500 top-2"
                                    style={{
                                        left: `calc(${rangeSliderTextPositions[1]} - 10px)`
                                    }}
                                >
                                    {rangeSliderValues[1]}
                                </p>
                            </div>
                        </div>

                        {/* country filter */}
                        <div className="flex flex-col gap-2">
                            <SectionTitle>Country</SectionTitle>
                            <CountrySelect />
                        </div>

                        {/* email provider */}
                        <div className="flex flex-col gap-2">
                            <SectionTitle>Email provider</SectionTitle>
                            <EmailProviderSelect />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="secondary" className="rounded-2xl">
                            Reset
                        </Button>
                        <Button className="rounded-2xl">Apply</Button>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};

const SectionTitle = ({ children }) => {
    return <p className="text-base text-slate-900 capitalize">{children}</p>;
};

const CountrySelect = () => {
    const availableCountries = [
        "Spain",
        "Ukraine",
        "Germany",
        "France",
        "Belgium"
    ];
    const [selectedCountry, setSelectedCountry] = useState();

    return (
        <Listbox
            value={selectedCountry}
            onChange={setSelectedCountry}
            className="relative"
            as="div"
        >
            <Listbox.Button className="w-full rounded-2xl bg-slate-100 py-2 px-3 text-left">
                {({ open }) =>
                    selectedCountry ? (
                        <div className="flex gap-2">
                            <div
                                style={{
                                    backgroundImage:
                                        "url('/flags/" +
                                        capitalizeString(selectedCountry) +
                                        ".ico')",
                                    backgroundSize: "160%"
                                }}
                                className="rounded-full w-6 bg-center"
                            />
                            <span className="text-slate-600 text-base">
                                {selectedCountry}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                    className={`h-5 w-5 text-gray-400 transition-all ease-in-out ${
                                        open && "rotate-180"
                                    }`}
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                    ) : (
                        <span className="text-slate-600 text-base">&nbsp;</span>
                    )
                }
            </Listbox.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
            >
                <Listbox.Options className="absolute mt-2 w-full overflow-auto rounded-xl bg-white text-base shadow-lg z-10">
                    {availableCountries.map((availableCountry) => (
                        <Listbox.Option
                            key={availableCountry}
                            value={availableCountry}
                            className={({ active }) =>
                                `relative select-none py-2 px-4 ${
                                    active
                                        ? "bg-blue-500 text-white"
                                        : "text-slate-700"
                                }`
                            }
                        >
                            {({ selected }) => (
                                <div className="flex gap-2">
                                    <div
                                        style={{
                                            backgroundImage:
                                                "url('/flags/" +
                                                capitalizeString(
                                                    availableCountry
                                                ) +
                                                ".ico')",
                                            backgroundSize: "160%"
                                        }}
                                        className="rounded-full w-6 bg-center"
                                    />
                                    <span
                                        className={`${
                                            selected
                                                ? "font-medium"
                                                : "font-normal"
                                        }`}
                                    >
                                        {availableCountry}
                                    </span>
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    );
};

const EmailProviderSelect = () => {
    const availableEmailProviders = [
        "hotmail.com",
        "gmail.com",
        "yahoo.com",
        "outlook.com"
    ];
    const [selectedEmailProvider, setSelectedEmailProvider] = useState();

    return (
        <Listbox
            value={selectedEmailProvider}
            onChange={setSelectedEmailProvider}
            className="relative"
            as="div"
        >
            <Listbox.Button className="w-full rounded-2xl bg-slate-100 py-2 px-3 text-left">
                {({ open }) =>
                    selectedEmailProvider ? (
                        <div className="flex gap-2">
                            <span className="text-slate-600 text-base">
                                {selectedEmailProvider}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                    className={`h-5 w-5 text-gray-400 transition-all ease-in-out ${
                                        open && "rotate-180"
                                    }`}
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                    ) : (
                        <span className="text-slate-600 text-base">&nbsp;</span>
                    )
                }
            </Listbox.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
            >
                <Listbox.Options className="absolute mt-2 w-full overflow-auto rounded-xl bg-white text-base shadow-lg z-10">
                    {availableEmailProviders.map((availableCountry) => (
                        <Listbox.Option
                            key={availableCountry}
                            value={availableCountry}
                            className={({ active }) =>
                                `relative select-none py-2 px-4 ${
                                    active
                                        ? "bg-blue-500 text-white"
                                        : "text-slate-700"
                                }`
                            }
                        >
                            {({ selected }) => (
                                <span
                                    className={`${
                                        selected ? "font-medium" : "font-normal"
                                    }`}
                                >
                                    {availableCountry}
                                </span>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    );
};

function capitalizeString(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export default FiltersBtn;
