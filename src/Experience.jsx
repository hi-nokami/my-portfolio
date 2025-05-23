import { Perf } from 'r3f-perf'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useControls, LevaPanel, folder } from 'leva'
import ShapesLandingTitle from './ShapesLandingTitle.jsx'
import LandingTitle from './LandingTitle.jsx'
import SkillsSection from './SkillsSection.jsx'
import ShapesSkillsSection from './ShapesSkillsSection.jsx'

gsap.registerPlugin(ScrollTrigger)

function CameraRig() {
    const { camera } = useThree()

    useGSAP(() => 
    {
        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: '20% top',
                scrub: 1,
                markers: true,
            }
        })

        tl1.to(camera.position, {
            x: 2.2,
            y: 7.5,
            z: 5,
            ease: 'sine.inOut',
        }, 0)
        tl1.to(camera.rotation, {
            y: Math.PI * 0.1,
            ease: 'sine.inOut',
        }, 0)

    }, [])

    return null
}

export default function Experience()
{

    const materialProps = useControls({
            Shapes: folder({
                thickness: { value: 2, min: 0, max: 10, step: 0.1 },
                roughness: { value: 0.25, min: 0, max: 1, step: 0.01 },
                chromaticAberration: { value: 0.01, min: 0, max: 1, step: 0.01 },
                transmission: { value: 1, min: 0, max: 1, step: 0.01 },
                ior: { value: 1.5, min: 1, max: 3, step: 0.01 },
                distortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
                distortionScale: { value: 0.5, min: 0.1, max: 1, step: 0.01 },
                temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
                clearcoat: { value: 0.1, min: 0, max: 1, step: 0.01 },
                attenuationDistance: { value: 5.5, min: 0, max: 10, step: 0.1 },
                attenuationColor: "#e7fdff",
                color: "#e7fdff",
            }, { collapsed: true }),
        }, { collapsed: true })

    return <>

        <color attach="background" args={ [ "#d6e1ee" ] } />

        <Perf position="top-left" />

        {/* <OrbitControls makeDefault /> */}

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <CameraRig />

        <LandingTitle position={ [0, 0, 0] } />

        <ShapesLandingTitle position={ [ -3.9, 0.75, 1 ] } shapeId={ 1 } materialProps={ materialProps } />
        {/* <ShapesLandingTitle position={ [ 1.5, -0.8, 1 ] } shapeId={ 2 } materialProps={ materialProps } /> */}

        <SkillsSection />

        <ShapesSkillsSection position={ [ -2, 7.1, -0.5 ] } shapeId={ 1 } materialProps={ materialProps } />
    </>
}