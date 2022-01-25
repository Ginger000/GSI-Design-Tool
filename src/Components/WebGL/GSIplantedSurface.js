import { useSpring, animated} from '@react-spring/three'
import React, {useRef, useEffect} from 'react';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const name = (type) => `PavingStones092_1K_${type}.jpg`

const GSIplantedSurface =  ({position, args, color, GSIRatio, prevGSIRatio}) => {

    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
        TextureLoader, [
            name("Color"),
            name("Displacement"),
            name("Normal"),
            name("Roughness"),
            name("AmbientOcclusion")
        ] 
    )
    colorMap.repeat.set(0.5,0.5)
    displacementMap.repeat.set(1,1)
    normalMap.repeat.set(1,1)
    roughnessMap.repeat.set(1,1)
    aoMap.repeat.set(1,1)


    const mesh = useRef(null);
    useEffect(()=>{
        mesh.current.geometry.translate(0, 1.5, 3.01)
    },[])
    // let a = (GSIRatio/(GSIRatio+1)).toFixed(2)
    const {GSIScale} = useSpring({

        // GSIScale:[1,1,GSIRatio/(GSIRatio+1)],
        GSIScale: GSIRatio === 2 ? [1,1,1] : [1,1,GSIRatio/(GSIRatio+1)] ,
        // delay:prevGSIRatio < GSIRatio ? 2000 : 0 ,
        config:{
            duration:2000
            // duration:prevGSIRatio < GSIRatio ? 2000 : 0 
        }
    })
    return (
        <animated.mesh position={position} ref={mesh} scale={GSIScale}>
            <boxBufferGeometry attach="geometry" args={args}  />
            <meshStandardMaterial attach="material" 
                displacementScale={0}
                map={colorMap}
                displacementMap={displacementMap}
                normalMap={normalMap}
                roughnessMap={roughnessMap}
                aoMap = {aoMap}
            />
        </animated.mesh>
    )
}

export default GSIplantedSurface;
