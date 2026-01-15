import React from "react";
import { X } from "lucide-react";

const Modal = ({ data, onClose, children }) => {
    if (!data) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="z-10 w-full max-w-xl mx-4 bg-white animate-fadeIn">
                {/* Close Button */}
                <div className="flex justify-between items-center p-4">
                    <h2>some text</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded border text-primary border-primary hover:bg-primary hover:text-white transition"
                    >
                        <X size={18} />
                    </button>
                </div>
                {/* devider */}
                <div className="h-px bg-gray-200"></div>

                <div className="p-6">
                    {/* Content */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
