import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'

export default function FloatingBlockPrime({ position, scale = 1 }) 
{
    // 0.2 = 0.2 * scale

    // Create geometry and material once using useMemo
    const [geometry, material] = useMemo(() => {
        const geo = new THREE.BoxGeometry(1, 1, 1)
        const mat = <MeshTransmissionMaterial 
            thickness={1}
            roughness={0.15}
            chromaticAberration={0.5}
            // transmissionSampler={true}
            // samples={3}
            // resolution={256}
        />
        return [geo, mat]
    }, [])

    // Define the positions for all boxes
    const boxPositions = useMemo(() => [
        [0, 0, 0],
        [0.2, 0.2, 0],
        [-0.2, 0.2, 0],
        [0.2, -0.2, 0],
        [-0.2, -0.2, 0],
        [0.2 * 2, 0.2 * 2, 0],
        [-0.2 * 2, 0.2 * 2, 0],
        [0.2 * 2, -0.2 * 2, 0],
        [-0.2 * 2, -0.2 * 2, 0],
        [0.2 * 2, 0, 0],
        [-0.2 * 2, 0, 0],
        [0, 0.2 * 2, 0],
        [0, -0.2 * 2, 0],
    ], [])

    return <>
        <Float 
            intensity={Math.random() * 10}
            speed={ Math.random() * 2 }
            rotationIntensity={ Math.random() * 2 }
        >
            <group position={position}>
                {boxPositions.map((pos, index) => (
                <mesh 
                    key={index}
                    scale={0.2}
                    position={pos}
                    geometry={geometry}
                    // material={material}
                >
                    {material}
                </mesh>
                ))}
            </group>
        </Float>
    </>
}
