import { GameProvider } from "./context/GameContext";
import ItemCard from "./components/ItemCard";
import { useGame } from "./context/GameContext";
import { useState, useEffect, useCallback } from "react";

function GameHeader() {
    const { state } = useGame();

    return (
        <header className="sticky top-0 bg-linear-to-r from-blue-600 to-purple-600 text-white p-4 rounded-b-lg shadow-lg">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Teskandi husbolt szimulator
                        </h1>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">
                            {new Intl.NumberFormat("hu-HU").format(state.money)}{" "}
                            Ft
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

function MainGame() {
    const { state, resetGame } = useGame();

    return (
        <>
            <div
                className={
                    "container mx-auto px-4 py-6 w-full md:w-[70%] bg-slate-600/90"
                }
            >
                <div className="grid grid-cols-3 lg:grid-cols-5">
                    {/* Bal oldal: Itemek és Piac */}
                    <div className="lg:col-span-4 space-y-6">
                        <div>
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(256px,1fr))] gap-4">
                                {state.items.map((item) => (
                                    <ItemCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={
                                "ml-4 border rounded-lg p-4 bg-blue-300/70"
                            }
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold">
                                    {state.customersPerTick}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="float-right">
                        <button
                            onClick={resetGame}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xl font-medium transition my-10 text-right"
                        >
                            Játék újraindítása
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

function App() {
    const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
    const [expandedImageUrl, setExpandedImageUrl] = useState("");
    const [isGoonCornerExpanded, setIsGoonCornerExpanded] = useState(() => {
        const cached = localStorage.getItem("tierTradeGame_goonCornerExpanded");
        return cached ? JSON.parse(cached) : false;
    });
    const [isExpandedImageLoaded, setIsExpandedImageLoaded] = useState(false);
    const [isBackgroundImageLoaded, setIsBackgroundImageLoaded] = useState(false);

    const loadBackgroundImage = useCallback(() => {
        fetch("https://api.nekosapi.com/v4/images/random?rating=safe")
            .then(response => response.json())
            .then(result => {
                const url = result[0]?.url;
                if (url) {
                    const img = new Image();
                    img.onload = () => {
                        setBackgroundImageUrl(url);
                        setIsBackgroundImageLoaded(true);
                    };
                    img.onerror = () => {
                        console.error("Failed to load background image");
                        setIsBackgroundImageLoaded(true);
                    };
                    img.src = url;
                }
            })
            .catch(error => {
                console.error("Error fetching background image:", error);
                setIsBackgroundImageLoaded(true);
            });
    }, []);

    const loadExpandedImage = useCallback(() => {
        setIsExpandedImageLoaded(false);
        setExpandedImageUrl("");
        fetch("https://api.nekosapi.com/v4/images/random?rating=safe")
            .then(response => response.json())
            .then(result => {
                const url = result[0]?.url;
                if (url) {
                    const img = new Image();
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
        loadBackgroundImage();
        
        if (isGoonCornerExpanded) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadExpandedImage();
        }
    }, [loadBackgroundImage, loadExpandedImage]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleToggleGoonCorner = () => {
        const newExpandedState = !isGoonCornerExpanded;
        setIsGoonCornerExpanded(newExpandedState);
        localStorage.setItem("tierTradeGame_goonCornerExpanded", JSON.stringify(newExpandedState));
        
        if (newExpandedState) {
            loadExpandedImage();
        } else {
            setExpandedImageUrl("");
            setIsExpandedImageLoaded(false);
        }
    };

    return (
        <GameProvider>
            <div className="relative min-h-screen bg-gray-900">
                <div
                    className="absolute inset-0 bg-contain transition-opacity duration-700"
                    style={{
                        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
                        opacity: isBackgroundImageLoaded ? 1 : 0
                    }}
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
                        className="text-xl cursor-pointer rounded-full bg-red-500 hover:bg-red-800 text-white p-4"
                    >
                        {isGoonCornerExpanded ? (
                            <span>Disable goon corner</span>
                        ) : (
                            <span>Enable goon corner</span>
                        )}
                    </button>
                </div>
            </div>
        </GameProvider>
    );
}

export default App;
