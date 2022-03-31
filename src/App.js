import './App.css'
import { useRef } from 'react';
import 'antd/dist/antd.css'
import { Row, Col } from 'antd';
import useResize from './hooks/useResize';
import Table from './components/Table';
import Map from './components/Map';

const App = () => {

  const ref = useRef()

  const [tableWidth, mapWidth] = useResize(ref)

  return (
    <Row style={{ userSelect: 'none' }}>
      <Table tableWidth={tableWidth} />
      <Col ref={ref} style={{ width: '0.5%', cursor: 'col-resize', backgroundColor: 'lightgray', margin: '0px 0.25%' }}></Col>
      <Map mapWidth={mapWidth} />
    </Row>
  );
}

export default App;
