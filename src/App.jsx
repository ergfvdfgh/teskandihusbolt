import { GameProvider } from './context/GameContext';
import ItemCard from './components/ItemCard';
import MarketPanel from './components/MarketPanel';
import { useGame } from './context/GameContext';

function GameHeader() {
  const { state } = useGame();
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-b-lg shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Teskandi husbolt szimulator</h1>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{new Intl.NumberFormat('hu-HU').format(state.money)} Ft</div>
            <div className="text-blue-200">Nap: {state.day}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function MainGame() {
  const { state } = useGame();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bal oldal: Itemek és Piac */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Termékek</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {state.items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        <GameHeader />
        <MainGame />
      </div>
    </GameProvider>
  );
}

export default App;