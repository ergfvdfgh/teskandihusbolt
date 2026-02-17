import { GameProvider } from "./context/GameContext";
import ItemCard from "./components/ItemCard";
import { useGame } from "./context/GameContext";

function GameHeader() {
    const { state } = useGame();

    return (
        <header className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-4 rounded-b-lg shadow-lg">
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
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-3 lg:grid-cols-5">
                {/* Bal oldal: Itemek és Piac */}
                <div className="lg:col-span-4 space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Termékek
                        </h2>
                        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            {state.items.map((item) => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`border rounded-lg p-4 bg-blue-300/70`}>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold">
                                {state.customersPerTick}
                            </h3>
                        </div>
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
    );
}

function App() {
    return (
        <GameProvider>
            <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-200">
                <GameHeader />
                <MainGame />
            </div>
        </GameProvider>
    );
}

export default App;
