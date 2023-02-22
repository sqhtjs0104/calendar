import React, { memo } from 'react';
import styled from 'styled-components';

const Td = styled.td`
	border: 5px solid #FAF8F1;
	font-size: 15px;
	box-sizing: border-box;

	.td {
		vertical-align : top;
		padding: 10px;
		height: 80%;
		border: 1px solid #aaa;
		border-radius: 10px;

		&:hover {
			cursor: pointer;
			scale: 1.1;
		}
	}
`

const Day = memo(props => {
  return (
    <Td>
      <div className="td">{props.date}</div>
    </Td>
  );
});

export default Day;