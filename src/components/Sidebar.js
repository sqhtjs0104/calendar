import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SideMenu = styled.div`
  --standard: 100px;
  @media screen and (max-width: 1000px) and (min-width: 451px) { --standard: 130px; }
  @media screen and (max-width: 450px) { --standard: 100px; }

  width: 25%;
  max-width: 400px;
  min-width: 200px;
  height: 100%;
  max-height: 800px;
  background-color: #fffbf1;
  position: absolute;
  left: 100%;
  top: 0;
  box-sizing: border-box;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 1px solid #aaa;
  transition: all 0.5s;

  @media screen and (max-width: 1000px) and (min-width: 451px) {
    width: 40%;
    max-height: none;
  }
  @media screen and (max-width: 450px) {
    width: 60%;
    max-height: none;
  }

  visibility: hidden;
  &.active {
    visibility: visible;
    left: 75%;
    @media screen and (max-width: 1000px) and (min-width: 451px) {
      left: 60%;
    }
    @media screen and (max-width: 450px) {
      left: 40%;
    }
  }

  .sideBar__top, .sideBar__top__time {
    display: flex;
    flex-flow: row nowrap;
  }

  .sideBar__top {
    width: 100%;
    height: 8%;
    max-height: 8%;
    padding: calc(var(--standard) / 100 * 10);
    box-sizing: border-box;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;

    button {
      font-size: calc(var(--standard) / 100 * 20);
      margin: 0;
      padding: calc(var(--standard) / 100 * 5);
      border: none;
      border-radius: 5px;
      background: none;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .sideBar__top__time {
    align-items: end;
    h2, h3 {
      margin: 0;
      line-height: 1;
      font-weight: 600;
    }
    h2 {
      font-size: calc(var(--standard) / 100 * 30);
    }
    h3 {
      font-size: calc(var(--standard) / 100 * 22);
    }
    span {
      font-size: calc(var(--standard) / 100 * 16);
      margin-left: calc(var(--standard) / 100 * 2);
      margin-right: calc(var(--standard) / 100 * 5);
    }
  }

  .sidebar__body {
    width: 100%;
    height: 92%;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
  .sideBar__list {
    width: 100%;
    height: calc(var(--standard) * 5);
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    padding: calc(var(--standard) / 100 * 15);
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: calc(var(--standard) / 100 * 10);
    }
    ::-webkit-scrollbar-thumb {
      background-color: #a5a5a5;
      background-clip: padding-box;
      border: calc(var(--standard) / 100 * 3) solid #ffffff00;
      border-radius: calc(var(--standard) / 100 * 30);
    }
    ::-webkit-scrollbar-track {
      background-color: none;
    }

    li {
      margin-bottom: calc(var(--standard) / 100 * 10);
      padding: calc(var(--standard) / 100 * 5);
      border: 1px solid #ddd;
      background-color: #fff;
      border-radius: calc(var(--standard) / 100 * 5);

      .scheduleList__top {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-bottom: calc(var(--standard) / 100 * 10);

        h4 {
          padding: 0;
          margin: 0;
          margin-bottom: calc(var(--standard) / 100 * 2);
          font-size: calc(var(--standard) / 100 * 16);
        }

        button {
          border: none;
          background: none;
          font-size: calc(var(--standard) / 100 * 14);

          &:hover {
            cursor: pointer;
          }
        }
      }

      p {
        margin: 0;
        text-align: right;
        font-size: calc(var(--standard) / 100 * 12);

        span {
          margin-left: calc(var(--standard) / 100 * 10);
          color: #666;
        }
      }
    }
  }

  .newSchedule {
    width: 100%;
    padding: calc(var(--standard) / 100 * 15);
    border-top: 1px solid #ddd;
    box-sizing: border-box;

    label {
      font-size: calc(var(--standard) / 100 * 14);
      display: block;
      margin-bottom: calc(var(--standard) / 100 * 3);
    }

    input {
      box-sizing: border-box;
      border: calc(var(--standard) / 100 * 1) solid #aaa;
      border-radius: calc(var(--standard) / 100 * 5);
      background: #fff;
      padding: calc(var(--standard) / 100 * 4);
      font-size: calc(var(--standard) / 100 * 14);
      width: 100%;
      margin-bottom: calc(var(--standard) / 100 * 5);

      &:last-of-type {
        margin-bottom: calc(var(--standard) / 100 * 15);
      }
    }
    
    button {
      width: 100%;
      font-size: calc(var(--standard) / 100 * 20);
      font-weight: 700;
      background-color: #88a7d4;
      padding: calc(var(--standard) / 100 * 5);
      border: none;
      border-radius: calc(var(--standard) / 100 * 5);
      color: white;

      &:hover {
        cursor: pointer;
        background-color: #5151d8;
      }
    }
  }
`;

const test = [
  {
    name: "test",
    place: "test",
    time: "time",
  },
  {
    name: "test",
    place: "test",
    time: "time",
  },
  {
    name: "test",
    place: "test",
    time: "time",
  },
  {
    name: "test",
    place: "test",
    time: "time",
  },
  {
    name: "test",
    place: "test",
    time: "time",
  },
  {
    name: "test",
    place: "test",
    time: "time",
  },
  {
    name: "test",
    place: "test",
    time: "time",
  },
]

const Sidebar = memo(({isOpen, setIsSidebarOpen, targetDate}) => {
  const onClodeButtonClick = useCallback(e => {
    e.preventDefault();
    setIsSidebarOpen(false);
  }, [setIsSidebarOpen]);

  const onNewScheduleAdd = useCallback(e => {
    e.preventDefault();
    console.log(e.currentTarget.time.value);
  }, []);

  return (
    <SideMenu className={isOpen ? "active" : ""}>
      <div className='sideBar__top'>
        <div className='sideBar__top__time'>
          <h2>{targetDate && targetDate.date}</h2>
          <span>일</span>
          <h3>
            {
              targetDate && (
                targetDate?.day === "0" ? '월' :
                targetDate?.day === "1" ? '화' :
                targetDate?.day === "2" ? '수' :
                targetDate?.day === "3" ? '목' :
                targetDate?.day === "4" ? '금' :
                targetDate?.day === "5" ? '토' :
                targetDate?.day === "6" ? '일' : '??'
              )
            }
          </h3>
          <span>요일</span>
        </div>
        <button onClick={onClodeButtonClick}><FontAwesomeIcon icon={faXmark} /></button>
      </div>

      <div className="sidebar__body">
      <ul className='sideBar__list'>
        {
          test && test.map((v, i) => {
            return (
              <li key={i}>
                <div className='scheduleList__top'>
                  <h4>{v?.name}</h4>
                  <button><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                <p>
                  <span>{v?.place}</span>
                  <span>{v?.time}</span>
                </p>
              </li>
            )
          })
        }
      </ul>

      <form className="newSchedule" onSubmit={onNewScheduleAdd}>
        <label htmlFor="title">이름</label><input type="text" placeholder="스케줄명" name='title' id='title' />
        <label htmlFor="place">장소</label><input type="text" placeholder="장소" name='place' id='place' />
        <label htmlFor="time">시간</label><input type="time" name='startTime' id='time' />
        <label htmlFor="endTime">종료일시</label><input type="datetime-local" name='endTime' id='endTime' />
        <button type='submit'>일정 추가</button>
      </form>
      </div>
    </SideMenu>
  );
});

export default Sidebar;