import { useGSAP } from "@gsap/react"
import { animateWithGSAP } from "../utils/animation"
import { explore1Img, explore2Img, exploreVideo } from "../utils/index"
import { useRef } from "react"
import { gsap } from "gsap"

const Features = () => {
	const videoRef = useRef()

	useGSAP(() => {
		animateWithGSAP("#feature-title", {
			y: 0,
			opacity: 1
		})

		animateWithGSAP(".g_grow",
			{ scale: 1, opacity: 1, ease: "power1" },
			{ scrub: 5.5 }
		)

		animateWithGSAP(".g_text",
			{y: 0, opacity: 1, ease: "power2.inOut", duration: 1},
		)

		gsap.to("#explore-video", {
			scrollTrigger: {
				trigger: "#explore-video",
				toggleActions: 'play pause reverse restart',
				start: '-10% bottom',
			},

			onComplete: () => {
				videoRef.current.play()
			}
		})
	})

	return (
		<section className="h-full common-padding bg-zing relative overflow-hidden">
			<div className="screen-max-width">
				<div className="mb-12 w-full">
					<div id="feature-title">
						<div className="section-heading">
							Expand the full story.
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-center items-center overflow-hidden">
					<div className="mt-32 mb-24 pl-24">
						<h2 className="text-5xl lg:text-7xl font-semibold">
							iPhone.
						</h2>
						<h2 className="text-5xl lg:text-7xl font-semibold">
							Forged in Titanium.
						</h2>
					</div>

					<div className="flex-center flex-col sm:px-10">
						<div className="relative h-[50vh] w-full flex items-center">
							<video
								autoPlay
								muted
								className="w-full h-full object-cover object-center"
								preload="none"
								playsInline
								id="explore-video"
								ref={videoRef}
							>
								<source src={exploreVideo} type="video/mp4" />
							</video>
						</div>

						<div className="flex flex-col w-full relative">
							<div className="feature-video-container">
								<div className="overflow-hidden flex-1 h-[50vh]">
									<img src={explore1Img} alt="explore" className="feature-video g_grow" />
								</div>

								<div className="overflow-hidden flex-1 h-[50vh]">
									<img src={explore2Img} alt="explore" className="feature-video g_grow" />
								</div>
							</div>

							<div className="feature-text-container">
								<div className="flex-1 flex-center">
									<p className="feature-text g_text">
										iPhone 15 Pro is {' '}
										<span className="text-white">
											the first iPhone to feature an aerospace-grade titanium design
										</span>,
										using the same alloy that spacecrafts use for mission to Mars.
									</p>
								</div>

								<div className="flex-1 flex-center">
									<p className="feature-text g_text">
										Titanium has one of the best strength-to-weight ratios of any metal, making the our  {' '}
										<span className="text-white">
											lightest Pro model ever.
										</span>,
										You&apos;ll notice the difference when you pick one up.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Features