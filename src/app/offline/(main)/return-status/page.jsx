// ========================================================
// FILE 1: ReturnStatus.jsx (Server Component - Optional)
// ========================================================
import { RotateCcw } from "lucide-react";
import ReturnStatus from "./ReturnStatus";

const ReturnStatusPage = () => {
    return <>
        <div className="flex items-center gap-3 mb-4">
            {/* Icon */}
            <div className="bg-blue-600 md:p-3 p-2 shadow-lg rounded-2xl flex items-center justify-center">
                <RotateCcw className="text-white w-8 h-8" />
            </div>

            {/* Text */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Return Status</h1>
                <p className="text-gray-600 md:text-md text-sm">
                    View and update return status for your products.
                </p>
            </div>
        </div>
        <ReturnStatus />;
    </>
};

export default ReturnStatusPage;

