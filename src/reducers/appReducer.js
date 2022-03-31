const SET_CHOSEN_ROUTE_COORDS = 'SET_CHOSEN_ROUTE_COORDS'
const INITIAL_CHANGE = 'INITIAL_CHANGE'
const DESTINATION_CHANGE = 'DESTINATION_CHANGE'
const CHANGE_CHOSEN_ROUTE = 'CHANGE_CHOSEN_ROUTE'

const defaultState = {
    routes: [
        { id: 1, initialPoint: 'Минск', destinationPoint: 'Гродно' },
        { id: 2, initialPoint: 'Брест', destinationPoint: 'Витебск' },
        { id: 3, initialPoint: 'Гомель', destinationPoint: 'Могилев' },
        { id: 4, initialPoint: 'Минск', destinationPoint: 'Гомель' },
        { id: 5, initialPoint: 'Брест', destinationPoint: 'Могилев' },
    ],
    cities: [
        { id: 1, name: 'Минск', coords: [53.9000000, 27.5666700] },
        { id: 2, name: 'Гродно', coords: [53.6884000, 23.8258000] },
        { id: 3, name: 'Брест', coords: [52.0975500, 23.6877500] },
        { id: 4, name: 'Гомель', coords: [52.4345000, 30.9754000] },
        { id: 5, name: 'Могилев', coords: [53.9168000, 30.3449000] },
        { id: 6, name: 'Витебск', coords: [55.1904000, 30.2049000] },
    ],
    chosenRouteCoords: null,
    initialPoint: null,
    destinationPoint: null,
}

export default function booksReducer(state = defaultState, action) {
    switch (action.type) {

        case SET_CHOSEN_ROUTE_COORDS:
            return { ...state, chosenRouteCoords: [...action.payload] }

        case INITIAL_CHANGE: {
            const newRoutes = state.routes.map(route => {
                if (route.id === action.id) {
                    return { ...route, initialPoint: action.value }
                }
                return route
            })
            return { ...state, initialPoint: [...state.cities.find((city) => city.name === action.value).coords], routes: newRoutes }
        }

        case DESTINATION_CHANGE: {
            const newRoutes = state.routes.map(route => {
                if (route.id === action.id) {
                    return { ...route, destination: action.value }
                }
                return route
            })
            return { ...state, destinationPoint: [...state.cities.find((city) => city.name === action.value).coords], routes: newRoutes }
        }

        case CHANGE_CHOSEN_ROUTE:
            const initialCity = state.cities.find((city) => city.name === action.route.initialPoint)
            const destinationCity = state.cities.find((city) => city.name === action.route.destinationPoint)

            return { ...state, initialPoint: [...initialCity.coords], destinationPoint: [...destinationCity.coords] }

        default:
            return state;
    }
}

export const setChosenRouteCoords = (payload) => ({ type: SET_CHOSEN_ROUTE_COORDS, payload })
export const changeChosenRoute = (route) => ({ type: CHANGE_CHOSEN_ROUTE, route })
export const initialChange = (value, id) => ({ type: INITIAL_CHANGE, value, id })
export const destinationChange = (value, id) => ({ type: DESTINATION_CHANGE, value, id })






