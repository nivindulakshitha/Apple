import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { smallHeroVideo, heroVideo } from "../utils"
import { useState } from "react"
import { useEffect } from "react"

const Hero = () => {
	const [video, setVideo] = useState(window.innerWidth > 760 ? heroVideo : smallHeroVideo)

	const handleResize = () => {
		if (window.innerWidth > 760) {
			setVideo(heroVideo)
		} else {
			setVideo(smallHeroVideo)
		}
	}

	useEffect(() => {
		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	useGSAP(() => {
		gsap.to("#hero-title", {
			opacity: 1,
			delay: 2,
		})

		gsap.to("#cta", {
			opacity: 1,
			y: -50,
			delay: 2,
		})
	}, [])

	return (
		<section className="flex flex-col bg-black nav-height relative">
			<div className="h-5/6 w-full flex-center flex-col">
				<p id="hero-title" className="hero-title">iPhone 15 Pro</p>
				<div className="md:w-10/12 w-9/12">
					<video className="pointer-events-none" autoPlay muted playsInline={ true } key={video}>
						<source src={ video } type="video/mp4" />
					</video>
				</div>
			</div>

			<div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
				<a href="#highlights" className="btn">
					Buy
				</a>
				<p className="font-normal text-xl">from $199/month or $999</p>
			</div>
		</section>
	)
}

export default Hero