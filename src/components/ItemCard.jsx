import { useState } from "react";
import { useGame } from "../context/GameContext";

export default function ItemCard({ item }) {
    const { buyItem, sellItem, upgradeItem, state } = useGame();
    const [buyQuantity, setBuyQuantity] = useState(1);
    const [sellQuantity, setSellQuantity] = useState(1);

    const handleBuy = () => {
        if (buyQuantity > 0) {
            buyItem(item.id, buyQuantity);
            setBuyQuantity(1);
        }
    };

    const handleSell = () => {
        if (sellQuantity > 0 && sellQuantity <= item.stock) {
            sellItem(item.id, sellQuantity);
            setSellQuantity(1);
        }
    };

    const handleUpgrade = () => {
        upgradeItem(item.id);
    };

    const canUpgrade = state.money >= Math.round(item.sellPrice ** 1.1);

    return (
        <div className={`border rounded-lg p-4 bg-blue-300/70`}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <span
                    className={`px-2 py-1 rounded text-xs font-bold bg-amber-400`}
                >
                    Szint: {item.upgradeLevel}
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span className="text-gray-600">Vételár:</span>
                    <span className="font-bold text-red-600">
                        {item.buyPrice} Ft
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Eladási ár:</span>
                    <span className="font-bold text-green-600">
                        {item.sellPrice} Ft
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Készlet:</span>
                    <span className="font-bold">{item.stock} db</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Profit / db:</span>
                    <span className="font-bold text-blue-600">
                        {item.sellPrice - item.buyPrice} Ft
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex space-x-2">
                    <input
                        type="number"
                        min="1"
                        value={buyQuantity}
                        onChange={(e) =>
                            setBuyQuantity(parseInt(e.target.value) || 1)
                        }
                        className="w-16 px-2 py-1 border rounded text-sm"
                    />
                    <button
                        onClick={handleBuy}
                        disabled={state.money < item.buyPrice}
                         className="flex-1 bg-red-500 hover:bg-red-600 text-white cursor-pointer py-1 px-3 rounded text-sm font-medium transition"
                    >
                        Vásárlás ({buyQuantity * item.buyPrice} Ft)
                    </button>
                </div>

                <div className="flex space-x-2">
                    <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={sellQuantity}
                        onChange={(e) =>
                            setSellQuantity(parseInt(e.target.value) || 1)
                        }
                        className="w-16 px-2 py-1 border rounded text-sm"
                    />
                    <button
                        onClick={handleSell}
                        disabled={item.stock === 0}
                         className={`flex-1 py-1 px-3 rounded text-sm font-medium transition ${
                             item.stock === 0
                                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                 : "bg-green-500 hover:bg-green-600 text-white"
                         }`}
                    >
                        Eladás (+{sellQuantity * item.sellPrice} Ft)
                    </button>
                </div>

                <button
                    onClick={handleUpgrade}
                    disabled={!canUpgrade}
                     className={`w-full py-2 px-3 rounded text-sm font-medium transition ${
                         canUpgrade
                             ? "bg-purple-500 hover:bg-purple-600 text-white"
                             : "bg-gray-300 text-gray-500 cursor-not-allowed"
                     }`}
                >
                    Upgrade ({Math.round(item.sellPrice ** 1.1)} Ft)
                </button>
            </div>
        </div>
    );
}
