import React, { useEffect } from "react";

import { apis } from '../shared/axios';
import styled from "styled-components";
import { userStorage } from "../shared/userStorage";

const KakaoAuthHandle2 = (props) => {
  const { history } = props;
  //연령, 성별
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    let userId = localStorage.getItem("userId");
    const kakaoLogin = async () => {
      await apis.kakaoLogin2(code, userId)
        .then((res) => {
          localStorage.setItem("is_login", true);
          userStorage(res.data);
          history.push("/");
        });
    };
    kakaoLogin();
  }, []);

  return <Container alt="로딩 이미지" />;
};

export default KakaoAuthHandle2;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;