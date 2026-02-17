import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, gameReducer, actionTypes } from "./gameReducer";

const GameContext = createContext();

export function GameProvider({ children }) {
    const [state, dispatch] = useReducer(gameReducer, initialState, () => {
        const saved = localStorage.getItem("tierTradeGame");
        return saved ? JSON.parse(saved) : initialState;
    });

    useEffect(() => {
        localStorage.setItem("tierTradeGame", JSON.stringify(state));
    }, [state]);

    const buyItem = (itemId, quantity) => {
        dispatch({ type: actionTypes.BUY_ITEM, payload: { itemId, quantity } });
    };

    const sellItem = (itemId, quantity) => {
        dispatch({
            type: actionTypes.SELL_ITEM,
            payload: { itemId, quantity },
        });
    };

    const upgradeItem = (itemId) => {
        dispatch({ type: actionTypes.UPGRADE_ITEM, payload: { itemId } });
    };

    const updateCell = (row, col, value, formula = "") => {
        dispatch({
            type: actionTypes.UPDATE_CELL,
            payload: { row, col, value, formula },
        });
    };

    const resetGame = () => {
        dispatch({ type: actionTypes.LOAD_GAME, payload: { initialState } });
    };

    const value = {
        state,
        buyItem,
        sellItem,
        upgradeItem,
        updateCell,
        resetGame,
    };

    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    );
}
/* eslint-disable-next-line react-refresh/only-export-components */
export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within GameProvider");
    }
    return context;
}
