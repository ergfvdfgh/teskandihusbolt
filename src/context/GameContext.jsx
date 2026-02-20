import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, gameReducer, actionTypes } from "./gameReducer";
import useSound from "../hooks/useSound";
import { SOUNDS } from "../constants/sounds";

const GameContext = createContext();

export function GameProvider({ children }) {
    const [state, dispatch] = useReducer(gameReducer, initialState, () => {
        const saved = localStorage.getItem("teskandihusbolt");
        if (!saved) return initialState;
        const parsed = JSON.parse(saved);
        // Migrate items to have originalBuyPrice if missing
        if (parsed.items && Array.isArray(parsed.items)) {
            parsed.items = parsed.items.map((item) => ({
                ...item,
                originalBuyPrice: item.originalBuyPrice || item.buyPrice,
            }));
        }
        return parsed;
    });
    const playMoneySound = useSound(SOUNDS.PENZ);

    useEffect(() => {
        localStorage.setItem("teskandihusbolt", JSON.stringify(state));
    }, [state]);

    const buyItem = (itemId, quantity) => {
        dispatch({ type: actionTypes.BUY_ITEM, payload: { itemId, quantity } });
    };

    const sellItem = (itemId, quantity) => {
        dispatch({
            type: actionTypes.SELL_ITEM,
            payload: { itemId, quantity },
        });
        playMoneySound();
    };

    const upgradeItem = (itemId) => {
        dispatch({ type: actionTypes.UPGRADE_ITEM, payload: { itemId } });
    };

    const resetGame = () => {
        dispatch({ type: actionTypes.LOAD_GAME, payload: { initialState } });
    };

    const value = {
        state,
        buyItem,
        sellItem,
        upgradeItem,
        resetGame,
    };

    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    );
}
/* eslint-disable-next-line react-refresh/only-export-components */
export function useGame() {
    const context = useContext(GameContext);
    return context;
}
