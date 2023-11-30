import Link from 'next/link';
import { useState, useEffect } from 'react';
import getPokemonData from '../utils/pokemonApi';

const ListaPokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const promises = Array.from({ length: 10 }, (_, index) =>
          getPokemonData(index + 1)
        );

        const data = await Promise.all(promises);
        setPokemonList(data);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Lista de Pokémon</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemonList.map((pokemon) => (
          <li
            key={pokemon.id}
            className="bg-gray-200 p-4 rounded-md hover:bg-gray-300 transition duration-300 cursor-pointer"
          >
            <Link href='/pokemon/[id]' as={`/pokemon/${pokemon.id}`}>
              <p className="text-xl font-bold">{pokemon.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPokemon;
