import usePokedex from '@/hooks/usePokedex';
import PokemonListItem from '@/components/Pokemon/PokemonList/PokemonListItem';
import PokedexHeader from '@/components/Pokedex/PokedexHeader';

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
      <PokedexHeader totalCaught={pokemonCaughtIDs.length} />

      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {pokemonCaughtIDs.map((id) => {
          const pokemonData = pokemonCaught[id];
          const pokemon = pokemonData.pokemon;
          const pokemonCaughtAt = new Date(
            pokemonData.caughtAt
          ).toLocaleDateString();

          return (
            <PokemonListItem
              key={`pokemon-${id}`}
              url={`/pokemon/${id}`}
              id={id}
              name={pokemon.name}
              caughtAt={pokemonCaughtAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Pokedex;
