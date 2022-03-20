import { useQuery } from 'react-query';
import { Link, useMatch } from 'react-router-dom';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { RiSunFill, RiMoonFill } from 'react-icons/ri';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { isDarkAtom } from '../atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Helmet, HelmetProvider } from "react-helmet-async";

const Containner = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  margin: 30px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const BackBtn = styled.div`
  width: 40px;
  height: 40px;
  svg {
    color: ${(props) => props.theme.cardBgColor};
    width: 40px;
    height: 40px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const ToggleMode = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  cursor: pointer;
  svg {
    color: ${(props) => props.theme.cardBgColor};
    width: 40px;
    height: 40px;
  }
`;

const Loader = styled.div`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface TickersData {
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

function Coin() {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleIsDarkAtom = () => setIsDarkAtom((prev) => !prev);
  const { coinId } = useParams() as unknown as RouteParams;
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<TickersData>(['tickers', coinId], () => fetchCoinTickers(coinId));
  const loading = infoLoading || tickersLoading;
  return (
    <Containner>
      <HelmetProvider>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
          </title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <BackBtn>
          <Link to={'/'}>
            <FaRegArrowAltCircleLeft />
          </Link>
        </BackBtn>
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </Title>
        <ToggleMode onClick={toggleIsDarkAtom}>
          {isDark ? <RiMoonFill /> : <RiSunFill />}
        </ToggleMode>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes?.USD?.price?.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>chart</Link>
            </Tab>
          </Tabs>

          <Outlet context={{ coinId }} />
        </>
      )}
    </Containner>
  );
}

export default Coin;
