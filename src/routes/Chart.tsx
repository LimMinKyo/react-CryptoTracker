import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        'Loading Chart'
      ) : (
        <ApexChart
          type="line"
          series={[{ name: 'Price', data: data?.map((price) => price.close) }]}
          options={{
            stroke: {
              curve: 'smooth',
            },
            grid: {
              show: false,
            },
            chart: {
              width: 500,
              height: 300,
              toolbar: {
                show: false,
              },
              background: 'tranparent',
            },
            theme: {
              mode: 'dark',
            },
            xaxis: {
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            colors: ['#0fbcf9'],
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: ['#0be881'],
                stops: [0, 100],
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
