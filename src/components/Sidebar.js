import React, { memo } from 'react';
import styled from 'styled-components';

const SideMenu = styled.div`
  width: 25%;
  max-width: 400px;
  min-width: 200px;
  height: 100%;
  max-height: 800px;
  background-color: #fffbf1;
  position: absolute;
  left: 75%;
  top: 0;
  box-sizing: border-box;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 1px solid #aaa;
  padding: 15px;

  .sideBar__top, .sideBar__top__time {
    display: flex;
    flex-flow: row nowrap;
  }

  .sideBar__top {
    justify-content: space-between;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;

    button {
      font-size: 20px;
      margin: 0;
      padding: 5px;
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
    }
    h2 {
      font-size: 30px;
    }
    h3 {
      font-size: 28px;
    }
    span {
      font-size: 22px;
      margin-left: 2px;
      margin-right: 5px;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0 10px;
    margin-bottom: 20px;

    li {
      margin-bottom: 10px;

      div {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        h4 {
          padding: 0;
          margin: 0;
          margin-bottom: 2px;
          font-size: 20px;
        }

        button {
          border: none;
          background: none;
          font-size: 12px;

          &:hover {
            cursor: pointer;
          }
        }
      }

      p {
        margin: 0;
        text-align: right;
      }
    }
  }

  .newSchedule {
    width: 100%;

    input {
      box-sizing: border-box;
      border: 1px solid #aaa;
      border-radius: 5px;
      background: #fff;
      padding: 4px;
      font-size: 20px;
      width: 100%;
      margin-bottom: 5px;
    }

    div {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin-bottom: 5px;

      > input {
        width: 49%;
        font-size: 14px;
      }
    }
    
    button {
      width: 100%;
      font-size: 20px;
      font-weight: 800;
      background-color: #88a7d4;
      padding: 5px;
      border: none;
      border-radius: 5px;
      color: white;

      &:hover {
        cursor: pointer;
        background-color: #3232b4;
      }
    }
  }
`

const Sidebar = memo(() => {
  return (
    <SideMenu>
      <div className='sideBar__top'>
        <div className='sideBar__top__time'><h2>DD</h2><span>일</span><h3>d</h3><span>요일</span></div>
        <button>X</button>
      </div>

      <ul>
          <li>
            <div>
              <h4>일정명</h4>
              <button>X</button>
            </div>
            <p>
              <span>장소명</span>
              <span>시간</span>
            </p>
          </li>
        </ul>

      <form class="newSchedule">
        <input type="text" placeholder="스케줄명" />
        <div>
          <input type="text" placeholder="장소" />
          <input type="time" />
        </div>
        <button type='submit'>저장하기</button>
      </form>
    </SideMenu>
  );
});

export default Sidebar;