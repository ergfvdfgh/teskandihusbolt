export const initialState = {
    money: 10,
    items: [
        {
            id: 1,
            name: "Csrike farhát",
            buyPrice: 10,
            originalBuyPrice: 10,
            sellPrice: 15,
            originalSellPrice: 15,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 100,
        },
        {
            id: 2,
            name: "Csrike szárny",
            buyPrice: 15,
            originalBuyPrice: 15,
            sellPrice: 20,
            originalSellPrice: 20,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 150,
        },
        {
            id: 3,
            name: "Csrike comb",
            buyPrice: 25,
            originalBuyPrice: 25,
            sellPrice: 40,
            originalSellPrice: 40,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 250,
        },
        {
            id: 4,
            name: "Csrike mell",
            buyPrice: 50,
            originalBuyPrice: 50,
            sellPrice: 70,
            originalSellPrice: 70,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 500,
        },
        {
            id: 5,
            name: "Disznaly tarja",
            buyPrice: 100,
            originalBuyPrice: 100,
            sellPrice: 140,
            originalSellPrice: 140,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 1000,
        },
        {
            id: 6,
            name: "Disznaly csülök",
            buyPrice: 200,
            originalBuyPrice: 200,
            sellPrice: 280,
            originalSellPrice: 280,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 2000,
        },
        {
            id: 7,
            name: "Disznaly dagadó",
            buyPrice: 500,
            originalBuyPrice: 500,
            sellPrice: 750,
            originalSellPrice: 750,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 5000,
        },
        {
            id: 8,
            name: "Disznaly karaj",
            buyPrice: 1000,
            originalBuyPrice: 1000,
            sellPrice: 1500,
            originalSellPrice: 1500,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 10000,
        },
        {
            id: 9,
            name: "Disznaly szüzpecsenye",
            buyPrice: 2500,
            originalBuyPrice: 2500,
            sellPrice: 4300,
            originalSellPrice: 4300,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCyost: 250000,
        },
        {
            id: 10,
            name: "Marha fartő",
            buyPrice: 10000,
            originalBuyPrice: 10000,
            sellPrice: 14000,
            originalSellPrice: 14000,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 1000000,
        },
        {
            id: 11,
            name: "Marha szegy eleje",
            buyPrice: 25000,
            originalBuyPrice: 25000,
            sellPrice: 30000,
            originalSellPrice: 30000,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 2500000,
        },
        {
            id: 12,
            name: "Marha nyelv",
            buyPrice: 100000,
            originalBuyPrice: 100000,
            sellPrice: 120000,
            originalSellPrice: 120000,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 10000000,
        },
        {
            id: 13,
            name: "Marha gömbölyű felsál",
            buyPrice: 500000,
            originalBuyPrice: 500000,
            sellPrice: 530000,
            originalSellPrice: 530000,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 500000000,
        },
        {
            id: 14,
            name: "Marha tögy",
            buyPrice: 1000000,
            originalBuyPrice: 1000000,
            sellPrice: 1100000,
            originalSellPrice: 1100000,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 100000000,
        },
        {
            id: 15,
            name: "Marha köröm",
            buyPrice: 3000000,
            originalBuyPrice: 3000000,
            sellPrice: 3200000,
            originalSellPrice: 3200000,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 300000000,
        },
        {
            id: 16,
            name: "Marha szegy hátulja",
            buyPrice: 10000000,
            originalBuyPrice: 10000000,
            sellPrice: 10500000,
            originalSellPrice: 10500000,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 1000000000,
        },
        {
            id: 17,
            name: "Bika here",
            buyPrice: 1000000000,
            originalBuyPrice: 1000000000,
            sellPrice: 1200000000,
            originalSellPrice: 1200000000,
            stock: 0,
            upgradeLevel: 1,
            lastUpgradeCost: 100000000000,
        },
        // {
        //     id: 18,
        //     name: "Customers per tick",
        //     buyPrice: 10,
        //     originalBuyPrice: 10,
        //     sellPrice: 1,
        //     stock: 1,
        //     upgradeLevel: 1,
        //     lastUpgradeCost: 100,
        // },
    ],
};

export const actionTypes = {
    BUY_ITEM: "BUY_ITEM",
    SELL_ITEM: "SELL_ITEM",
    UPGRADE_ITEM: "UPGRADE_ITEM",
};

export function gameReducer(state, action) {
    switch (action.type) {
        case actionTypes.BUY_ITEM: {
            const { itemId, quantity } = action.payload;
            const item = state.items.find((i) => i.id === itemId);
            if (!item) return state;

            const totalCost = item.buyPrice * quantity;
            if (state.money < totalCost) return state;

            return {
                ...state,
                money: state.money - totalCost,
                items: state.items.map((i) =>
                    i.id === itemId ? { ...i, stock: i.stock + quantity } : i,
                ),
            };
        }

        case actionTypes.SELL_ITEM: {
            const { itemId, quantity } = action.payload;
            const item = state.items.find((i) => i.id === itemId);
            if (!item || item.stock < quantity) return state;

            const totalRevenue = item.sellPrice * quantity;

            return {
                ...state,
                money: state.money + totalRevenue,
                items: state.items.map((i) =>
                    i.id === itemId ? { ...i, stock: i.stock - quantity } : i,
                ),
            };
        }

        case actionTypes.UPGRADE_ITEM: {
            const { itemId } = action.payload;
            const item = state.items.find((i) => i.id === itemId);
            if (!item) return state;

            const upgradeCost = Math.round(item.sellPrice ** 1.1);
            if (state.money < upgradeCost) return state;

            function canUpgrade() {
                return Math.round(
                    Math.min(
                        Math.floor(item.sellPrice * 1.1),
                        Math.floor(item.originalSellPrice * 10),
                    ),
                ) == Math.round(Math.floor(item.originalSellPrice * 10)) &&
                    Math.round(
                        Math.max(
                            Math.floor(item.buyPrice * 0.95),
                            Math.floor(item.originalBuyPrice * 0.5),
                        ),
                    ) == Math.round(Math.floor(item.originalBuyPrice * 0.5))
                    ? state.money
                    : state.money - upgradeCost;
            }

            return {
                ...state,
                money: canUpgrade(),
                items: state.items.map((i) =>
                    i.id === itemId
                        ? {
                              ...i,
                              upgradeLevel:
                                  canUpgrade() == state.money
                                      ? i.upgradeLevel
                                      : i.upgradeLevel + 1,
                              buyPrice: Math.round(
                                  Math.max(
                                      Math.floor(i.buyPrice * 0.95),
                                      Math.floor(i.originalBuyPrice * 0.5),
                                  ),
                              ),
                              sellPrice: Math.round(
                                  Math.min(
                                      Math.floor(i.sellPrice * 1.1),
                                      Math.floor(i.originalSellPrice * 10),
                                  ),
                              ),
                          }
                        : i,
                ),
            };
        }

        case actionTypes.LOAD_GAME: {
            return initialState;
        }
    }
}
