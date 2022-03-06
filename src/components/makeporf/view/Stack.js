import React, { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import { grey } from '@mui/material/colors'

import Grid from '@mui/material/Grid';

export const options = [
  { value: "python", label: "python" },
  { value: "javascript", label: "javascript" },
  { value: "spring", label: "spring" },
];

function Stack() {
  const animatedComponents = makeAnimated();
  const [stack, setStack] = useState([]);
  const [addStack, setAddStack] = useState([]);
  const defaultStack = ["JS", "JAVA", "PYTHON", "C", "C++", "iOS", "Android", "React", "Spring", "Node.js", "Vue.js", "git"]
  const changeHandler = (checked, id) => {
    if (checked) {
      setStack([...stack, id]);
      console.log("체크 반영 완료");
    } else {
      setStack(stack.filter((e) => e !== id));
      console.log("체크 해제 반영 완료");
    }
  };

  const handleChange = (e) => {
    let stackArray = [];
    e.map((addStack) => {
      return stackArray.push(addStack.value);
    });
    setAddStack(stackArray);
  };

  useEffect(() => {
    console.log("axios 스택 보내기");
  }, [addStack]);

  return (
    <>

      <div style={{ width: "1120px" }}>

        {stack.length > 3 ? (
          <p style={{ fontSize: "12px", color: "red" }}>
            3가지만 골라주세요
          </p>
        ) : <p style={{ color: "inherit", fontSize: "12px" }}>3가지만 골라주세요</p>}
        <StackBox>
          {defaultStack.map((s, index) => {
            return (
              <StyledBox>
                <input
                  type="checkbox"
                  id={s}
                  checked={stack.includes(`${s}`) ? true : false}
                  onChange={(e) => {
                    changeHandler(e.currentTarget.checked, `${s}`);
                  }}
                ></input>
                <label id={s} htmlFor={s}>
                  <span>
                    <img
                      alt=""
                      src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
                    />
                    {s}
                  </span>
                </label>
              </StyledBox>
            )
          })}
        </StackBox>

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={options}
          isMulti
          onChange={handleChange}
        />
        <StackBox>
          {stack.map((addStack, index) => {
            return (
              <SelectStack key={index}{...addStack}>
                {addStack}
                <ClearIcon
                  sx={{ fontSize: 14, color: grey[500], marginLeft: 1 }} onClick={() => { alert("@@") }}></ClearIcon>
              </SelectStack>
            )
          })}

        </StackBox>
      </div>
    </>
  );
}

const StackBox = styled.div`
  margin: 10px 0px;
  width: 1120px;
  height: 160px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: white;
`;

const SelectStack = styled.button`
  margin: 15px 15px;
  padding: 10px;
  width: 145px;
  height: 40px;
  font-size: 17px;
  border: 1px solid #cccccc;
  border-radius: 100px;
  text-align: center;
`;

const Wrap = styled.div`
  padding-bottom: 20px;
`;

const StyledBox = styled.button`
  border: none;
  background-color: white;
  padding: 10px 15px 10px 15px;
  margin-top: 5px;
  border-radius: 10px;
  img {
    border-radius: 5px;
    background-color: gray;
    width: 20px;
    height: 20px;
    position: relative;
    top: 5%;
    padding: 1px;
    object-fit: cover;
    margin-right: 5px;
  }
  input[type="checkbox"] {
    display: none;
  }
  span {
    font-size: 20px;
    position: relative;
    top: 20%;
  }
  input[type="checkbox"] + label {
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    border: 2px solid #cccccc;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    color: white;
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    background-color: #333333;
    border: 2px solid #333333;
    cursor: pointer;
  }
`;
export default Stack;
