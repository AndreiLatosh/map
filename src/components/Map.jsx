import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'antd';
import { getChosenRouteCoords } from '../asyncActions/app';

const Map = ({ mapWidth }) => {

    const initialPoint = useSelector(state => state.app.initialPoint)
    const destinationPoint = useSelector(state => state.app.destinationPoint)
    const routeCoords = useSelector(state => state.app.chosenRouteCoords)

    const dispatch = useDispatch()

    useEffect(() => {
        if (initialPoint && destinationPoint) {
            dispatch(getChosenRouteCoords(initialPoint, destinationPoint))
        }
    }, [initialPoint, destinationPoint, dispatch])

    return (
        <Col style={{ width: `${mapWidth * 100}%`, maxWidth: '84%' }}>
            <MapContainer center={[53.7, 28.00]} zoom={6}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    initialPoint && <Marker position={initialPoint} />
                }
                {
                    destinationPoint && <Marker position={destinationPoint} />
                }
                {
                    routeCoords && <Polyline positions={routeCoords} />
                }
            </MapContainer>
        </Col>
    )
}

export default Map

