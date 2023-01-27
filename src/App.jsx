import { useState, useEffect } from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import ListadoPacientes from './components/ListadoPacientes'

function App() {
	const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []);
	const [patient, setPatient] = useState([]);

	

	useEffect(() => {
		localStorage.setItem('pacientes', JSON.stringify(pacientes))

	}, [pacientes])

	const patientDelete = (id) => {
		const patientUpdate = pacientes.filter( paciente => paciente.id !== id)
		setPacientes(patientUpdate)
	}

	return (
		<div className="container mx-auto mt-20">
			<Header />
			<div className="mt-12 md:flex">
				<Formulario
					pacientes={pacientes}
					setPacientes={setPacientes}
					patient = {patient}
					setPatient = {setPatient}

				/>
				<ListadoPacientes
					pacientes={pacientes}
					setPatient = {setPatient}
					patientDelete = {patientDelete}
				/>

			</div>
		</div>
	)
}

export default App;