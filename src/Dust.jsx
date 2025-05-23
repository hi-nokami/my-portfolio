import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Dust() {
  const count = 200
  const mesh = useRef()
  const mouse = useRef([0, 0])
  const { viewport, size } = useThree()
  
  // Create initial random positions for particles
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  // Create particles with random positions and properties
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -25 + Math.random() * 50
      const yFactor = -25 + Math.random() * 50
      const zFactor = -25 + Math.random() * 50
      
      temp.push({ 
        factor, 
        speed, 
        xFactor, 
        yFactor, 
        zFactor, 
        mx: 0, 
        my: 0,
        originalX: xFactor,
        originalY: yFactor,
        originalZ: zFactor
      })
    }
    return temp
  }, [count])
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouse.current = [
        (event.clientX / size.width) * 2 - 1,
        -(event.clientY / size.height) * 2 + 1
      ]
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size])
  
  // Animation loop
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    // Update each particle
    particles.forEach((particle, i) => {
      const { factor, speed, originalX, originalY, originalZ } = particle
      
      // Calculate base position with time
      let x = originalX + Math.sin((time * factor * speed) / 10) * factor / 10
      let y = originalY + Math.cos((time * factor * speed) / 10) * factor / 10
      let z = originalZ + Math.sin((time * factor * speed) / 10) * factor / 10
      
      // Apply mouse influence - particles gently move away from mouse
      const mouseX = mouse.current[0] * viewport.width / 2
      const mouseY = mouse.current[1] * viewport.height / 2
      
      // Calculate distance from mouse
      const dx = x - mouseX
      const dy = y - mouseY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Apply repulsion force (inverse to distance)
      if (distance < 10) {
        const force = (10 - distance) / 10 // Stronger when closer
        x += dx * force * 0.2
        y += dy * force * 0.2
      }
      
      // Update the dummy object
      dummy.position.set(x, y, z - 5) // Keep particles behind the main content --> -50
      
      // Scale particles based on their position for a subtle depth effect
      const scale = 0.8 + Math.sin(x / 10) * 0.2
      dummy.scale.set(scale, scale, scale)
      dummy.updateMatrix()
      
      // Apply the matrix to the instanced mesh
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    
    mesh.current.instanceMatrix.needsUpdate = true
  })
  
  return (
    <>
        <instancedMesh ref={mesh} args={[null, null, count]}>
        <circleGeometry args={[0.02, 6]} /> 
        <meshBasicMaterial 
            color="#000000" 
            transparent 
            opacity={0.5} 
            side={THREE.DoubleSide}
        />
        </instancedMesh>

        {/* <mesh position={[0, 0, -5]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="red" />
        </mesh>
     */}
    </>
    
    

  )
}