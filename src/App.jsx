import { GameProvider } from "./context/GameContext";
import ItemCard from "./components/ItemCard";
import { useGame } from "./context/GameContext";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

function GameHeader() {
    const { state, resetGame } = useGame();

    return (
        <header className="sticky top-0 bg-white text-black p-4 shadow-lg">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="md:text-3xl text-xl font-bold">
                            Teskándi húsbolt szimulátor
                        </h1>
                        <a
                            className="bg-linear-to-r from-blue-600 via-green-500 to-indigo-400 inline-block md:text-[20px] text-md text-transparent bg-clip-text"
                            target="_blank"
                            href="https://github.com/ergfvdfgh/teskandihusbolt"
                        >
                            Link a repohoz
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="md:text-2xl text-lg font-bold">
                                {new Intl.NumberFormat("hu-HU").format(
                                    state.money,
                                )}{" "}
                                Ft
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                resetGame();
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 cursor-pointer rounded md:text-xl text-md font-medium transition"
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
                    <div className="grid md:grid-cols-[repeat(auto-fit,minmax(256px,1fr))]  gap-4">
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
                <h2 className="text-3xl font-bold mb-4 text-red-600">
                    Csődbe mentél!
                </h2>
                <button
                    onClick={() => {
                        resetGame();
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 cursor-pointer rounded text-xl font-medium transition"
                >
                    Játék újraindítása
                </button>
            </div>
        </div>
    );
}

function GameContent() {
    const { state, resetGame, sellItem } = useGame();

    const [open, setOpen] = useState(false);
    const [vinceHasPoppedup, setVinceHasPoppedup] = useState(false);

    const minBuyPrice = Math.min(...state.items.map((item) => item.buyPrice));
    const hasAnyStock = state.items.some((item) => item.stock > 0);
    const isBankrupt = state.money < minBuyPrice && !hasAnyStock;

    const [isGoonCornerExpanded, setIsGoonCornerExpanded] = useState(() => {
        const cached = localStorage.getItem("teskandihusbolt");
        return cached ? JSON.parse(cached) : false;
    });

    const [goonImage, setGoonImage] = useState("/assets/catgirlimg.webp");

    const getGoonImage = async () => {
        const res = await fetch("./catgirlimg.webp");
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setGoonImage(imageObjectURL);
    };

    const handleToggleGoonCorner = async () => {
        const newExpandedState = !isGoonCornerExpanded;
        setIsGoonCornerExpanded(newExpandedState);
        localStorage.setItem(
            "teskandihusbolt",
            JSON.stringify(newExpandedState),
        );
        isGoonCornerExpanded ? "" : getGoonImage();
    };
    // var stockArray = state.items.map((item) =>
    //     item.id == 18 ? item.stock : null,
    // );

    // var influence = stockArray.find((el) => el !== null);

    // console.log(influence, "influence");
    const MINUTE_MS = 450;
    var influence = 1;
    function vinceClose() {
        setOpen(false);
        setVinceHasPoppedup(true);
    }
    function placeholder() {}
    useEffect(() => {
        const interval = setInterval(() => {
            function randomSell(influence) {
                function determineSell(influence, stock, id) {
                    const qty = Math.floor(
                        // Math.random() * 1.2 * (influence / 5),
                        1,
                    );
                    qty
                        ? id != 18
                            ? stock >= 1
                                ? qty - stock < 0
                                    ? sellItem(id, qty)
                                    : sellItem(id, stock)
                                : null
                            : null
                        : null;
                }

                {
                    state.items.map((item) =>
                        determineSell(influence, item.stock, item.id),
                    );
                }
            }
            function checkVince() {
                state.money > 10000 && !vinceHasPoppedup
                    ? setOpen(true)
                    : setOpen;
            }
            randomSell(influence);
            checkVince();
            console.log(open, vinceHasPoppedup);
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [sellItem, state.items, influence, state.money, open, vinceHasPoppedup]);
    return (
        <div className="relative min-h-screen bg-gray-900">
            {isBankrupt && <CsodbeMentel resetGame={resetGame} />}
            <Dialog open={open} onClose={placeholder} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/85 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 lg:overflow-y-auto lg:mt-auto mt-75 animate-spinout">
                    <div className="flex items-end justify-center lg:p-4 p-1 text-center">
                        <DialogPanel
                            transition
                            className="p-1 relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-2xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                        >
                            <div className="bg-gray-800 lg:px-4 lg:pt-5 lg:pb-4 p-0.5 pb-1">
                                <img src="./vince.png" alt="" />
                            </div>
                            <div className="bg-gray-700/25 lg:px-4 lg:py-3 rounded-md">
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={vinceClose}
                                    className="lg:mt-3 lg:mr-80/100 inline-flex w-full justify-center rounded-md bg-white/10 lg:px-3 lg:py-2 lg:text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20"
                                >
                                    Close
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <div className="absolute inset-0 bg-repeat bg-[url('https://i.postimg.cc/26RXR6gp/teskandi.jpg')]" />
            <div className="relative z-10">
                <GameHeader />
                <MainGame />
            </div>
            <div className="fixed bottom-4 right-4 z-20 flex flex-col items-end space-y-2">
                {isGoonCornerExpanded && (
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                        <img
                            src={goonImage}
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
