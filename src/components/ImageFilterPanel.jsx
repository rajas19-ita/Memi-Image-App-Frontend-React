import Select from "react-select";
import { useMemo, useState } from "react";
import {
    HiOutlineArrowNarrowDown,
    HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import Button from "./Button";
import { useFetchUserTagsQuery } from "../store";
import { useSelector } from "react-redux";

const sortOptions = [
    { value: "date", label: "Date" },
    { value: "title", label: "Title" },
];

function ImageFilterPanel({ onClose, filters, setFilters }) {
    const user = useSelector((state) => state.user.data);
    const { data, isFetching, error } = useFetchUserTagsQuery({ user });
    const [selectedSortOption, setSelectedSortOption] = useState(
        sortOptions.find((option) => option.value === filters.sortBy)
    );
    const selectedT = useMemo(() => {
        if (filters.tagId && data) {
            return data.find((option) => option.value === filters.tagId);
        } else {
            return null;
        }
    }, [filters.tagId]);

    const [selectedTag, setSelectedTag] = useState(selectedT);
    const [order, setOrder] = useState(filters.order);

    const handleApplyFilters = () => {
        setFilters((prev) => ({
            ...prev,
            sortBy: selectedSortOption.value,
            order,
            tagId: selectedTag ? selectedTag.value : null,
        }));
    };

    return (
        <div className="w-full max-w-md flex flex-col rounded bg-gray-200">
            <div className="w-full flex gap-7 p-4 pb-5">
                <div className="flex flex-col gap-1.5">
                    <h3 className=" font-medium text-gray-700 tracking-tight">
                        Sort by
                    </h3>
                    <div className="flex gap-2">
                        <Select
                            defaultValue={selectedSortOption}
                            onChange={setSelectedSortOption}
                            options={sortOptions}
                            classNames={{
                                container: (state) => "w-24",
                            }}
                        />
                        <Button
                            className="!p-0 !gap-0"
                            onClick={() =>
                                setOrder((prev) =>
                                    prev === "desc" ? "asc" : "desc"
                                )
                            }
                        >
                            <HiOutlineArrowNarrowDown
                                size={20}
                                className={`-mr-2 ${
                                    order === "desc"
                                        ? "text-gray-800"
                                        : "text-gray-400"
                                }`}
                            />
                            <HiOutlineArrowNarrowUp
                                size={20}
                                className={`-mr-2 ${
                                    order === "asc"
                                        ? "text-gray-800"
                                        : "text-gray-400"
                                }`}
                            />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-1.5 flex-grow">
                    <h3 className=" font-medium text-gray-700">Tagged with</h3>
                    <Select
                        defaultValue={selectedTag}
                        isClearable={true}
                        onChange={setSelectedTag}
                        options={data}
                        classNames={{
                            container: (state) => "max-w-64",
                        }}
                    />
                </div>
            </div>
            <div className="flex w-full justify-between px-4 py-3 border-t border-gray-300">
                <Button
                    className="!font-normal !py-1.5"
                    primaryBtn
                    onClick={handleApplyFilters}
                >
                    Apply Filter
                </Button>
                <Button
                    className="!font-normal !text-sky-700"
                    onClick={onClose}
                >
                    close
                </Button>
            </div>
        </div>
    );
}

export default ImageFilterPanel;
