import React, { memo } from 'react';
import styled from 'styled-components';

const Top = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #b6b6ff;
  box-sizing: border-box;

  display: flex;
  flex-flow: row nowrap;
  align-items: end;

  .top__nowYM {
    width: 100%;
    height: 50px;
    background-color: tomato;
    color: black;
    height: 100%;

    h1 {
      padding: 0;
      margin: 0;
      margin-left: 20px;
      display: block;
      height: 100%;
    }
  }

  button {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 10px;
    color: #fff;
    background: none;
    font-size: 30px;

    &:hover {
      cursor: pointer;
      scale: 1.1;
    }
  }
`

const App = memo(() => {
  return (
    <>
      <Top>
        <button>&lt;</button>
        <div className='top__nowYM'>
          <h1>YYYY.MM</h1>
        </div>
        <button>&gt;</button>
      </Top>
    </>
  );
});

export default App;