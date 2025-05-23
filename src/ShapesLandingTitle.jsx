import { Float, MeshTransmissionMaterial, useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState, useMemo } from "react"
import { folder, useControls, LevaPanel } from "leva"
import { useSpring, animated, config, to } from "@react-spring/three"

export default function ShapesLandingTitll(props) 
{
    // Destructure props properly
    const { position, shapeId, materialProps, shapesGLTF } = props

    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)
    const meshRef = useRef()

    const { nodes } = useGLTF("./shapes/shapes06.glb")

    const colorTransition = useSpring({
        colorValue: hovered ? 1 : 0,
        config: {
            mass: 1,
            tension: 80,
            friction: 60
        }
    })

    // React Spring with imperative API
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

    // Handle interactions
    const handleClick = () => {
        setClicked(!clicked)
        
        if (!clicked) {
            // Animate to expanded state
            api.start({
                scale: [1.2 + 0.3, 0.8 + 0.3, 1.2 + 0.3],
                config: { mass: 1, tension: 300, friction: 10 }
            }).then(() => {
                api.start({
                    rotation: [0, Math.PI * 2, 0],
                    config: { mass: 1, tension: 200, friction: 20 }
                })
            })
        } else {
            // Animate back to original state with nice physics
            api.start({
                scale: [0.9 + 0.3, 0.9 + 0.3, 0.9 + 0.3],
                rotation: [0, 0, 0],
                config: { 
                    mass: 3,
                    tension: 150, 
                    friction: 15,
                    // Adding some bounce when returning
                    bounce: 0.25
                }
            })
        }
    }

    // Select the correct geometry based on shapeId
    let geometry
    if (shapeId === 1) {
        geometry = nodes.shape001.geometry
    } else if (shapeId === 2) {
        geometry = nodes.shape002.geometry
    }

    const AnimatedMeshTransmissionMaterial = animated(MeshTransmissionMaterial)

    // Only render if we have a valid geometry
    return geometry ? (
        <Float 
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.8}
            floatingRange={[-0.2, 0.2]}
        >
            <animated.mesh 
                ref={meshRef}
                geometry={geometry}
                position={position}
                scale={springs.scale}
                rotation={springs.rotation}
                // In your event handlers
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
                onClick={handleClick}
            >
                <AnimatedMeshTransmissionMaterial 
                    thickness={materialProps.thickness}
                    roughness={materialProps.roughness}
                    chromaticAberration={materialProps.chromaticAberration}
                    transmission={materialProps.transmission}
                    ior={materialProps.ior}
                    distortion={springs.distortion}
                    distortionScale={materialProps.distortionScale}
                    temporalDistortion={materialProps.temporalDistortion}
                    clearcoat={materialProps.clearcoat}
                    attenuationDistance={materialProps.attenuationDistance}
                    attenuationColor={materialProps.attenuationColor}
                    color={colorTransition.colorValue.to({
                        range: [0, 1],
                        output: ['#e7fdff', '#a7fdff'],
                        extrapolate: 'clamp'
                    })}
                />
            </animated.mesh>
        </Float>
    ) : null
}