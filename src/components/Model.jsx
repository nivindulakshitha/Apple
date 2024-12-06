import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ModelView from "./ModelView"
import { yellowImg } from "../utils";
import * as THREE from "three"
import { View } from "@react-three/drei";
import { useRef, useState } from "react";
import { models, sizes } from "../constants";
import { Canvas } from "@react-three/fiber";

const Model = () => {
	const [size, setSize] = useState('small');
	const [model, setModel] = useState({
		title: "iPhone 15 Pro in Natural Titanium",
		color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
		img: yellowImg
	})

	// Camera controls
	const cameraControlSmall = useRef();
	const cameraControlLarge = useRef();

	// Refs for the models
	const small = useRef(new THREE.Group())
	const large = useRef(new THREE.Group())

	// Rotations for the models
	const [smallRotation, setSmallRotation] = useState(0);
	const [largeRotation, setLargeRotation] = useState(0);

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
					<ModelView
						index={0}
						groupRef={small}
						gsapType="view0"
						controlRef={cameraControlSmall}
						setRotationState={setSmallRotation}
						item={model}
						size={size}
					/>
					<ModelView
						index={1}
						groupRef={large}
						gsapType="view1"
						controlRef={cameraControlLarge}
						setRotationState={setLargeRotation}
						item={model}
						size={size}
					/>

					<Canvas
						className="w-full h-full"
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							pointerEvents: 'none',
							overflow: 'hidden'
						}}
						// eslint-disable-next-line react/no-unknown-property
						eventSource={document.getElementById('root')}
					>
						<View.Port />
					</Canvas>
				</div>

				<div className="mx-auto w-full">
					<p className="text-sm font-light text-center mb-5">{model.title}</p>
					<div className="flex-center">
						<ul className="color-container">
							{
								models.map(item => (
									<li
										key={item}
										className="w-6 h-6 rounded-full cursor-pointer mx-2"
										style={{
											backgroundColor: item.color[0]
										}}
										onClick={() => {
											setModel(item)
										}}
									>
									</li>
								))
							}

							<button className="size-btn-container">
								{sizes.map(({label, value}) => (
									<span key={label}
										className="size-btn"
										style={{
											backgroundColor: size === value ? '#fff' : 'transparent',
											color: size === value ? '#000' : '#fff'
										}}
										onClick={() => {
										
											setSize(value)
										}}
									>
										{label}
									</span>
								))}
							</button>
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Model