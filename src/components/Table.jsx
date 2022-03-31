import React, { useState } from 'react'
import { Select, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { changeChosenRoute, destinationChange, initialChange } from '../reducers/appReducer';

const { Option } = Select;

const Table = ({ tableWidth }) => {

    const routes = useSelector(state => state.app.routes)
    const cities = useSelector(state => state.app.cities)

    const [chosenRouteId, setChosenRouteId] = useState(null)

    const dispatch = useDispatch()

    const handleInitialChange = (value, id) => {
        dispatch(initialChange(value, id));
    }

    const handleDestinationChange = (value, id) => {
        dispatch(destinationChange(value, id))
    }

    const handleClick = (route) => {
        if (route.id === chosenRouteId) return
        setChosenRouteId(route.id);
        dispatch(changeChosenRoute(route))
    }

    return (
        <Col style={{ width: `${tableWidth * 100}%`, minWidth: '15%', overflow: 'auto' }}>
            <Row style={{ fontSize: '1.25rem', textAlign: 'center', padding: '16px', borderBottom: '1px solid lightgray', minWidth: '440px' }}>
                <Col span={12}>Пункт отправления</Col>
                <Col span={12}>Пункт назначения</Col>
            </Row>
            {
                routes.map(route =>
                    <Row className={route.id === chosenRouteId ? 'active' : null} onClick={() => handleClick(route)} key={route.id}
                        style={{ textAlign: 'center', padding: '16px', borderBottom: '1px solid lightgray', minWidth: '440px' }}
                    >
                        <Col span={12}>
                            <Select defaultValue={route.initialPoint} style={{ width: '200px' }} onChange={(value) => handleInitialChange(value, route.id)}>
                                {
                                    cities.map(city =>
                                        <Option key={city.id} value={city.name}>{city.name}</Option>
                                    )
                                }
                            </Select>
                        </Col>
                        <Col span={12}>
                            <Select defaultValue={route.destinationPoint} style={{ width: '200px' }} onChange={(value) => handleDestinationChange(value, route.id)}>
                                {
                                    cities.map(city =>
                                        <Option key={city.id} value={city.name}>{city.name}</Option>
                                    )
                                }
                            </Select>
                        </Col>
                    </Row>
                )
            }
        </Col>
    )
}

export default Table
