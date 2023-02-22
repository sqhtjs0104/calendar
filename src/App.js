import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import Top from './components/Top';
import CalTable from './components/CalTable';
import dayjs from 'dayjs';

const MainWrap = styled.div`
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
    </MainWrap>
  );
});

export default App;