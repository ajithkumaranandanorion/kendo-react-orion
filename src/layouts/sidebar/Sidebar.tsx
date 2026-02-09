
import React, { useState } from "react";
import { useSelectedKendo } from "../../features/KendoContext";

export const kendoSidebarfieldList: any = {
    dataGrid: ["simple", "selectable", "filtering", "pagination", "sorting", "editing", "inline editing",
        "dialog Editing", "external form", "exporting", "grouping", "agg grouping", "column row"],
    treeList: ["tree list", "pagination list", "tree Editing"]
};

function Sidebar() {
    const { setSelectedKendo } = useSelectedKendo();
    const [expandHeader, setExpandHeader] = useState<string | null>(null);
    const [selectedChild, setSelectedChild] = useState<any>({
        dataGrid: "simple", treeList: "tree list"
    });

    const handleSelect = (headerVal: string, selected: string) => {
        setSelectedKendo(selected);
        setSelectedChild((prev: any) => {
            return {
                ...prev, [headerVal]: selected
            }
        })
    }

    const handleToggle = (item: string) => {
        setExpandHeader(prev => prev === item ? null : item);
        const showPage = selectedChild[item];
        setSelectedKendo(showPage);
    }

    const capitalizeFirst = (str: string) =>
        !Array.isArray(str) && str ? str.split(" ").map((strItem: string) => {
            return strItem.charAt(0).toUpperCase() + strItem.slice(1) + " "
        }) : ""

    return (
        <div className="relative top-2">
            <ul role="listbox" className="absolute flex flex-col gap-1">
                {Object.keys(kendoSidebarfieldList).map((header, i) => (
                    <React.Fragment key={i}>
                        {/* Header */}
                        <li role="presentation">
                            <button
                                type="button"
                                role="option"
                                aria-selected={expandHeader === header}
                                onClick={() => handleToggle(header)}
                                className={`block w-[9rem] text-left p-1 mb-1 cursor-pointer 
              focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm
              ${expandHeader === header
                                        ? "bg-blue-700 text-white"
                                        : "bg-transparent hover:bg-blue-50 hover:text-black"
                                    }`}
                            >
                                {/* Chevron icon */}
                                <svg
                                    className={`inline ml-2 h-4 w-4 transform transition-transform duration-200 ease-out
                  ${expandHeader === header ? "rotate-90" : "rotate-0"}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 
                     1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {capitalizeFirst(header)}
                            </button>
                        </li>

                        {/* Sub items */}
                        {expandHeader === header && Object.values(kendoSidebarfieldList[header]).map((itemValue, i) => (
                            <li key={i} role="list">
                                <button
                                    type="button"
                                    role="option"
                                    // aria-selected={selectedChild === itemValue}
                                    onClick={() => handleSelect(header, itemValue as string)}
                                    className={`block w-[7rem] text-left p-1 ml-8 mb-1 p-0 cursor-pointer 
                  focus:ring-1 focus:ring-blue-400 rounded-sm  
                  ${selectedChild[`${header}`] === itemValue
                                            ? "bg-blue-700 text-white"
                                            : "bg-transparent hover:bg-blue-50 hover:text-black"
                                        }`}
                                >
                                    {capitalizeFirst(itemValue as string)}
                                </button>
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar

