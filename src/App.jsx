import { GameProvider } from "./context/GameContext";
import ItemCard from "./components/ItemCard";
import { useGame } from "./context/GameContext";
import { useState, useEffect } from "react";

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
                    "container mx-auto px-4 py-6 w-[70%] bg-slate-600/90"
                }
            >
                <div className="grid grid-cols-3 lg:grid-cols-5">
                    {/* Bal oldal: Itemek és Piac */}
                    <div className="lg:col-span-4 space-y-6">
                        <div>
                            <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
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
    const [jsonData, setJsonData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://api.nekosapi.com/v4/images/random?rating=safe",
                );
                const result = await response.json();
                setJsonData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const catGirl = jsonData ? (
        jsonData[0].url
    ) : (
        <span>Loading catgirl...</span>
    );

    const [expCatGirl, setExpCatGirl] = useState("");

    const getExpCatGirl = useEffect(() => {
        const fetchExpCatGirl = async () => {
            try {
                const response = await fetch(
                    "https://api.nekosapi.com/v4/images/random?rating=safe",
                );
                const result = await response.json();
                setExpCatGirl(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchExpCatGirl();
    }, []);

    console.log(
        expCatGirl ? expCatGirl[0].url : <span>Loading catgirl...</span>,
    );
    console.log(getExpCatGirl);

    const handleClick = () => {
        expCatGirl === ""
            ? (getExpCatGirl(), console.log("set"))
            : (setExpCatGirl(""), console.log("unset"));
    };
    return (
        <GameProvider>
            <div
                className={"min-h-screen bg-contain"}
                style={{ backgroundImage: `url(${catGirl})` }}
            >
                <div>
                    <button
                        onClick={handleClick}
                        className="text-xl rounded-full bg-red-500 hover:bg-red-800"
                    >
                        {expCatGirl ? (
                            <span className="p-5">Disable goon corner</span>
                        ) : (
                            <span className="p-5">Enable goon corner</span>
                        )}
                    </button>
                </div>
                {expCatGirl ? <img src={expCatGirl[0].url} alt="" /> : "asd"}
                <GameHeader />
                <MainGame />
            </div>
        </GameProvider>
    );
}

export default App;
