import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)

export const animateWithGSAPTimeline = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animations) => {
	timeline.to(rotationRef.current.rotation, {
		y: rotationState,
		duration: 1,
		ease: "power2.out"
	})

	timeline.to(firstTarget, {
		...animations,
		ease: "power2.out"
	}, "<")

	timeline.to(secondTarget, {
		...animations,
		ease: "power2.out"
	}, "<")
}

export const animateWithGSAP = (target, animations, scrollProps) => {
	gsap.to(target, {
		...animations,
		scrollTrigger: {
			trigger: target,
			toggleActions: 'restart reverse restart reverse',
			start: 'top 85%',
			...scrollProps
		}
	})
} 