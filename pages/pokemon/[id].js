import Layout from '../../components/Layout';
import getPokemonData from '../../utils/pokemonApi';

const Pokemon = ({ pokemon }) => (
  console.log(pokemon),
  <Layout content={(
    <div className="container mx-auto mt-8 text-center">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto mb-4"
      />
      <h1 className="text-4xl font-bold mb-2">{pokemon.name}</h1>
      <p className="text-lg mb-2">Altura: {pokemon.height}</p>
      <p className="text-lg mb-4">Peso: {pokemon.weight}</p>
      <p className="text-lg mb-2">Habilidades:   </p>
       
      <ul className="list-disc text-lg mb-4">
        {pokemon.abilities.map((ability, index) => (
          
            <p><a href={ability.ability.url} key={index}> {ability.ability.name}  </a></p>
           
        ))}
      </ul>
      
    </div>
  )} />
);

Pokemon.getInitialProps = async ({ query }) => {
  try {
    const pokemonId = query.id;
    const pokemon = await getPokemonData(pokemonId);
    return { pokemon };
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return { pokemon: null };
  }
};

export default Pokemon;



