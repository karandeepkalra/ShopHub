
import React, { useState } from "react";
import { ChevronDown, Search, Heart, ShoppingCart, MapPin, User } from "lucide-react";

const CustomDropdown = ({ options, selectedValue, onSelect, icon, className, dropdownClassName, showSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOptions = showSearch
        ? options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
        : options;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 ${className}`}
            >
                {icon}
                <span className="font-medium truncate flex-1">
                    {selectedValue}
                </span>

                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className={`absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 ${dropdownClassName}`}>
                        {showSearch && (
                            <div className="p-2 border-b border-gray-200">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}
                        <div className="max-h-64 overflow-y-auto">
                            {filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        onSelect(option);
                                        setIsOpen(false);
                                        setSearchTerm("");
                                    }}
                                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${selectedValue === option ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'
                                        }`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default CustomDropdown;