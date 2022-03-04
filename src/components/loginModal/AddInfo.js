import { current } from "immer";
import React, { useState } from "react";
import styled from "styled-components";
import { phoneCheck, urlCheck, nameCheck } from "../../shared/common";
// import { actionCreators as userActions } from "../redux/modules/user";
import { apis } from "../../shared/axios";
import { TextField } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import {
  actionCreators,
  actionCreators as userActions,
} from "../../redux/modules/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const AddInfo = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginClose = props.loginClose
  const [name, setName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [gitUrl, setGitUrl] = React.useState("");
  const [blogUrl, setBlogUrl] = React.useState("");
  const [job, setJob] = React.useState("");

  const [page, setPage] = React.useState("0");

  const [nameError, setNameError] = React.useState("");
  const [phoneNumError, setPhoneNumError] = React.useState("");
  const [gitUrlError, setGitUrlError] = React.useState("");
  const [jobError, setJobError] = React.useState("");

  const [stack, setStack] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setStack([...stack, id]);
      console.log("체크 반영 완료");
    } else {
      setStack(stack.filter((e) => e !== id));
      console.log("체크 해제 반영 완료");
    }
  };
  console.log(stack);

  const isAllChecked = stack.length === 2;
  const disabled = !isAllChecked;

  const goNext = () => {

    if (!nameCheck(name) || name.length < 2) {
      setNameError("이름을 입력해주세요");
      return;
    }
    setNameError("");

    // if (!phoneCheck(phoneNum)) {
    //   setPhoneNumError("올바른 번호를 입력하세요");
    //   return;
    // }
    // setPhoneNumError("");

    if (!urlCheck(gitUrl) || gitUrl.length < 0) {
      setGitUrlError("URL형식이 잘못되었습니다.");
      return
    }
    setGitUrlError("");

    // if (!nameCheck(job) || job.length < 2) {
    //   setJobError("직업을 입력해주세요")
    //   return;
    // } else setJobError("");

    setPage("2");
  };
  const addInfo = () => {
    console.log(name, stack, phoneNum, gitUrl, blogUrl);

    dispatch(userActions.userInfoDB(name, stack, phoneNum, gitUrl, blogUrl));
    loginClose(false)
  };

  return (
    <>
      {page === "0" && (
        <>
          <TextContainer>
            <h1>추가정보를 입력하시겠어요?</h1>
          </TextContainer>
          <ImgInputBox>
            <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/111.jpeg' />
            <p>회원가입을 완료했어요👏👏</p>
            <p>추가정보를 3가지만 입력하면</p>
            <p>Portfolio의 다양한 기능을 이용할 수 있어요.</p>
            <p>최신 프로젝트까지 추천드릴께요.</p>
          </ImgInputBox>
          <div>
            <span>
              <CloseBtn
                onClick={() => {
                  window.location.replace("/");
                }}
              >
                다음에 할게요
              </CloseBtn>
            </span>
            <ContinueBtn
              onClick={() => {
                setPage("1");
              }}
            >
              추가정보 입력하기
            </ContinueBtn>
          </div>
        </>
      )}
      {page === "1" && (
        <>
          <TextContainer>
            <h1>추가정보 입력하기 (1/2)</h1>
            <p>몇가지 정보만 더 기입하면 돼요!</p>

          </TextContainer>
          <InputBox>
            <TextField
              style={{ marginTop: "55px" }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              variant='standard'
              fullWidth
              id='name'
              name='name'
              placeholder='이름*'
              error={nameError !== "" || false}
            />
            {nameError && (
              <span style={{ fontSize: "12px", color: "red" }}>{nameError}</span>
            )}

            <TextField
              onChange={(e) => {
                setGitUrl(e.target.value);
              }}
              style={{ marginTop: "35px" }}
              required
              variant='standard'
              fullWidth
              id='gitURL'
              name='gitURL'
              placeholder='gitURL*'
              error={gitUrlError !== "" || false}
            />
            {gitUrlError && (
              <span style={{ fontSize: "12px", color: "red" }}>
                {gitUrlError}
              </span>
            )}
            <TextField
              onChange={(e) => {
                setBlogUrl(e.target.value);
              }}
              style={{ marginTop: "35px" }}
              variant='standard'
              fullWidth
              id='blogurl'
              name='blogurl'
              placeholder='blogURl'
            // error={blogUrlError !== '' || false}
            />
            {/* {blogUrlError && <span style={{ fontSize: "12px", color: "red" }}>{blogUrlError}</span>} */}
            <TextField
              onChange={(e) => {
                setPhoneNum(e.target.value);
              }}
              style={{ marginTop: "35px" }}
              variant='standard'
              fullWidth
              id='phone'
              name='phone'
              placeholder='전화번호'
            // error={phoneNumError !== "" || false}
            />
            {/* {phoneNumError && (
            <span style={{ fontSize: "12px", color: "red" }}>
              {phoneNumError}
            </span>
          )} */}

            <TextField
              onChange={(e) => {
                setJob(e.target.value);
              }}
              style={{ marginTop: "35px" }}
              variant='standard'
              fullWidth
              id='job'
              name='job'
              placeholder='직무'
            // error={jobError !== "" || false}
            />
            {/* {jobError && (
            <span style={{ fontSize: "12px", color: "red" }}>{jobError}</span>
          )} */}
            <WriteBtn
              disabled={!name || !gitUrl ? true : false}
              onClick={goNext}
            >
              다음{">"}
            </WriteBtn>

          </InputBox>

        </>
      )}
      {page === "2" && (
        <>
          <TextContainer>
            <h1>나를 대표하는 프레임워크 <br /> 3가지를 골라주세요(2/2)</h1>
            <p>Portfolio 추천 프로젝트에 반영될 수 있어요!</p>

          </TextContainer>
          <Grid style={{ paddingTop: "50px" }}>
            <StyledBox>
              <input
                type='checkbox'
                id='JS'
                checked={stack.includes("JS") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "JS");
                }}

              ></input>
              <label id='JS' htmlFor='JS'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  JS
                </span>
              </label>
            </StyledBox>

            <StyledBox>
              <input
                type='checkbox'
                id='JAVA'
                checked={stack.includes("JAVA") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "JAVA");
                }}
              ></input>
              <label id='JAVA' htmlFor='JAVA'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  JAVA
                </span>
              </label>
            </StyledBox>

            <StyledBox>
              <input
                type='checkbox'
                id='PYTHON'
                checked={stack.includes("PYTHON") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "PYTHON");
                }}
              ></input>
              <label id='PYTHON' htmlFor='PYTHON'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  PYTHON
                </span>
              </label>
            </StyledBox>
          </Grid>
          <Grid>
            <StyledBox>
              <input
                type='checkbox'
                id='C'
                checked={stack.includes("C") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "C");
                }}
              ></input>
              <label id='C' htmlFor='C'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  C
                </span>
              </label>
            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='C++'
                checked={stack.includes("C++") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "C++");
                }}
              ></input>
              <label id='C++' htmlFor='C++'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  C++
                </span>
              </label>

            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='iOS'
                checked={stack.includes("iOS") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "iOS");
                }}
              ></input>
              <label id='iOS' htmlFor='iOS'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  iOS
                </span>
              </label>

            </StyledBox>
          </Grid>
          <Grid>
            <StyledBox>
              <input
                type='checkbox'
                id='Android'
                checked={stack.includes("Android") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "Android");
                }}
              ></input>
              <label id='Android' htmlFor='Android'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  Android
                </span>
              </label>

            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='REACT'
                checked={stack.includes("REACT") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "REACT");
                }}
              ></input>
              <label id='REACT' htmlFor='REACT'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  REACT
                </span>
              </label>

            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='Spring'
                checked={stack.includes("Spring") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "Spring");
                }}
              ></input>
              <label id='Spring' htmlFor='Spring'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  Spring
                </span>
              </label>

            </StyledBox>
          </Grid>
          <Grid>
            <StyledBox>
              <input
                type='checkbox'
                id='Node.js'
                checked={stack.includes("Node.js") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "Node.js");
                }}
              ></input>
              <label id='Node.js' htmlFor='Node.js'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  Node.js
                </span>
              </label>

            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='Vue.js'
                checked={stack.includes("Vue.js") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "Vue.js");
                }}
              ></input>
              <label id='Vue.js' htmlFor='Vue.js'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  Vue.js
                </span>
              </label>

            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='Git'
                checked={stack.includes("Git") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "Git");
                }}
              ></input>
              <label id='Git' htmlFor='Git'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  Git
                </span>
              </label>

            </StyledBox>
          </Grid>
          <div>
            <WriteBtn
              disabled={stack.length < 3 ? true : false}
              onClick={addInfo}
            >
              가입하기
            </WriteBtn>
          </div>
        </>
      )}
    </>
  );
};

