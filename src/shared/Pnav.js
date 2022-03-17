import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteCookie } from "./cookie";
import { Link, useHistory } from "react-router-dom";
// JS파일

const Pnav = (props) => {
  const history = useHistory();
  const user = document.cookie;
  // props.nav (false or true)
  const navState = props.pnav;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // NavBar 설정
  const [pnav, setPnav] = useState(false);

  // useEffect로 navState가 바뀔때마다 렌더링
  useEffect(() => {
    setPnav(navState);
  }, [navState]);

  // SignOut
  const signOut = () => {
    setPnav(false);
    deleteCookie("token");
    window.location.reload();
  };

  return (
    <React.Fragment>
      {pnav ? (
        <NavBar>
          <NavLog>
            <Logout
              onClick={() => {
                history.replace(
                  `/write/portfolio/introduce/${userInfo.porfId}`
                );
              }}
            >
              내 포트폴리오
            </Logout>
            <Logout
              onClick={() => {
                history.replace("/write/project/info");
              }}
            >
              새 프로젝트
            </Logout>
          </NavLog>
        </NavBar>
      ) : null}
    </React.Fragment>
  );
};
// NavBar component
const NavBar = styled.nav`
  z-index: 99999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  width: auto;
  top: 75px;
  margin-right: 30px;
  right: 0;
`;
// NavList component
const NavLog = styled.div`
  border: 1px solid #999999;
  border-radius: 5px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 16px 16px 16px 16px;
  background-color: white;
  width: 250px;
  height: 120px;
  cursor: pointer;
  &:hover {
  }
`;

const Logout = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 50px;
  margin-top: 5px;
  margin-bottom: 10px;
  /* C6 */
  background: #ffffff;
  /* C4 */
  color: #999999;
  border: 1px solid #999999;
  box-sizing: border-box;
  border-radius: 30px;
  :hover {
    color: white;
    background-color: #999999;
  }
`;
export default Pnav;
