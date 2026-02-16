import { useGame } from '../context/GameContext';

const upgradePaths = {
  1: [
    { from: 'Alma', to: 'Alma Level 2', cost: 100, benefit: 'Árcsökkenés 5%' },
    { from: 'Körte', to: 'Körte Level 2', cost: 100, benefit: 'Árnövekedés 10%' },
  ],
  2: [
    { from: 'Banán', to: 'Banán Level 2', cost: 200, benefit: 'Árcsökkenés 5%' },
    { from: 'Szilva', to: 'Szilva Level 2', cost: 200, benefit: 'Árnövekedés 10%' },
  ],
  3: [
    { from: 'Eper', to: 'Eper Level 2', cost: 300, benefit: 'Árcsökkenés 5%' },
    { from: 'Eper Level 2', to: 'Eper Level 3', cost: 500, benefit: 'Árnövekedés 15%' },
  ],
};

export default function UpgradePanel() {
  const { state, upgradeItem } = useGame();
  const { items, money } = state;

  const getUpgradeCost = (item) => {
    return 100 * (item.upgradeLevel + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Fejlesztések</h2>
      
      <div className="mb-6">
        <h3 className="font-bold text-gray-700 mb-3">Item fejlesztések</h3>
        <div className="space-y-3">
          {items.map((item) => {
            const upgradeCost = getUpgradeCost(item);
            const canUpgrade = money >= upgradeCost;
            
            return (
              <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      item.tier === 1 ? 'bg-green-500' :
                      item.tier === 2 ? 'bg-blue-500' :
                      item.tier === 3 ? 'bg-purple-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="font-bold">{item.name}</span>
                    <span className="ml-2 text-sm text-gray-600">(Tier {item.tier})</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Jelenlegi szint:</span>
                    <span className="font-bold ml-1">{item.upgradeLevel}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm text-gray-600">
                    Vételár: <span className="font-bold">{item.buyPrice} Ft</span> → 
                    <span className="font-bold text-green-600 ml-1">
                      {Math.floor(item.buyPrice * 0.95)} Ft
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Eladási ár: <span className="font-bold">{item.sellPrice} Ft</span> → 
                    <span className="font-bold text-green-600 ml-1">
                      {Math.floor(item.sellPrice * 1.1)} Ft
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-600">Következő szint költsége:</span>
                    <span className={`ml-2 font-bold ${canUpgrade ? 'text-green-600' : 'text-red-600'}`}>
                      {upgradeCost} Ft
                    </span>
                  </div>
                  <button
                    onClick={() => upgradeItem(item.id)}
                    disabled={!canUpgrade}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      canUpgrade
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Fejlesztés
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div>
        <h3 className="font-bold text-gray-700 mb-3">Fejlesztési út</h3>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="ml-3">
                <div className="font-bold">Alacsony Tier</div>
                <div className="text-sm text-gray-600">Alma, Körte</div>
              </div>
            </div>
            <div className="text-2xl">→</div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="ml-3">
                <div className="font-bold">Közepes Tier</div>
                <div className="text-sm text-gray-600">Banán, Szilva</div>
              </div>
            </div>
            <div className="text-2xl">→</div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="ml-3">
                <div className="font-bold">Magas Tier</div>
                <div className="text-sm text-gray-600">Eper</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-3">
            Fejleszd az itemeket, hogy jobb áron vedd és add el őket. Minden fejlesztés
            csökkenti a vételárat 5%-kal és növeli az eladási árat 10%-kal.
          </p>
        </div>
      </div>
    </div>
  );
}