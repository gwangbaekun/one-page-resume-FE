import React from "react";
import { useSelector } from "react-redux";
import {
  Content,
  InputCustom,
  Label,
} from "../../makeporf/shared/_sharedStyle";
import { Font } from "../../makeporf/view/Introduce";
import Highlighted from "./Highlight";

function ShowTroubleShooting(props) {
  const commit = useSelector((state) => state.patchcode.commit);
  const { fileName, patchCode, content } = props;

  return (
    <>
      <Content style={{ marginBottom: "30px" }}>
        <Label>
          <Font>Commit</Font>
        </Label>
        <InputCustom
          style={{ overflow: "hidden" }}
          type="text"
          defaultValue={commit[0]?.message}
          maxLength={50}
          readOnly
        />
      </Content>
      <Content style={{ marginBottom: "30px" }}>
        <Label>
          <Font>File Name</Font>
        </Label>
        <InputCustom
          style={{ overflow: "hidden" }}
          type="text"
          defaultValue={fileName}
          maxLength={50}
        />
      </Content>
      <Content style={{ marginBottom: "30px" }}>
        <Label>
          <Font>Patch Code</Font>
        </Label>
        <div
          style={{
            display: "inline-block",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Highlighted text={patchCode} />
        </div>
      </Content>
      <Content style={{ marginBottom: "30px" }}>
        <Label>
          <Font>
            *추가 설명<br></br>(0/500)
          </Font>
        </Label>
        <InputCustom
          style={{ overflow: "hidden", height: "20vh" }}
          type="text"
          maxLength={50}
          defaultValue={content}
        />
      </Content>
      <hr style={{ margin: "50px" }} />
    </>
  );
}

export default ShowTroubleShooting;
