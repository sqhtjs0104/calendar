import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Top from './components/Top';
import CalTable from './components/CalTable';
import Sidebar from './components/Sidebar';

const MainWrap = styled.div`
  font-family: 'Roboto Mono', monospace;

  width: 100%;
  max-width: 1200px;
  height: 100%;
  max-height: 800px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  margin: auto;
  border: 1px solid #C58940;
  border-radius: 10px;
`;

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000015;
`

const App = memo(() => {
  const [nowTime, setNowTime] = useState(null);
	const [dayInfo, setDayInfo] = useState(null);

	useEffect(() => {
		setNowTime(new dayjs());
	}, []);

	useEffect(() => {
		if (!nowTime) return;
    
		setDayInfo(state => {
			return {
				startDate: nowTime.subtract(1, 'month').endOf('month').get('D') + 1 - nowTime.date(1).get('d') + 1,
				startDay: nowTime.date(1).get('d') - 1,
				endDate: nowTime.endOf('month').get('D'),
			}
		});
	}, [nowTime]);

  return (
    <MainWrap>
      <Top nowTime={nowTime} setNowTime={setNowTime} />
      <CalTable dayInfo={dayInfo} />
      <Overlay />
      <Sidebar />
    </MainWrap>
  );
});

export default App;