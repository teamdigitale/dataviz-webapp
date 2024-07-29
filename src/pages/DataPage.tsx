import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'design-react-kit';
import { useState } from 'react';
import { getAvailablePalettes, getPalette, transposeData } from '../lib/utils';
import DataTable from '../components/DataTable';

import useStoreState from '../lib/store';
import GenerateRandomData from '../components/GenerateRandomData';
import LoadSource from '../components/LoadSource';
import { downloadCSV } from '../lib/downloadUtils';

function Home() {
  const config = useStoreState((state) => state.config);
  const setConfig = useStoreState((state) => state.setConfig);
  const data = useStoreState((state) => state.data);
  const setData = useStoreState((state) => state.setData);
  const rawData = useStoreState((state) => state.rawData);
  const setRawData = useStoreState((state) => state.setRawData);
  const [activeTab, toggleTab] = useState('1');

  function reset() {
    setData(null);
  }
  function transpose() {
    setData(null);
    const transposed = transposeData(data);
    // setChart("");
    setTimeout(() => {
      handleChangeData(transposed);
    }, 300);
  }

  function handleChangeData(d) {
    if (!config.palette) {
      const numSeries = d.length - 1;
      let palette = getAvailablePalettes(numSeries)[0];
      config.palette = palette;
      config.colors = getPalette(palette);
      setConfig(config);
    }
    setData(d);
  }

  return (
    <Container className="m-3">
      <Row>
        <Col sm={'3'}>
          <Nav pills className="mb-3" vertical>
            <NavItem>
              <NavLink
                href="#"
                active={activeTab === '1'}
                onClick={(e) => {
                  e.preventDefault();
                  toggleTab('1');
                }}
              >
                Generate data
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                active={activeTab === '2'}
                onClick={(e) => {
                  e.preventDefault();
                  toggleTab('2');
                }}
              >
                Load remote data
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col sm={'9'}>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1" className="p-3">
              <>
                <h4>Generate data</h4>
                <GenerateRandomData setData={setData} />
              </>
            </TabPane>
            <TabPane tabId="2" className="p-3">
              <>
                <h4>Load remote data</h4>

                <LoadSource setRawData={setRawData} />
                <div>
                  <h1>RAW DATA</h1>
                  {rawData && (
                    <div>
                      <DataTable
                        data={rawData}
                        reset={reset}
                        transpose={transpose}
                        download={() => {
                          downloadCSV(rawData, 'raw-data');
                        }}
                      />
                    </div>
                  )}
                </div>
              </>
            </TabPane>
          </TabContent>
          {data && (
            <div>
              <h1> DATA</h1>
              <DataTable
                data={data}
                reset={reset}
                transpose={transpose}
                download={() => {
                  downloadCSV(rawData, 'data');
                }}
              />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
