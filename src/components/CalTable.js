import React, { memo, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #FAF8F1;
  table-layout: fixed;
  padding: 20px 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  th {
    border: 5px solid #FAF8F1;
    text-align: left;
  }

  th {
    background-color: #F0A04B;
    padding: 2px 5px;
    border-radius: 10px;
    font-size: 13px;
  }

  td {
    border: 5px solid #FAF8F1;
    font-size: 15px;
    box-sizing: border-box;

    .td {
      vertical-align : top;
      padding: 10px;
      height: 80%;
      border: 1px solid #aaa;
      border-radius: 10px;

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
        scale: 1.1;
      }
    }
  }
`;

const CalTable = memo(({dayInfo, setIsSidebarOpen, setCurrentSidebarTarget}) => {
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

    newDiv.classList.add('td');
    newDiv.addEventListener('click', openSidebar);
    newDiv.dataset.date = value;
    newDiv.dataset.day = index % 7;

    if (index % 7 === 5) {
      newDiv.classList.add('sat');
    } else if (index % 7 === 6) {
      newDiv.classList.add('sun');
    }

    if (isOuter) newDiv.classList.add('outer');

    newDiv.innerHTML = value;

    newTd.appendChild(newDiv);
    return newTd;
  }, [openSidebar]);

  useEffect(() =>{
		if (!dayInfo) return;

		for (let i = 0; i < 35; i++) {
      const parent = document.querySelector(`.tr${parseInt(i / 7 + 1)}`);
			if (i < dayInfo.startDay) { // 아직 이번달 시작 안함
        parent.appendChild(makeDayTd(i, true, dayInfo.startDate + i));
			} else if (i > dayInfo.endDate + dayInfo.startDay - 1) { // 이번달 끝남
        parent.appendChild(makeDayTd(i, true, i - dayInfo.endDate - dayInfo.startDay + 1));
			} else { // 이게 이번달 날자들
        parent.appendChild(makeDayTd(i, false, i + 1 - dayInfo.startDay));
			}
		}
	}, [dayInfo, makeDayTd]);

  return (
    <Table>
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
      </tbody>
    </Table>
  );
});

export default CalTable;