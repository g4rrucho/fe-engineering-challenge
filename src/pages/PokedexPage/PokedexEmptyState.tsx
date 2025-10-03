const PokedexEmptyState = () => (
  <div className="mx-auto max-w-6xl px-4 py-8">
    <div className="text-center">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">My Pokédex</h1>
      <div className="rounded-lg bg-gray-50 p-8">
        <p className="text-lg text-gray-600">No Pokémon caught yet!</p>
        <p className="mt-2 text-sm text-gray-500">
          Go to the main list and start catching some Pokémon.
        </p>
      </div>
    </div>
  </div>
);

export default PokedexEmptyState;
