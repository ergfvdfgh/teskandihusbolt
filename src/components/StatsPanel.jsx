import { useGame } from "../context/GameContext";

export default function StatsPanel() {
    const { state } = useGame();
    const { money, items, day } = state;

    const mostProfitableItem = items.reduce(
        (best, item) => {
            const profit = item.sellPrice - item.buyPrice;
            return profit > best.profit ? { name: item.name, profit } : best;
        },
        { name: "", profit: 0 },
    );

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("hu-HU").format(amount) + " Ft";
    };

    const calculateEfficiency = () => {
        if (totalItemsBought === 0) return 0;
        return Math.round((totalItemsSold / totalItemsBought) * 100);
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Statisztikák
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-lg p-4">
                    <div className="text-gray-600 text-sm mb-1">
                        Napok száma
                    </div>
                    <div className="text-3xl font-bold text-green-700">
                        {day}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border border-blue-200 rounded-lg p-4">
                    <div className="text-gray-600 text-sm mb-1">
                        Tranzakciók
                    </div>
                    <div className="text-3xl font-bold text-blue-700">
                        {totalTransactions}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 rounded-lg p-4">
                    <div className="text-gray-600 text-sm mb-1">
                        Eladott termékek
                    </div>
                    <div className="text-3xl font-bold text-purple-700">
                        {totalItemsSold}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-100 border border-yellow-200 rounded-lg p-4">
                    <div className="text-gray-600 text-sm mb-1">
                        Vásárolt termékek
                    </div>
                    <div className="text-3xl font-bold text-yellow-700">
                        {totalItemsBought}
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-3">
                    Teljesítmény mutatók
                </h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Hatékonyság</span>
                            <span className="font-bold">
                                {calculateEfficiency()}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{
                                    width: `${Math.min(calculateEfficiency(), 100)}%`,
                                }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Eladott / vásárolt termékek aránya
                        </p>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Fejlesztések</span>
                            <span className="font-bold">{totalUpgrades}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{
                                    width: `${Math.min(totalUpgrades * 10, 100)}%`,
                                }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Teljesített fejlesztések száma
                        </p>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Profit / nap</span>
                            <span className="font-bold">
                                {formatCurrency(money / day)}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{
                                    width: `${Math.min(money / day / 100, 100)}%`,
                                }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Átlagos napi profit
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-700 mb-2">Legjobb termék</h3>
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                        💰
                    </div>
                    <div className="ml-4">
                        <div className="font-bold text-lg">
                            {mostProfitableItem.name || "Nincs adat"}
                        </div>
                        <div className="text-gray-600">
                            Profit / db:{" "}
                            <span className="font-bold text-green-600">
                                {mostProfitableItem.profit} Ft
                            </span>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-700 mt-3">
                    {mostProfitableItem.name
                        ? `A(z) ${mostProfitableItem.name} termék hozza a legnagyobb profitot termékenként.`
                        : "Még nincs eladás, így nem tudjuk melyik a legjobb termék."}
                </p>
            </div>

            <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-2">Játék tippek</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Vásárolj alacsony áron, add el magas áron!</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2">📈</span>
                        <span>Figyeld a piaci keresletet és inflációt!</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-purple-500 mr-2">⚡</span>
                        <span>Fejleszd az itemeket a profit növelésére!</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">📊</span>
                        <span>Használd a spreadsheetet a számításokhoz!</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
