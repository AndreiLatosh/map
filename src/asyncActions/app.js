import axios from 'axios'
import { setChosenRouteCoords } from '../reducers/appReducer';

export const getChosenRouteCoords = (initialPoint, destinationPoint) => async dispatch => {
    try {
        const response = await axios.get(`http://router.project-osrm.org/route/v1/driving/${initialPoint[1]},${initialPoint[0]};${destinationPoint[1]},${destinationPoint[0]}?overview=full&geometries=geojson`)
        dispatch(setChosenRouteCoords(response.data.routes[0].geometry.coordinates.map(coords => [coords[1], coords[0]])))

    } catch (e) {
        console.log(e);
    }
}