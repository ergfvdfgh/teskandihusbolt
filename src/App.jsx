import { GameProvider } from "./context/GameContext";
import ItemCard from "./components/ItemCard";
import { useGame } from "./context/GameContext";
import GoonCornerUpdater from "./components/GoonCornerUpdater";

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
                        <a className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-[20px] text-transparent bg-clip-text" target="_blank" href="https://github.com/ergfvdfgh/teskandihusbolt">Link a repohoz</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat("hu-HU").format(state.money)}{" "}
                                Ft
                            </div>
                        </div>
                        <button
                            onClick={() => {resetGame(); }}
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

function CsodbeMentel({ resetGame }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="bg-white text-black p-8 rounded-lg max-w-md mx-4 text-center">
                <h2 className="text-3xl font-bold mb-4 text-red-600">Csődbe mentél!</h2>
                <button
                    onClick={() => {resetGame(); }}
                    className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 cursor-pointer rounded text-xl font-medium transition"
                >
                    Játék újraindítása
                </button>
            </div>
        </div>
    );
}

function GameContent() {
    const { state, resetGame } = useGame();
    
    const minBuyPrice = Math.min(...state.items.map(item => item.buyPrice));
    const hasAnyStock = state.items.some(item => item.stock > 0);
    const isBankrupt = state.money < minBuyPrice && !hasAnyStock;

    return (
        <div className="relative min-h-screen bg-gray-900">

            {isBankrupt && <CsodbeMentel resetGame={resetGame} />}
            <div
                className="absolute inset-0 bg-repeat bg-[url('https://i.postimg.cc/26RXR6gp/teskandi.jpg')]"
            />
            <div className="relative z-10">
                <GameHeader />
                <MainGame />
            </div>
            <GoonCornerUpdater />
        </div>
    );
}

function App() {
    return (
        <GameProvider>
            <GameContent />
        </GameProvider>
    );
}

export default App;