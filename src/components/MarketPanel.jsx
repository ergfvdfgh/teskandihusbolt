import { useGame } from '../context/GameContext';

const eventMessages = {
  GOOD_WEATHER: {
    title: 'Jó időjárás',
    message: 'A termés bőséges, az árak csökkennek.',
    icon: '☀️',
    color: 'bg-yellow-50 border-yellow-200',
  },
  BAD_WEATHER: {
    title: 'Rossz időjárás',
    message: 'A termés kevés, az árak emelkednek.',
    icon: '🌧️',
    color: 'bg-blue-50 border-blue-200',
  },
  null: {
    title: 'Normál piac',
    message: 'A piac stabil, nincsenek különleges események.',
    icon: '📊',
    color: 'bg-gray-50 border-gray-200',
  },
};

export default function MarketPanel() {
  const { state, nextDay } = useGame();
  const { marketConditions, day } = state;
  const event = marketConditions.event || null;
  const eventInfo = eventMessages[event];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Piaci információk</h2>
        <div className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded">
          Nap: <span className="text-blue-600">{day}</span>
        </div>
      </div>

      <div className={`border rounded-lg p-4 mb-4 ${eventInfo.color}`}>
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">{eventInfo.icon}</span>
          <h3 className="text-lg font-bold">{eventInfo.title}</h3>
        </div>
        <p className="text-gray-700">{eventInfo.message}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Kereslet</span>
            <span className="text-lg font-bold text-green-600">
              {((marketConditions.demand - 1) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-green-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(marketConditions.demand - 0.8) * 250}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {marketConditions.demand > 1.1 ? 'Magas kereslet' : 
             marketConditions.demand < 0.9 ? 'Alacsony kereslet' : 'Normál kereslet'}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Infláció</span>
            <span className="text-lg font-bold text-red-600">
              {((marketConditions.inflation - 1) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-red-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${(marketConditions.inflation - 0.9) * 500}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {marketConditions.inflation > 1.05 ? 'Magas infláció' : 
             marketConditions.inflation < 0.95 ? 'Defláció' : 'Stabil árak'}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-800 mb-2">Piaci tanácsok</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {marketConditions.demand > 1.2 && (
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Magas kereslet: jó idő eladni!</span>
            </li>
          )}
          {marketConditions.demand < 0.9 && (
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">🛒</span>
              <span>Alacsony kereslet: vásárolj olcsón!</span>
            </li>
          )}
          {marketConditions.inflation > 1.1 && (
            <li className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <span>Magas infláció: az árak emelkednek.</span>
            </li>
          )}
          {event === 'GOOD_WEATHER' && (
            <li className="flex items-center">
              <span className="text-yellow-500 mr-2">☀️</span>
              <span>Jó idő: a vételárak csökkennek.</span>
            </li>
          )}
          {event === 'BAD_WEATHER' && (
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">🌧️</span>
              <span>Rossz idő: az eladási árak emelkednek.</span>
            </li>
          )}
        </ul>
      </div>

      <button
        onClick={nextDay}
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition"
      >
        Következő nap →
      </button>
    </div>
  );
}