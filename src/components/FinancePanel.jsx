import { useGame } from '../context/GameContext';

export default function FinancePanel() {
  const { state, resetGame } = useGame();
  const { money, items, history } = state;

  const totalInventoryValue = items.reduce((sum, item) => sum + (item.stock * item.buyPrice), 0);
  const totalNetWorth = money + totalInventoryValue;
  const totalProfit = history
    .filter(h => h.type === 'SELL')
    .reduce((sum, h) => sum + h.revenue, 0);
  
  const recentHistory = history.slice(-5).reverse();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('hu-HU').format(amount) + ' Ft';
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Pénzügyek</h2>
        <button
          onClick={resetGame}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded text-sm font-medium transition"
        >
          Játék újrakezdése
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-gray-600 text-sm mb-1">Készpénz</div>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(money)}</div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-gray-600 text-sm mb-1">Teljes vagyon</div>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalNetWorth)}</div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-gray-600 text-sm mb-1">Készlet érték</div>
          <div className="text-2xl font-bold text-yellow-600">{formatCurrency(totalInventoryValue)}</div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-gray-600 text-sm mb-1">Összes profit</div>
          <div className="text-2xl font-bold text-purple-600">{formatCurrency(totalProfit)}</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-3">Készlet összegzés</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  item.tier === 1 ? 'bg-green-500' :
                  item.tier === 2 ? 'bg-blue-500' :
                  item.tier === 3 ? 'bg-purple-500' :
                  item.tier === 4 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="flex space-x-4">
                <span className="text-gray-600">{item.stock} db</span>
                <span className="font-bold">
                  {formatCurrency(item.stock * item.buyPrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-800 mb-3">Legutóbbi tranzakciók</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {recentHistory.length === 0 ? (
            <p className="text-gray-500 text-sm italic">Még nincsenek tranzakciók.</p>
          ) : (
            recentHistory.map((entry, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div className="flex items-center">
                  <span className={`mr-2 ${
                    entry.type === 'BUY' ? 'text-red-500' :
                    entry.type === 'SELL' ? 'text-green-500' :
                    entry.type === 'UPGRADE' ? 'text-purple-500' : 'text-blue-500'
                  }`}>
                    {entry.type === 'BUY' ? '🛒' :
                     entry.type === 'SELL' ? '💰' :
                     entry.type === 'UPGRADE' ? '⚡' : '📅'}
                  </span>
                  <div>
                    <div className="font-medium text-sm">
                      {entry.type === 'BUY' ? `Vásárlás: ${entry.item}` :
                       entry.type === 'SELL' ? `Eladás: ${entry.item}` :
                       entry.type === 'UPGRADE' ? `Upgrade: ${entry.item} (${entry.level}. szint)` :
                       `Nap ${entry.day}`}
                    </div>
                    <div className="text-xs text-gray-500">Nap {entry.day}</div>
                  </div>
                </div>
                <div className={`font-bold ${
                  entry.type === 'BUY' ? 'text-red-600' :
                  entry.type === 'SELL' ? 'text-green-600' :
                  entry.type === 'UPGRADE' ? 'text-purple-600' : 'text-blue-600'
                }`}>
                  {entry.type === 'BUY' ? `-${entry.cost} Ft` :
                   entry.type === 'SELL' ? `+${entry.revenue} Ft` :
                   entry.type === 'UPGRADE' ? `-${entry.cost} Ft` : ''}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}