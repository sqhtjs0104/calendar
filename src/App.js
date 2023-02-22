import React, { memo, useState, useEffect } from 'react';
import Top from './components/Top';
import CalTable from './components/CalTable';
import dayjs from 'dayjs';

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
				startDate: nowTime.subtract(1, 'month').endOf('month').get('D') - nowTime.date(1).get('d') + 1,
				startDay: nowTime.date(1).get('d'),
				endDate: nowTime.endOf('month').get('D'),
			}
		});
	}, [nowTime]);

  return (
    <>
      <Top nowTime={nowTime} setNowTime={setNowTime} />
      <CalTable dayInfo={dayInfo} />
    </>
  );
});

export default App;