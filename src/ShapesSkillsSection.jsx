import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"

export default function ShapesSkillsSection({ position, shapeId, materialProps, shapeGLTF }) {
    const meshRef = useRef()
    const { nodes } = useGLTF("./shapes/shapes06.glb")

    const [hovered, setHovered] = useState(false)

    const colorTransition = useSpring({
        colorValue: hovered ? 1 : 0,
        config: {
            mass: 1,
            tension: 80,
            friction: 60
        }
    })

    const [springs, api] = useSpring(() => ({
        scale: [1.2, 1.2, 1.2],
        rotation: [0, 0, 0],
        color: "#e7fdff",
        distortion: materialProps.distortion,
        config: key => {
            // Slower, smoother transitions for color
            if (key === 'color' || key === 'distortion') {
            return { 
                mass: 1, 
                tension: 120, 
                friction: 50 
            }
            }
            // Default config for other properties
            return {
            mass: 2,
            tension: 170,
            friction: 26
            }
        }
    }))

    // Apply slow, uniform rotation around the y-axis
    useFrame((state, delta) => {
        if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.2 // Adjust 0.2 for desired speed
        }
    })

    let geometry
    if (shapeId === 1) geometry = nodes.shape003.geometry
    else if (shapeId === 2) geometry = nodes.shape004.geometry

    const AnimatedMeshTransmissionMaterial = animated(MeshTransmissionMaterial)

    return geometry ? (
        <animated.mesh
            ref={meshRef}
            geometry={geometry}
            position={position}
            scale={1.1}
            rotation-x={Math.PI * 0.1}
            onPointerOver={() => {
                setHovered(true)
                    api.start({ 
                        color: "#a7fdff",
                        distortion: materialProps.distortion * 1.5,
                        // No need to specify config here as it's already set in the initial spring
                    })
                }}
                onPointerOut={() => {
                    setHovered(false)
                    api.start({ 
                        color: "#e7fdff",
                        distortion: materialProps.distortion
                    })
                }
            }
        >
        <AnimatedMeshTransmissionMaterial {...materialProps} 
            roughness={ 0.11 } 
            chromaticAberration={ 0.35 } 
            color={colorTransition.colorValue.to({
                range: [0, 1],
                output: ['#e7fdff', '#a7fdff'],
                extrapolate: 'clamp'
            })}
        />
        </animated.mesh>
    ) : null
}