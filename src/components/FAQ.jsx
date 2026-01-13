"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ = ({ data = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {data.map((item, index) => {
                const isOpen = activeIndex === index;

                return (
                    <div
                        key={index}
                        className={`bg-white rounded-xl shadow-md transition-all duration-300 ${isOpen ? "row-span-2" : ""
                            }`}
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between px-6 py-5 text-left"
                        >
                            <span className="font-medium text-gray-800">
                                {item.question}
                            </span>
                            {isOpen ? (
                                <Minus className="w-5 h-5 text-emerald-500" />
                            ) : (
                                <Plus className="w-5 h-5 text-gray-500" />
                            )}
                        </button>

                        {isOpen && (
                            <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">
                                {item.answer}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default FAQ;