export default AddInfo;

const TextContainer = styled.div`
  width:370px;
  height: 38px;
  margin: 80px 115px 70px 115px;
  h1{
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  p{
    text-align: center;
    font-size: 16px;
    font-weight: normal;
  }
`;
const ImgInputBox = styled.div`
  width:350px;
  height: 240px;
  margin: 70px 115px 193px 115px;
  img{
    width: 200px;
    margin-bottom: 17px;
  }
  p{
    margin-top: 8px;
    text-align: center;
    font-size: 16px;
    font-weight: normal;
  }
`;

const InputBox = styled.div`
  width:350px;
  height: 240px;
  margin: 70px 115px 193px 115px;
`;

const WriteBtn = styled.button`
  cursor: pointer;
  width: 88px;
  height: 40px;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  margin: 156px 0px 0px 262px ;
  padding: 5px 18px 5px 18px;
  color: white;
  background-color: #333333;
  :disabled{
    border: none;
    background-color: gray;
  }
`;
const StyledBox = styled.span`
  padding: 0px 5px 0px 5px;
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
  span{
    font-size: 20px;
    position: relative;
    top: 20%;
  }
  input[type="checkbox"] + label {
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    border: 2px solid #333333;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    color:white;
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    background-color: #333333;
    border: 2px solid #333333;
    cursor: pointer;
  }
`;
const Grid = styled.div`
  
  padding-bottom: 20px;
`;
const ContinueBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 20%;
  top: 83%;
  width: 145px;
  height: 42px;
  border-radius: 25px;
  font-size: 14px;
  padding: 15px 20px;
  border-radius: 30px;
  border: none;
  color: white;
  background-color: #333333;
  :disabled {
    border: none;
    background-color: gray;
  }
`;

const CloseBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 55%;
  top: 83%;
  width: 145px;
  height: 42px;
  border-radius: 30px;
  font-size: 14px;
  padding: 15px 20px;
  border: none;
  color: white;
  background-color: #999999;
  :disabled {
    border: none;
    background-color: gray;
  }
`;

const Wrap = styled.div`
  padding: 10px;
  margin: 90px 0px 0px 0px;
`;
