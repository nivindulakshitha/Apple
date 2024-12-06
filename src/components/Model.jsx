import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ModelView from "./ModelView"

const Model = () => {
	useGSAP(() => {
		gsap.to("#heading", {
			opacity: 1,
			y: 0
		})
	}, [])

	return (
		<section className="common-padding">
			<div className="screen-max-width">
				<h1 id="heading" className="section-heading">
					Take a closer look.
				</h1>
			</div>

			<div className="flex flex-col items-center mt-5">
				<div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
					<ModelView />
				</div>
			</div>
		</section>
	)
}

export default Model