import { MeshTransmissionMaterial, Float } from "@react-three/drei"

export default function FloatingBlock({ position, scale = 1 })
{
    return <>
        <Float 
            intensity={Math.random() * 10}
            speed={ Math.random() * 2 }
            // rotationIntensity={ Math.random() * 2 }
        >
            <mesh position={ position } scale={ scale } >
                <boxGeometry args={ [ 1, 1, 0.2 ] } />
                <MeshTransmissionMaterial 
                    thickness={ 1 }
                    roughness={ 0.15 }
                    chromaticAberration={ 0.5 }
                    // distortion={ 0.5 }
                />
            </mesh>
        </Float>
    </>
}