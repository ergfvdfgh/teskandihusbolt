import { useEffect, useState } from "react";

function GoonCorner() {
    const [isGoonCornerExpanded, setIsGoonCornerExpanded] = useState(() => {
        const cached = localStorage.getItem("tierTradeGame_goonCornerExpanded");
        return cached ? JSON.parse(cached) : false;
    });

    const handleToggleGoonCorner = () => {
        const newExpandedState = !isGoonCornerExpanded;
        setIsGoonCornerExpanded(newExpandedState);
        localStorage.setItem("tierTradeGame_goonCornerExpanded", JSON.stringify(newExpandedState));
    };

    return (
        <div className="fixed bottom-4 right-4 z-20 flex flex-col items-end space-y-2">
                {isGoonCornerExpanded && (
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                        <img 
                            src="/assets/catgirlim.webp" 
                            alt="" 
                            className="max-w-sm max-h-80 rounded"
                        />
                    </div>
                )}
                <button
                    onClick={handleToggleGoonCorner}
                    className="text-xl cursor-pointer underline bg-red-500 hover:bg-red-800 text-white p-4"
                >
                    <span>goon corner</span>
                </button>
            </div>
    );
}
export default GoonCorner