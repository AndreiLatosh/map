import { useState, useEffect } from 'react';
import useCurrentWidth from './useCurrentWidth';

export default function useResize(ref) {

    const [tableWidth, setTableWidth] = useState(0.495)
    const [mapWidth, setMapWidth] = useState(0.495)

    const width = useCurrentWidth()

    const onMouseDown = () => {
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
    }

    let timerId = null

    const onMouseMove = (e) => {
        clearTimeout(timerId)
        setTimeout(() => {
            setTableWidth(e.clientX / width - 0.005)
            setMapWidth((width - e.clientX) / width - 0.005);
        }, 20);
    }

    const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
    }

    useEffect(() => {
        if (!ref.current) return
        const node = ref.current;

        node.addEventListener('mousedown', onMouseDown)

        return () => {
            node.removeEventListener('mousedown', onMouseDown)
        }
    }, [])


    return [tableWidth.toFixed(4), mapWidth.toFixed(4)]
}