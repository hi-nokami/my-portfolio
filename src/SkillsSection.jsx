import { Text } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export default function SkillsSection() {
    const skillsRef = useRef()
    const skillsBRTRef = useRef()
    
    return (
        <group position={[-0.5, 7.8, -2]} rotation-y={Math.PI * 0.1}>
            <Text
                ref={skillsRef}
                color="#000000"
                font='./fonts/Roboto/roboto-v47-latin-300.woff'
                fontSize={1.2} 
                position={[0.8, -0.2, 0]}
                children={"SKILLS THAT SHAPE EVERY PIXEL AND POLYGON."}
                maxWidth={12}
                textAlign="left"
                anchorX="center"
                anchorY="middle"
            />
            
            <Text
                ref={skillsBRTRef}
                color="#000000"
                font='./fonts/Roboto/roboto-v47-latin-300.woff'
                fontSize={0.13} 
                position={[5, -1.9, 0]}
                children={"Driven by curiosity, shaped by discipline, inspired by possibility."}
                maxWidth={2}
                textAlign="left"
                anchorX="center"
                anchorY="middle"
            />
        </group>
    )
}