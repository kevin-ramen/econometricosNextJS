import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import getFoodData from "../utils/comidasApi";

const ContainerInformacionLocales = ({ datos }) => {
  const [mapaData5, setMapaData5] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const getData = async () => {
      const data5 = await getFoodData(7);
      setMapaData5(data5);
    };
    getData();
  }, [datos]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  

  const sortedData = [...datos].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] - b[sortConfig.key];
    } else {
      return b[sortConfig.key] - a[sortConfig.key];
    }
  });

  if (!mapaData5 || !mapaData5.geojson_data || Object.keys(mapaData5.geojson_data).length === 0) {
    return <div>Cargando datos...</div>;
  }
  const sortedDataCal = [...datos].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
  
    if (sortConfig.direction === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
  
  const maxMinValues = datos.reduce(
    (acc, dato) => {
      // Distancia
      acc.maxDistancia = Math.max(acc.maxDistancia, dato.distancia);
      acc.minDistancia = Math.min(acc.minDistancia, dato.distancia);
  
      // Precio Supermercado
      acc.maxPrecioSupermercado = Math.max(acc.maxPrecioSupermercado, dato.precio_supermercado);
      acc.minPrecioSupermercado = Math.min(acc.minPrecioSupermercado, dato.precio_supermercado);
  
      // Metros cuadrados
      acc.maxMetros = Math.max(acc.maxMetros, dato.precio_metros_cuadrado);
      acc.minMetros = Math.min(acc.minMetros, dato.precio_metros_cuadrado);

      // Tiempo

      acc.maxTiempo = Math.max(acc.maxTiempo, dato.tiempo);
      acc.minTiempo = Math.min(acc.minTiempo, dato.tiempo);
  
      return acc;
    },
    {
      maxDistancia: -Infinity,
      minDistancia: Infinity,
      maxPrecioSupermercado: -Infinity,
      minPrecioSupermercado: Infinity,
      maxMetros: -Infinity,
      minMetros: Infinity,
      maxTiempo: -Infinity,
      minTiempo: Infinity,
    }
  );

  const calculateCalificacion = (dato, maxDistancia, minDistancia, maxPrecioSupermercado, minPrecioSupermercado, maxMetros, minMetros, maxTiempo, minTiempo) => {
    const distanciaScore = 10 - ((dato.distancia - minDistancia) / (maxDistancia - minDistancia)) * 10;
    const indiceScore = dato.geoData ? (dato.geoData.ids_zona / 10) : 0; 
    const precioSupermercadoScore = 10 - ((dato.precio_supermercado - minPrecioSupermercado) / (maxPrecioSupermercado - minPrecioSupermercado)) * 10;
    const metrosScore = ((dato.precio_metros_cuadrado - minMetros) / (maxMetros - minMetros)) * 10;
    const tiempoScore = 10 - ((dato.tiempo - minTiempo) / (maxTiempo - minTiempo)) * 10;
     

  
    // Suma las puntuaciones y calcula el promedio
    const totalScore = distanciaScore + indiceScore + precioSupermercadoScore + metrosScore + tiempoScore;
    const calificacionTotal = totalScore / 5;
  
    return calificacionTotal;
  };
  
  const sortedIndices = datos.map((_, index) => index).sort((a, b) => {
    const calificacionA = calculateCalificacion(
      datos[a],
      maxMinValues.maxDistancia,
      maxMinValues.minDistancia,
      maxMinValues.maxPrecioSupermercado,
      maxMinValues.minPrecioSupermercado,
      maxMinValues.maxMetros,
      maxMinValues.minMetros,
      maxMinValues.maxTiempo,
      maxMinValues.minTiempo
    );
  
    const calificacionB = calculateCalificacion(
      datos[b],
      maxMinValues.maxDistancia,
      maxMinValues.minDistancia,
      maxMinValues.maxPrecioSupermercado,
      maxMinValues.minPrecioSupermercado,
      maxMinValues.maxMetros,
      maxMinValues.minMetros,
      maxMinValues.maxTiempo,
      maxMinValues.minTiempo
    );
  
    if (sortConfig.direction === 'asc') {
      return calificacionA - calificacionB;
    } else {
      return calificacionB - calificacionA;
    }
  });

  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      onClick={() => handleSort('id')}
                    >
                      #
                      {sortConfig.key === 'id' && (
                        <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faSortUp : faSortDown} />
                      )}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      onClick={() => handleSort('local')}
                    >
                      Local
                      {sortConfig.key === 'local' && (
                        <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faSortUp : faSortDown} />
                      )}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      onClick={() => handleSort('precio_local')}
                    >
                      Precio Local
                      {sortConfig.key === 'precio_local' && (
                        <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faSortUp : faSortDown} />
                      )}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      onClick={() => handleSort('precio_local')}
                    >
                      Precio por metro cuadrado
                      {sortConfig.key === 'precio_metros_cuadrado' && (
                        <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faSortUp : faSortDown} />
                      )}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      onClick={() => handleSort('metros')}
                    >
                      Metros cuadrados
                      {sortConfig.key === 'metros' && (
                        <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faSortUp : faSortDown} />
                      )}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      onClick={() => handleSort('supermercado')}
                    >
                      Supermercado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      onClick={() => handleSort('precio_supermercado')}
                    >
                      Precio Supermercado
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      onClick={() => handleSort('e_ids_v_zona')}
                    >
                      e_ids_v_zona
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      onClick={() => handleSort('ids_zona')}
                    >
                      Índice
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      onClick={() => handleSort('distancia')}
                    >
                      Distancia (km)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" 
                    >
                     Tiempo (min)
                    </th> 
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        onClick={() => handleSort('calificacion')}
                    >
                    Calificacion
                    {sortConfig.key === 'calificacion' && (
                        <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faSortUp : faSortDown} />
                    )}
                    </th>


                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {sortedIndices.map((sortedIndex, index) => {
                        const dato = datos[sortedIndex];
                        console.log("dato", dato);
                        const geoData = mapaData5.geojson_data[dato.id];
                        const calificacion = calculateCalificacion(
                            dato,
                            maxMinValues.maxDistancia,
                            maxMinValues.minDistancia,
                            maxMinValues.maxPrecioSupermercado,
                            maxMinValues.minPrecioSupermercado,
                            maxMinValues.maxMetros,
                            maxMinValues.minMetros,
                            maxMinValues.maxTiempo,
                            maxMinValues.minTiempo
                            
                        );
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{dato.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{dato.local}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${(dato.precio_local).toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${(dato.precio_metros_cuadrado).toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{dato.metros}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{dato.supermercado}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${dato.precio_supermercado}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{(geoData?.e_ids_v_zona)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{geoData?.ids_zona.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{(dato.distancia/1000)}</div>
                        </td>
                        <td>
                          <div className="text-sm text-gray-900">{(dato.tiempo_texto)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{calificacion.toFixed(2)}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerInformacionLocales;
