import React, { memo, useCallback, useEffect, useState } from 'react';
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
`

const CalTable = memo(({dayInfo}) => {
  const getWeekend = useCallback((index, isOuter) => {
    let str = "";
    if ((index - 5) % 7 === 0) str += `<div class='td sat`; // 5 배수 + 7면 토요일
    else if ((index - 6) % 7 === 0) str += `<div class='td sun`; // 6 배수 + 7이면 일요일 
    else str += `<div class='td`; // 아니면 걍 평일

    if (isOuter) str += ` outer'>`; // 당월 바깥 날짜면 흐리게
    else str += `'>`;

    return str;
  }, []);

  useEffect(() =>{
		if (!dayInfo) return;

		for (let i = 0; i < 35; i++) {
      const parent = document.querySelector(`.tr${parseInt(i / 7 + 1)}`);
			if (i < dayInfo.startDay) { // 아직 이번달 시작 안함
        parent.innerHTML += `<td>${getWeekend(i, true)}${dayInfo.startDate + i}</div></td>`;
			} else if (i > dayInfo.endDate + dayInfo.startDay - 1) { // 이번달 끝남
        parent.innerHTML += `<td>${getWeekend(i, true)}${i - dayInfo.endDate - dayInfo.startDay + 1}</div></td>`;
			} else { // 이게 이번달 날자들
        parent.innerHTML += `<td>${getWeekend(i, false)}${i + 1 - dayInfo.startDay}</div></td>`;
			}
		}
	}, [dayInfo]);

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