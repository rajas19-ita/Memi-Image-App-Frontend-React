import { useState } from "react";
import Button from "./Button";
import { IoSearch, IoFilter } from "react-icons/io5";
import ImageFilterPanel from "./ImageFilterPanel";

function ImageSearch({ filters, setFilters }) {
    const [title, setTitle] = useState("");
    const [showFilterPanel, setShowFilterPanel] = useState(false);

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            setFilters((prev) => ({ ...prev, title }));
        }
    };

    return (
        <div className="w-full max-w-md flex flex-col gap-3">
            <div className="flex gap-3 w-full items-center">
                <div className="w-full relative">
                    <input
                        type="text"
                        className="border-[1.3px] py-2 px-2 pl-9 rounded border-gray-300 w-full"
                        placeholder="Search by title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                    <IoSearch
                        className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500"
                        size={22}
                    />
                </div>
                <Button
                    outlineBtn
                    className="font-normal !py-1.5 !px-2 !text-sky-700 !border-sky-700"
                    onClick={() => setShowFilterPanel((prev) => !prev)}
                >
                    <IoFilter size={18} />
                    Filter
                </Button>
            </div>
            {showFilterPanel && (
                <ImageFilterPanel
                    filters={filters}
                    setFilters={setFilters}
                    onClose={() => setShowFilterPanel(false)}
                />
            )}
        </div>
    );
}

export default ImageSearch;
