import { GameProvider } from "./context/GameContext";
import ItemCard from "./components/ItemCard";
import { useGame } from "./context/GameContext";
import { useState, useEffect, useCallback, useRef } from "react";

function GameHeader() {
    const { state, resetGame } = useGame();

    return (
        <header className="sticky top-0 bg-white text-black p-4 shadow-lg">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Teskándi húsbolt szimulátor
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat("hu-HU").format(state.money)}{" "}
                                Ft
                            </div>
                        </div>
                        <button
                            onClick={resetGame}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 cursor-pointer rounded text-xl font-medium transition"
                        >
                            Játék újraindítása
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

function MainGame() {
    const { state } = useGame();

    return (
        <>
            <div
                className={
                    "container mx-auto px-4 py-6 w-full md:w-[70%] bg-slate-600/90"
                }
            >
                <div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(256px,1fr))] gap-4">
                        {state.items.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function App() {
    const [expandedImageUrl, setExpandedImageUrl] = useState("");
    const [isGoonCornerExpanded, setIsGoonCornerExpanded] = useState(() => {
        const cached = localStorage.getItem("tierTradeGame_goonCornerExpanded");
        return cached ? JSON.parse(cached) : false;
    });
    const [isExpandedImageLoaded, setIsExpandedImageLoaded] = useState(false);
    const hasFetchedExpandedImage = useRef(false);



    const loadExpandedImage = useCallback(() => {
        if (hasFetchedExpandedImage.current) {
            return;
        }
        hasFetchedExpandedImage.current = true;
        setIsExpandedImageLoaded(false);
        console.log(fetch("/v4/images/random?rating=suggestive"))
        fetch("/v4/images/random?rating=suggestive")
            .then(response => response.json())
            .then(result => {
                const url = result[0]?.url;
                if (url) {
                    const img = new Image();
                    console.log(url.blob())
                    img.onload = () => {
                        setExpandedImageUrl(url);
                        setIsExpandedImageLoaded(true);
                    };
                    img.onerror = () => {
                        console.error("Failed to load expanded image");
                        setIsExpandedImageLoaded(true);
                    };
                    img.src = url;
                }
            })
            
            .catch(error => {
                console.error("Error fetching expanded image:", error);
                setIsExpandedImageLoaded(true);
            });
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadExpandedImage();
    }, [loadExpandedImage]);

    const handleToggleGoonCorner = () => {
        const newExpandedState = !isGoonCornerExpanded;
        setIsGoonCornerExpanded(newExpandedState);
        localStorage.setItem("tierTradeGame_goonCornerExpanded", JSON.stringify(newExpandedState));
    };

    const isLoading = isGoonCornerExpanded && !isExpandedImageLoaded;

    return (
        <GameProvider>
            <div className="relative min-h-screen bg-gray-900">
                {isLoading && (
                    <div className="fixed inset-0 z-50 bg-gray-900">
                    </div>
                )}
                <div
                    className="absolute inset-0 bg-repeat bg-[url('https://i.postimg.cc/26RXR6gp/teskandi.jpg')]"
                />
                <div className="relative z-10">
                    <GameHeader />
                    <MainGame />
                </div>
                <div className="fixed bottom-4 right-4 z-20 flex flex-col items-end space-y-2">
                    {isGoonCornerExpanded && (
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                            <img 
                                src={expandedImageUrl || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"} 
                                alt="" 
                                className="transition-opacity duration-500 max-w-sm max-h-80 rounded"
                                style={{ opacity: isExpandedImageLoaded ? 1 : 0 }}
                                onLoad={() => setIsExpandedImageLoaded(true)}
                                onError={() => setIsExpandedImageLoaded(true)}
                            />
                            {!isExpandedImageLoaded && expandedImageUrl && (
                                <span className="text-white">Loading...</span>
                            )}
                        </div>
                    )}
                    <button
                        onClick={handleToggleGoonCorner}
                        className="text-xl cursor-pointer underline bg-red-500 hover:bg-red-800 text-white p-4"
                    >
                        <span>goon corner</span>
                    </button>
                </div>
            </div>
        </GameProvider>
    );
}

export default App;