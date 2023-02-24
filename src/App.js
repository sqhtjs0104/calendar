import React, { memo, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Top from './components/Top';
import CalTable from './components/CalTable';
import Sidebar from './components/Sidebar';

const MainWrap = styled.div`
  --standard: 100px;
  @media screen and (max-width: 1000px) and (min-width: 451px) { --standard: 130px; }
  @media screen and (max-width: 450px) { --standard: 100px; }

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
  overflow: hidden;

  @media screen and (max-width: 1000px) and (min-width: 451px) {
    max-height: none;
  }
  @media screen and (max-width: 450px) {
    max-height: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000015;

  visibility: hidden;
  &.active {
    visibility: visible;
  }
`;

const test = [
  {
    time: "2023-02-20"
  }
];

const App = memo(() => {
  const [nowTime, setNowTime] = useState(null);
	const [dayInfo, setDayInfo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSidebarTarget, setCurrentSidebarTarget] = useState(null);
  const [schedule, setSchedule] = useState(null);

	useEffect(() => {
		setNowTime(new dayjs());
    setSchedule(test);
	}, []);

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

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

  const onFocusOut = useCallback(e => {
    e.preventDefault();
    setIsSidebarOpen(false);
  }, [setIsSidebarOpen]);

  return (
    <MainWrap>
      <Top nowTime={nowTime} setNowTime={setNowTime} />
      <CalTable dayInfo={dayInfo} setIsSidebarOpen={setIsSidebarOpen} setCurrentSidebarTarget={setCurrentSidebarTarget} />
      <Overlay className={isSidebarOpen ? "active" : ""} onClick={onFocusOut} />
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} targetDate={currentSidebarTarget} />
    </MainWrap>
  );
});

export default App;