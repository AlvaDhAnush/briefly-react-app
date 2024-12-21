/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./FilterSearch.css"; // Include CSS for styling

const FilterSearch = ({ handleSearchFunction, filterHandler }) => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        searchIn: 'title,content', // Restrict search to specific fields (optional)
        from: '2024-12-20',    // Articles from this date (optional)
        to: '2024-12-21',      // Articles to this date (optional)
        language: 'en',        // Language of the articles
        sortBy: 'publishedAt', // Sort by relevancy, popularity, or publishedAt
        pageSize: '18',        // Number of results per page (default 20)
        page: '1',             // Page number
        apiKey: import.meta.env.VITE_NEWSAPI_API_KEY,         // Your API key
        categories: [],
        sources: [],
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(""); // To track which filter section is open
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const categoriesOptions = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology"
    ];
    const sourcesOptions = ["abc-news", "bbc-news", "bbc-sport", 'CBC News', 'cnn', 'der-tagesspiegel'];

    // Debounce logic: Update `debouncedSearch` after 500ms of inactivity
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(handler); // Clear timeout on component unmount or when `search` changes
        };
    }, [search]);

    // Trigger API call whenever `debouncedSearch` changes
    useEffect(() => {
        if (debouncedSearch.trim()) {
            handleSearch();
        }
    }, [debouncedSearch]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFilters((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter((item) => item !== value),
            }));
        } else {
            setFilters((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    console.log(filters,'uuu')
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleFilterSection = (section) => {
        setActiveFilter((prev) => (prev === section ? "" : section));
    };

    const handleSearch = async () => {
        handleSearchFunction(search)
    };


    const handleApplyFilter = () => {
        filterHandler(filters)
    }

    return (
        <div className="container">
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    //   value={search}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="search-input"
                />
                <button onClick={toggleModal} className="text-white rounded-lg px-5 py-2 bg-black">
                    Filter
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-overlay" onClick={toggleModal}></div>
                    <div className="modal-sidebar">
                        <button className="close-btn" onClick={toggleModal}>
                            &times;
                        </button>
                        <div className="filter-sections">
                            {/* Start Date & End Date */}
                            <div className="filter-section">
                                <button
                                    className="filter-toggle font-roboto"
                                    onClick={() => toggleFilterSection("dates")}
                                >
                                    Start Date & End Date
                                </button>
                                {activeFilter === "dates" && (
                                    <div className="filter-content">
                                        <label className="font-roboto">Start Date:</label>
                                        <input
                                            type="date"
                                            name="from"
                                            value={filters.from}
                                            onChange={handleFilterChange}
                                            className="date-picker"
                                        />
                                        <label className="font-roboto">End Date:</label>
                                        <input
                                            type="date"
                                            name="to"
                                            value={filters.to}
                                            onChange={handleFilterChange}
                                            className="date-picker"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Categories */}
                            <div className="filter-section">
                                <button
                                    className="filter-toggle font-roboto"
                                    onClick={() => toggleFilterSection("categories")}
                                >
                                    Categories
                                </button>
                                {activeFilter === "categories" && (
                                    <div className="filter-content">
                                        {categoriesOptions.map((category) => (
                                            <div key={category} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="categories"
                                                    value={category}
                                                    id={category}
                                                    checked={filters.categories.includes(category)}
                                                    onChange={handleFilterChange}
                                                />
                                                <label htmlFor={category} className="ml-2 font-roboto">{category}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sources */}
                            <div className="filter-section">
                                <button
                                    className="filter-toggle font-roboto"
                                    onClick={() => toggleFilterSection("sources")}
                                >
                                    Sources
                                </button>
                                {activeFilter === "sources" && (
                                    <div className="filter-content">
                                        {sourcesOptions.map((source) => (
                                            <div key={source} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="sources"
                                                    value={source}
                                                    id={source}
                                                    checked={filters.sources.includes(source)}
                                                    onChange={handleFilterChange}
                                                />
                                                <label htmlFor={source} className="font-roboto ml-3">{source}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="w-full flex justify-center">
                                <button onClick={() => handleApplyFilter()} className="w-[50%] p-2 rounded-lg bg-black text-white">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterSearch;
