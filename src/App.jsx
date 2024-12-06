import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Model from "./components/Model"
import NavBar from "./components/NavBar"

const App = () => {
	return (
		<main className="bg-black">
			<NavBar />
			<Hero />
			<Highlights />
			<Model />
		</main>
	)
}

export default App
