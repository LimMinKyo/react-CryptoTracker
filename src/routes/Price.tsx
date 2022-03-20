import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinTickers } from '../api';

const Overview = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.cardBgColor};
  span {
    width: 50%;
  }
  span:first-child {
    font-size: 13px;
    font-weight: 400;
    text-transform: uppercase;
  }
`;

const OverviewInfo = styled.span<{ isPositive ?: boolean }>`
  padding-left: 40px;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${(props) => props.isPositive ? '#4cbb17' : 'red'};
`;

interface RouteParams {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price() {
  const { coinId } = useParams() as unknown as RouteParams;
  const { isLoading, data } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const checkValue = (value : number | undefined) => {
    if (value) {
      return value >= 0;
    }
  }
  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <Overview>
            <span>Price:</span>
            <OverviewInfo isPositive={true}>
              ${data?.quotes.USD.price.toFixed(2)}
            </OverviewInfo>
          </Overview>
          <Overview>
            <span>Max Change rate in last 24h:</span>
            <OverviewInfo isPositive={checkValue(data?.quotes.USD.market_cap_change_24h) === true}>
              {data?.quotes.USD.market_cap_change_24h}%
            </OverviewInfo>
          </Overview>
          <Overview>
            <span>Change rate (last 30 Minutes):</span>
            <OverviewInfo isPositive={checkValue(data?.quotes.USD.percent_change_30m) === true}>
              {data?.quotes.USD.percent_change_30m}%
            </OverviewInfo>
          </Overview>
          <Overview>
            <span>Change rate (last 1 hours):</span>
            <OverviewInfo isPositive={checkValue(data?.quotes.USD.percent_change_1h) === true}>
              {data?.quotes.USD.percent_change_1h}%
            </OverviewInfo>
          </Overview>
          <Overview>
            <span>Change rate (last 12 hours):</span>
            <OverviewInfo isPositive={checkValue(data?.quotes.USD.percent_change_12h) === true}>
              {data?.quotes.USD.percent_change_12h}%
            </OverviewInfo>
          </Overview>
          <Overview>
            <span>Change rate (last 24 hours):</span>
            <OverviewInfo isPositive={checkValue(data?.quotes.USD.percent_change_24h) === true}>
              {data?.quotes.USD.percent_change_24h}%
            </OverviewInfo>
          </Overview>
        </>
      )}
    </>
  );
}

export default Price;
