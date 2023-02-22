import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';

const TopDiv = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #FAEAB1;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: end;
  border-bottom: 2px solid #eecb93;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;

  .top__nowYM {
    width: 100%;
    height: 50px;
    color: #C58940;
    height: 100%;

    .top__nowYM__info {
      padding: 0 5px;
      margin: 0;
      margin-left: 20px;
      display: inline-block;

      h1, h3 {
        display: inline-block;
        margin: 0 2px;
        line-height: 1;
      }

      &:hover {
        color: #E5BA73;
        cursor: pointer;
      }
    }
  }

  button {
    border: none;
    border-radius: 10px;
    color: #C58940;
    background: none;
    font-size: 25px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    line-height: 1;

    &:hover {
      cursor: pointer;
      scale: 1.1;
    }
  }
`

const Top = memo(({nowTime, setNowTime}) => {
	const toPrev = useCallback(e => {
		e.preventDefault();
		if (!nowTime) return;
		const parents = document.querySelectorAll('tbody > tr');
		parents.forEach(v => {
			v.innerHTML = "";
		});
		setNowTime(state => {
			return nowTime.subtract(1, 'month');
		});
	}, [nowTime]);

	const toNext = useCallback(e => {
		e.preventDefault();
		if (!nowTime) return;
		const parents = document.querySelectorAll('tbody > tr');
		parents.forEach(v => {
			v.innerHTML = "";
		});
		setNowTime(state => {
			return nowTime.add(1, 'month');
		});
	}, [nowTime]);

  return (
    <>
      <TopDiv>
        <button onClick={toPrev}>
            <FontAwesomeIcon icon={faSquareCaretLeft} />
        </button>
        <div className='top__nowYM'>
          <div className='top__nowYM__info'>
						<h1><span>{nowTime && nowTime?.month() + 1}</span>월</h1>
						<h3><span>{nowTime && nowTime?.year()}</span>년</h3>
					</div>
        </div>
        <button onClick={toNext}>
            <FontAwesomeIcon icon={faSquareCaretRight} />
        </button>
      </TopDiv>
    </>
  );
});

export default Top;