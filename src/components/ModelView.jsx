import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import PropTypes from 'prop-types'
import Lights from "./Lights"
import { Suspense } from "react"
import Iphone from "./IPhone"
import * as THREE from "three"
import Loader from "./Loader"

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
	return (
		<View
			index={index}
			id={gsapType}
			className={`w-full h-full absolute ${index === 1 && 'right-[-100%]'}`}
		>
			<ambientLight intensity={0.3} />

			<PerspectiveCamera makeDefault position={[0, 0, 4]} />

			<Lights />

			<OrbitControls
				makeDefault
				ref={controlRef}
				enableZoom={false}
				enablePan={false}
				rotateSpeed={0.5}
				target={new THREE.Vector3(0, 0, 0)}
				onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
			/>

			<group ref={groupRef} name={`${index === 0 ? 'small' : 'large'}`}>
				<Suspense fallback={<Loader />}>
					<Iphone scale={index === 0 ? [15, 15, 15] : [17, 17, 17]} item={item} size={ size} />
				</Suspense>			
			</group>
		
		</View>
	)
}
ModelView.propTypes = {
	index: PropTypes.number.isRequired,
	groupRef: PropTypes.object.isRequired,
	gsapType: PropTypes.string.isRequired,
	controlRef: PropTypes.object.isRequired,
	setRotationState: PropTypes.func.isRequired,
	size: PropTypes.array.isRequired,
	item: PropTypes.object.isRequired,
}

export default ModelView
export default ModelView