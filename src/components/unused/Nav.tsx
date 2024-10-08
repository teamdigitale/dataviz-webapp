import CSVUpload from './CSVUpload';
import SelectChart from './SelectChart';
import GenerateRandomData from './GenerateRandomData';
import ChartOptions from './ChartOptions';
import LoadSource from './LoadSource';

type NavProps = {
  data: any;
  state: any;
  chart: string;
  config: object;
  send: (name: any) => void;
  setData: (data: any) => void;
  setChart: (chart: any) => void;
  setRawData: (rawData: any) => void;
  setConfig: (config: any) => void;
};

function Nav(props: NavProps) {
  const {
    data,
    send,
    setData,
    state,
    chart,
    setChart,
    setRawData,
    config,
    setConfig,
  } = props;
  const navItem =
    'py-2 px-4 bg-blue-500 text-white font-semibold shadow-md hover: bg-blue-700  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75';

  const navItemActive = 'py-2 px-4 bg-white text-black font-semibold shadow-md';

  const value = state.value as string;
  return (
    <div className="flex-col bg-gray-50 items-start justify-start">
      <div className={value === 'generate' ? navItemActive : navItem}>
        <button onClick={() => send('GEN')}>1 - GENERATE DATA</button>
        {state.matches('generate') && (
          <div>
            <GenerateRandomData setData={setData} />
          </div>
        )}
      </div>
      <div className={value === 'transform' ? navItemActive : navItem}>
        <button onClick={() => send('TRANSFORM')}>1 - TRANSFORM SOURCE</button>
        {state.matches('transform') && (
          <div>
            <LoadSource setRawData={setRawData} />
          </div>
        )}
      </div>
      <div className={value === 'upload' ? navItemActive : navItem}>
        <button onClick={() => send('UPLOAD')}>1 - UPLOAD DATA</button>
        {state.matches('upload') && (
          <div>
            <CSVUpload setData={(d: any) => setData(d)} />
          </div>
        )}
      </div>
      <div className={value === 'choose' ? navItemActive : navItem}>
        <button onClick={() => send('CHOOSE')}>2 - CHOOSE CHART</button>
        {state.matches('choose') && (
          <div>
            <SelectChart setChart={setChart} chart={chart} />
          </div>
        )}
      </div>
      <div className={value === 'settings' ? navItemActive : navItem}>
        <button onClick={() => send('SETTINGS')}>3 - CHART OPTIONS</button>
        {state.matches('settings') && (
          <div>
            <ChartOptions
              config={config}
              setConfig={setConfig}
              chart={chart}
              numSeries={data?.length - 1 || 0}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
