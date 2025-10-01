import { usePokedex } from '@/hooks/usePokedex';
import { Link } from 'react-router-dom';

const Pokedex = () => {
  const { pokemonCaught, getPokemonCaughtIDs } = usePokedex();
  const pokemonCaughtIDs = getPokemonCaughtIDs();

  if (pokemonCaughtIDs.length === 0)
    return (
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">My Pokédex</h1>
        <p className="text-gray-600">
          You've caught {pokemonCaughtIDs.length} Pokémon
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {pokemonCaughtIDs.map((id) => {
          const pokemonData = pokemonCaught[id];
          const pokemon = pokemonData.pokemon;

          return (
            <Link
              to={`/pokemon/${id}`}
              key={`pokemon-${id}`}
              className="text-center"
            >
              <li className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
                {pokemon.sprites?.front_default ? (
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="h-16 w-16 object-contain"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-200">
                    <span className="text-gray-500">?</span>
                  </div>
                )}
                <div className="mt-2">
                  <p className="text-lg font-bold text-black capitalize">
                    {pokemon.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ID: {id.toString().padStart(4, '0')}
                  </p>
                  <p className="text-xs text-gray-400">
                    Caught:{' '}
                    {new Date(pokemonData.caughtAt).toLocaleDateString()}
                  </p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Pokedex;
