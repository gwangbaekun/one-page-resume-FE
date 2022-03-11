import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  Content,
  FormText,
  FormTitle,
  IconBox,
  Inner,
  InputCustom,
  Label,
} from "../../makeporf/shared/_sharedStyle";
import { Font, FormContents } from "../../makeporf/view/Introduce";
import styled from "styled-components";
import { FormTextSpan } from "../../makeporf/view/Career/Career";
import PreviousNext from "../../makeporf/shared/PreviousNext";
import PreviousNextProject from "../PreviousNextProject";
import { apis } from "../../../shared/axios";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../redux/modules/patchcode";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "90vw",
    height: "85%",
    transform: "translate(-50%, -50%)",
    position: "fixed",
    // overflow: "hidden",
  },
};

function TsModal(props) {
  const dispatch = useDispatch();
  const { modalIsOpen, setIsOpen, message_list, projectId } = props;
  const [selectedSha, setSelectedSha] = useState("");
  const [page, setPage] = useState(0);

  const file_list = useSelector((state) => state.patchcode.patchcode);
  const [selectedFileName, setSelectedFileName] = useState("");

  //file 중복 선택이 가능하게 만들기 위해
  // const [selectedFileName_list, setSelectedFileName_list] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  // commit message 고르기
  const handleCommitClick = (e) => {
    console.log("1");
    setSelectedSha(e.currentTarget.id);
  };

  const handleFileClick = (e) => {
    setSelectedFileName(e.currentTarget.id);
  };

  useEffect(() => {
    if (page === 1) {
      dispatch(actionCreators.setPatchCodeAPI(projectId, selectedSha));
    }
  }, [page]);

  Modal.setAppElement("#root");

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <IconBoxLeft>
        <button onClick={closeModal}>x</button>
      </IconBoxLeft>
      <FormContentsModal>
        {page === 0 ? (
          <>
            <FormTitleFlex>
              <FormTextCenter>커밋 조회 하기</FormTextCenter>
              <FormTextLight>
                프로젝트에 첨부할 commit을 선택해 주세요.
              </FormTextLight>
            </FormTitleFlex>
            <div>
              <Ulist>
                {message_list.map((e, i) => {
                  if (selectedSha === e.sha) {
                    return (
                      <>
                        <List
                          selected
                          onClick={handleCommitClick}
                          key={e.sha + i}
                          id={e.sha}
                        >
                          <div style={{ display: "flex" }}>
                            <img
                              width="30"
                              height="auto"
                              src={process.env.PUBLIC_URL + "/img/check.svg"}
                              alt="checked"
                            />
                            <Font>{e.message}</Font>
                          </div>
                        </List>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <List
                          onClick={handleCommitClick}
                          key={e.sha + i}
                          id={e.sha}
                        >
                          <Font>{e.message}</Font>
                        </List>
                      </>
                    );
                  }
                })}
              </Ulist>
            </div>
          </>
        ) : (
          <>
            <FormTitleFlex>
              <FormTextCenter>파일 조회 하기</FormTextCenter>
              <FormTextLight>
                트러블 슈팅한 파일을 골라서 조회하세요.(중복 선택 가능)
              </FormTextLight>
            </FormTitleFlex>
            <div>
              <Ulist>
                {file_list.map((e, i) => {
                  if (selectedFileName === e.name) {
                    return (
                      <>
                        <List
                          selected
                          onClick={handleFileClick}
                          key={e.name + i}
                          id={e.name}
                        >
                          <div style={{ display: "flex" }}>
                            <img
                              width="30"
                              height="auto"
                              src={process.env.PUBLIC_URL + "/img/check.svg"}
                              alt="checked"
                            />
                            <Font>{e.name}</Font>
                          </div>
                        </List>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <List
                          onClick={handleFileClick}
                          key={e.sha + i}
                          id={e.name}
                        >
                          <Font>{e.name}</Font>
                        </List>
                      </>
                    );
                  }
                })}
              </Ulist>
            </div>
          </>
        )}
        <PreviousNextProject
          closeModal={closeModal}
          selectedFileName={selectedFileName}
          selected={selectedSha}
          setPage={setPage}
          page={page}
        />
      </FormContentsModal>
    </Modal>
  );
}

const List = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 75px;
  margin: 20px 30px 20px 40px;
  border-bottom: solid 1px #cccccc;
  ${Font} {
    color: ${(props) => (props.selected ? "blue" : "black")};
  }
`;

const FormContentsModal = styled(FormContents)`
  height: 50vh;
  padding-bottom: 0px;
`;

const Ulist = styled.ul`
  margin: auto 100px;
  height: 50vh;
  overflow: auto;
  padding-top: 10px;
  border: 1px solid #cccccc;
  border-radius: 10px;
`;

const FormTextCenter = styled(FormText)`
  width: auto;
  height: 63px;
  justify-content: center;
  padding: 10px;
  font-size: 36px;
  line-height: 43px;
`;

const FormTitleFlex = styled(FormTitle)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 300px;
  margin: 10px auto;
`;

export const FormTextLight = styled(FormText)`
  justify-content: center;
  font-size: 15px;
  font-weight: 100;
  width: auto;
`;

const IconBoxLeft = styled(IconBox)`
  width: 50px;
  margin-left: auto;
`;

export default TsModal;
