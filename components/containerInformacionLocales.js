import React, { useEffect ,useState} from 'react'
import getFoodData from "../utils/comidasApi";

const ContainerInformacionLocales = ({datos}) => {
    
    const [mapaData5, setMapaData5] = useState({});

    useEffect(() => {
        const getData = async () => {
          const data5 = await getFoodData(7);
          setMapaData5(data5);
        };
        getData();
        console.log("mapaData5",mapaData5.geojson_data);
      }, [datos]);

       // Verifica si hay datos en mapaData5 y si tiene la propiedad geojson_data
  if (!mapaData5 || !mapaData5.geojson_data || Object.keys(mapaData5.geojson_data).length === 0) {
    return <div>Cargando datos...</div>;
  }

    return (
        <div>

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">

                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            #
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Local
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Supermercado
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            e_ids_v_zona
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Indice
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Distancia (m)
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {
                            datos.map((dato, index) => {
                                const geoData = mapaData5.geojson_data[dato.id];
                                return(
                                    <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{dato.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{dato.local}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{dato.supermercado}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{geoData?.e_ids_v_zona}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{geoData?.ids_zona}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{dato.distancia}</div>
                                    </td>
                                </tr>
                                )
                                })
                        }
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>

        </div>
        </div>

    )
}

export default ContainerInformacionLocales