import {useEffect, useState} from 'react';
import Error from './Error';
const Formulario = ( {pacientes, setPacientes, patient, setPatient }) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
        if (Object.keys(patient).length > 0) {
            setNombre(patient.nombre)
            setPropietario(patient.propietario)
            setEmail(patient.email)
            setFecha(patient.fecha)
            setSintomas(patient.sintomas)
        }
    }, [patient])
    
    const generarId = () =>{
        const random = Math.random().toString(36).substr(2);
        const fecha =  Date.now().toString(36)

        return random + fecha

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        // validacion del formulario

        if([nombre, propietario, email, fecha, sintomas].includes('')){
            console.log('Hay al menos un campo vacio')    
            setError(true);
            return;
        }

        setError(false);
        //Objeto de Paciente

        const objectPacient ={
            nombre,
            propietario,
            email,
            fecha,
            sintomas, 
            id: generarId()
        }

        if (patient.id ){
            objectPacient.id = patient.id

            const updatedPatients = pacientes.map(patientState => patientState.id === patient.id ? objectPacient : patientState)
            
            setPacientes(updatedPatients)
            setPatient({})
        }
        else{
            // Nuevo registro
            objectPacient.id = generarId()
            setPacientes([...pacientes,objectPacient])
        }

        // Reiniciar el formulario

        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administrarlos</span>
            </p>
            <form
                onSubmit={handleSubmit} 
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" action=""
            >
                { error && <Error><p>Todos los campos son obligatorios</p></Error> }

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">
                        Nombre mascota
                    </label>
                    <input id="mascota" type="text" 
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">
                        Nombre propietario
                    </label>
                    <input id="propietario" type="text" 
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="email">
                        Email
                    </label>
                    <input id="email" type="text" 
                        placeholder="Email contacto propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">
                        Alta
                    </label>
                    <input id="alta" type="date" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">
                        Sintomas
                    </label>
                    <textarea id="sintomas"  
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describa los sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}>
                    </textarea>
                </div>

                <input 
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
                    hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={patient.id ? 'Editar Paciente' : 'Agregar paciente'}
                />
             </form>
        </div>
    )
}

export default Formulario