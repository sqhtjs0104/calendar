import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { useSelector, useDispatch } from 'react-redux';
import { getCurrentData } from '../slices/ScheduleSlice';

const Table = styled.table`
  --standard: 100px;
  @media screen and (max-width: 1000px) and (min-width: 451px) { --standard: 100px; }
  @media screen and (max-width: 450px) { --standard: 100px; }
  
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #FAF8F1;
  table-layout: fixed;
  padding: calc(var(--standard) / 100 * 20) calc(var(--standard) / 100 * 10);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  @media screen and (max-width: 450px) {
    border-collapse: collapse;
  }

  th {
    background-color: #F0A04B;
    padding: calc(var(--standard) / 100 * 2) calc(var(--standard) / 100 * 5);
    border-bottom: calc(var(--standard) / 100 * 5) solid #FAF8F1;
    border-radius: calc(var(--standard) / 100 * 10);
    font-size: calc(var(--standard) / 100 * 13);
    text-align: left;

    @media screen and (max-width: 450px) {
      border-radius: 0
    }
  }

  td {
    font-size: calc(var(--standard) / 100 * 15);
    border: 1px solid #aaa;
    border-radius: 10px;
    background-color: #FAF8F1;
    word-break: break-all;
    height: 20%;
    box-sizing: border-box;

    .td__div {
      height: 100%;
      max-height: ${props => props.heightUnit}px;
      overflow: hidden;
      box-sizing: border-box;

      @media screen and (max-width: 450px) {
        border: 3px solid #f7f3ec;
      }

      &.sat {
        color: #3850d8;
      }

      &.sun {
        color: #d33838;
      }

      &.outer {
        opacity: 0.4;
      }

      &:hover {
        cursor: pointer;
        scale: 1.03;
        background-color: #f7f3ec;
      }

      .td__date {
        margin: 0;
        padding: calc(var(--standard) / 100 * 6);
        font-size: calc(var(--standard) / 100 * 14);
      }

      .td__list {
        width: 100%;
        font-size: calc(var(--standard) / 100 * 10);
        margin-bottom: calc(var(--standard) / 100 * 2);
        text-align: right;
        padding-right: calc(var(--standard) / 100 * 5);
        box-sizing: border-box;
        text-overflow: ellipsis;
      }
    }
  }
`;

const CalTable = memo(({nowTime, setIsSidebarOpen, setCurrentSidebarTarget}) => {
  const { data, loading, error } = useSelector(state => state.ScheduleSlice);
  const dispatch = useDispatch();

  const [isSixWeek, setIsSixWeek] = useState(false);
  const [heightUnit, setHeightUnit] = useState(null);

  const openSidebar = useCallback(e => {
    e.preventDefault();
    setCurrentSidebarTarget(state => {
      const temp = {
        date: e.currentTarget.dataset.date,
        day: e.currentTarget.dataset.day,
      }
      return temp;
    });
    setIsSidebarOpen(true);
  }, [setCurrentSidebarTarget, setIsSidebarOpen]);

  const makeDayTd = useCallback((index, isOuter, value) => {
    const newTd = document.createElement('td');    
    const newDiv = document.createElement('div');

    const targetDate = nowTime.add(index, 'M').date(value);

    newDiv.setAttribute('id', targetDate.format('YYYY-MM-DD'));
    newDiv.classList.add('td__div');
    newDiv.addEventListener('click', openSidebar);
    newDiv.dataset.date = value;
    newDiv.dataset.day = targetDate.get('d') % 7;

    if (newDiv.dataset.day % 7 === 5) {
      newDiv.classList.add('sat');
    } else if (newDiv.dataset.day % 7 === 6) {
      newDiv.classList.add('sun');
    }

    if (isOuter) newDiv.classList.add('outer');

    const dateValue = document.createElement('div');
    dateValue.classList.add('td__date');
    dateValue.innerHTML = value;
    newDiv.appendChild(dateValue);
    newTd.appendChild(newDiv);

    return newTd;
  }, [nowTime, openSidebar]);

  useEffect(() =>{
		if (!nowTime) return;

    const firstDay = nowTime.date(1).get('d');
    const isSix = firstDay == 0;
    setIsSixWeek(isSix);
    const dayInfo = {
      startDate: nowTime.subtract(1, 'month').endOf('month').get('D') - (isSix ? 7 : firstDay) + 2,
      startDay: isSix ? 6 : firstDay - 1,
      endDate: nowTime.endOf('month').get('D'),
    };

		for (let i = 0; i < (isSix ? 42 : 35); i++) {
      const parent = document.querySelector(`.tr${parseInt(i / 7 + 1)}`);
			if (i < dayInfo.startDay) { // 아직 이번달 시작 안함
        parent.appendChild(makeDayTd(-1, true, dayInfo.startDate + i));
			} else if (i > dayInfo.endDate + dayInfo.startDay - 1) { // 이번달 끝남
        parent.appendChild(makeDayTd(1, true, i - dayInfo.endDate - dayInfo.startDay + 1));
			} else { // 이게 이번달 날자들
        parent.appendChild(makeDayTd(0, false, i + 1 - dayInfo.startDay));
			}
		};
	}, [nowTime]);

  const insertSchedule = useCallback(data => {
    const start = dayjs(data.yearMonth + data.date);
    const end = data.endTime ? dayjs(data.endTime.split(' ')[0]) : dayjs(start);
    const during = Math.ceil(end.diff(start) / 1000 / 60 / 60 / 24);

    for (let i = 0; i <= during; i++) {
      if (start.add(i, 'd').isBefore(end.add(1, 'd'))) {
        const target = document.getElementById(start.add(i, 'd').format('YYYY-MM-DD'));
        if (target) {
          const scheduleItem = document.createElement('div');
          scheduleItem.classList.add('td__list');

          scheduleItem.innerHTML = data.name;
          target.appendChild(scheduleItem);
        }
        start.add(1, 'd');
      } else break;
    }
  }, []);

  useEffect(() => {
    if (!nowTime) return;
    if (!data) {
      dispatch(getCurrentData());
      return;
    };

    data.forEach(v => {
      insertSchedule(v);
    });
  }, [nowTime, data]);

  const onResize = useCallback(() => {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;
    setHeightUnit(isSixWeek ? tbody.scrollHeight / 6 - 5 : tbody.scrollHeight / 5 - 5);
  }, [isSixWeek]);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
  });

  return (
    <Table heightUnit={heightUnit}>
      <thead>
        <tr>
          <th>MON</th>
          <th>TUE</th>
          <th>WED</th>
          <th>THU</th>
          <th>FRI</th>
          <th>SAR</th>
          <th>SUN</th>
        </tr>
      </thead>
      <tbody>
        <tr className="tr1" />
        <tr className="tr2" />
        <tr className="tr3" />
        <tr className="tr4" />
        <tr className="tr5" />
        <tr className="tr6" />
      </tbody>
    </Table>
  );
});

export default CalTable;