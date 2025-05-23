import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function LandingTitle( { position } ) {
    const titleRef = useRef()
    const subtitleRef = useRef()
    
    // Use useFrame to update text rotation based on mouse position
    useFrame(({ mouse }) => {
        if (titleRef.current) {
            // Convert mouse coordinates to rotation angles (subtle effect)
            const rotX = THREE.MathUtils.lerp(-0.03, 0.03, mouse.y * 0.5 + 0.5)
            const rotY = THREE.MathUtils.lerp(-0.03, 0.03, mouse.x * 0.5 + 0.5)
            
            // Apply smooth interpolation for more natural movement
            titleRef.current.rotation.x = THREE.MathUtils.lerp(
                titleRef.current.rotation.x,
                -rotX,
                0.05
            )
            titleRef.current.rotation.y = THREE.MathUtils.lerp(
                titleRef.current.rotation.y,
                rotY,
                0.05
            )
            
            // Optional: Add subtle position shift
            // titleRef.current.position.y = 0.5 + mouse.y * 0.05
            // titleRef.current.position.x = 1.95 + mouse.x * 0.05
        }
        
        if (subtitleRef.current) {
            // Slightly different rotation values for the subtitle
            const rotX = THREE.MathUtils.lerp(-0.05, 0.05, mouse.y * 0.5 + 0.5)
            const rotY = THREE.MathUtils.lerp(-0.01, 0.01, mouse.x * 0.5 + 0.5)
            
            subtitleRef.current.rotation.x = THREE.MathUtils.lerp(
                subtitleRef.current.rotation.x,
                -rotX,
                0.05
            )
            subtitleRef.current.rotation.y = THREE.MathUtils.lerp(
                subtitleRef.current.rotation.y,
                rotY,
                0.05
            )
            
            // Optional: Add subtle position shift
            // subtitleRef.current.position.y = -1.4 + mouse.y * 0.03
            // subtitleRef.current.position.x = -5.75 + mouse.x * 0.03
        }
    })

    return (
        <group position={position}>
            <Text
                ref={titleRef}
                color="#000000"
                font='./fonts/Roboto/roboto-v47-latin-300.woff'
                fontSize={1.5} 
                position={[1.95, 0.5, 0]}
                children={"HI!     I'M     VARAD WANKHADE."}
                maxWidth={15}
                textAlign="left"
                anchorX="center"
                anchorY="middle"
                scale={[1.25, 1, 1]}
            />

            <Text
                ref={subtitleRef}
                color="#444444"
                font='./fonts/Roboto/roboto-v47-latin-300italic.woff'
                fontSize={0.45}
                position={[-5.9, -1.4, 0]}
                children={"i'm a 3D artist."}
                maxWidth={8}
                textAlign="left"
                anchorX="center"
                anchorY="middle"
            />

            <Text
                color="#000000"
                font='./fonts/Roboto/roboto-v47-latin-300.woff'
                fontSize={0.16}
                position={[6.35, -2.4, 0]}
                children={"Engineer by qualification, 3D artist by passion. Creating at the intersection of technology and art. Driven by detail, defined by innovation."}
                maxWidth={3}
                textAlign="left"
                anchorX="center"
                anchorY="middle"
            />
        </group>
    )
}