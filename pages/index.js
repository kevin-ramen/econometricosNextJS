import Link from 'next/link';

const Index = () => (
  <div className="container mx-auto mt-8 text-center">
    <h1 className="text-4xl font-bold mb-4">Lista de Pokémon</h1>
    <Link href='/lista_pokemon'>
      <p className="block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
        Ver lista de Pokémon
      </p>
    </Link>
  </div>
);

export default Index;
