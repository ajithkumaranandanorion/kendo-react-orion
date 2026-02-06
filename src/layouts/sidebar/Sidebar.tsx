
import { useSelectedKendo } from "../../features/KendoContext";

export const kendoSidebarfieldList = ["simple", "selectable", "filtering", "pagination", "sorting", "editing", "inline editing", "dialog Editing", "external form", "exporting", "grouping", "agg grouping","column row","tree list"];

function Sidebar() {
    const { selectedKendo, setSelectedKendo } = useSelectedKendo();

    const handleSelect = (selected: string) => {
        setSelectedKendo(selected);
    }
    const capitalizeFirst = (str: string) =>
        str ? str.split(" ").map((strItem: string) => {
            return strItem.charAt(0).toUpperCase() + strItem.slice(1) + " "
        }) : ""
    return (
        <div className="relative top-2">
            <ul role="listbox" className="absolute flex flex-col gap-1">
                {kendoSidebarfieldList.map((item: string) => (
                    <li key={item} role="presentation">
                        <button
                            type="button"
                            role="option"
                            aria-selected={selectedKendo === item}
                            onClick={() => handleSelect(item)}
                            className={`block w-[9rem] text-left p-1 mb-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm 
            ${selectedKendo === item ? "bg-blue-700 text-white" : "bg-transparent hover:bg-blue-50 hover:text-black"}`}
                        >
                            {capitalizeFirst(item)}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
