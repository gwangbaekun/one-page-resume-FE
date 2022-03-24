import React from "react";
import styled from "styled-components";
import { apis } from "../../shared/axios";
import { useState } from "react";
import { TextField } from "@mui/material";
import { emailCheck } from "../../shared/common";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { orange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../../shared/kakaoAuth';

const theme = createTheme({
  palette: {
    error: orange,
  },
});

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focuscolor"
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focuscolor
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focuscolor
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focuscolor
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focuscolor
    }
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    color: "white",
    width: '100%',
    borderBottom: '1px solid white',
  },
  "& input: internal+autofill+selected": {
    backgroundImage: "none",
    backgroundColor: "black",
    color: "none",
  },
  '& input:valid + fieldset': {
  },
  '& input:invalid + fieldset': {
  },
  '& input:valid:focus + fieldset': { // override inline-style
  },
}));

const Start = (props) => {
  const history = useHistory();

  const userInfo = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const statusFunction = props.status;
  const emailFunction = props.email;

  const [email, setEmail] = React.useState();
  const [emailError, setEmailError] = useState("");

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const sumitEmail = () => {
    if (!emailCheck(email) || !email) {
      setEmailError("이메일 형식을 다시 확인해주세요!");
      return;
    }

    // statusFunction(true)

    apis.dupCheck(email).then((res) => {
      emailFunction(email);
      if (res.data.result === true) {
        return statusFunction(true);
      }
      statusFunction(false);
    });
  };

  return (
    <>
      <TextContainer>
        <h1>시작하기</h1>
        <p>환영합니다 이메일을 입력해주세요.</p>
      </TextContainer>
      <ThemeProvider theme={theme}>
        <InputBox>
          <CssTextField
            focuscolor="#00C4B4"
            onChange={inputEmail}
            variant="standard"
            required
            fullWidth
            type="email"
            id="email"
            name="email"
            placeholder="이메일 주소"
            error={emailError !== "" || false}
          />
          {emailError && (
            <span style={{ fontSize: "12px", color: "orange" }}>{emailError}</span>
          )}

          <WriteBtn
            disabled={!email || !email ? true : false}
            onClick={sumitEmail}
          >
            계속하기
          </WriteBtn>
        </InputBox>
      </ThemeProvider>
      <OrBox>
        <Line />
        <Or>또는</Or>
        <KakaoBtn onClick={() => {
          window.location.href = `${KAKAO_AUTH_URL}`;
        }}>
          <img
            style={{ marginRight: "75px" }}
            alt="" src={process.env.PUBLIC_URL + "/img/kakao.svg"} />
          카카오로 시작하기
        </KakaoBtn>
      </OrBox>
    </>
  );
};

export default Start;

const TextContainer = styled.div`
  width: 350px;
  height: 102px;
  margin: 80px 115px 130px 115px;
  h1 {
    text-align: left;
    font-size: 36px;
    font-weight: 600;
    color: #FFFFFF;
  }
  p {
    text-align: left;
    margin-top: 34px;
    margin-bottom: 60px;
    font-size: 16px;
    font-weight: normal;
    color: #CFD3E2CC;
  }
`;

const InputBox = styled.div`
  width: 350px;
  height: 97px;
  margin: 0px 115px 193px 115px;
`;

const WriteBtn = styled.button`
  cursor: pointer;
  width: 88px;
  height: 40px;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  margin: 25px 0px 0px 262px;
  padding: 5px 18px 5px 18px;
  color: white;
  background-color: #00C4B4;
  :disabled {
    border: none;
    background-color: #424453;
  }
`;
const OrBox = styled.div`
  width: 350px;
  height: 118px;
  margin: 0px 115px 0px 115px;
  border: 1px solid #2C2E39;
`;

const Line = styled.div`
  position: absolute;
  border-top: 1px solid;
  color: #696B7B;
  width: 350px;
  margin-top: 14px;
`;

const Or = styled.div`
  position: absolute;
  background-color: #2C2E39;
  width: 25px;
  height: 17px;
  margin: 0px 152px 0px 152px;
  font-size: 14px;
  color: #999999;
  padding: 8px 10px 10px 10px;
`;

const KakaoBtn = styled.button`
  cursor: pointer;
  width: 350px;
  border-radius: 12px;
  border: 1px solid #424453;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-top: 37px;
  padding: 15px 20px;
  color: #191919;
  background-color: #FEE500;
`;
