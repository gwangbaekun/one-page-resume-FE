import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import {
  Content,
  FormText,
  FormTitle,
  InputCustom,
  Label,
} from "../shared/_sharedStyle";
import { Font } from "./Introduce";
import FileUpload from "../shared/ImageUpload";

function UserInfo() {
  const defaultValues = {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  useEffect(() => {
    console.log("axios 개인 정보 가져오기");
  }, []);

  return (
    <>
      <FormTitle>
        <FormText>내 정보</FormText>
      </FormTitle>
      <UserInfoForm>
        <div></div>
        <Content>
          <Label>
            <Font>*이름(실명)</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
              />
            )}
            name="name"
            control={control}
            defaultValue="abc"
          />
        </Content>
        <Content>
          <Label>
            <Font>직무</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
              />
            )}
            name="job"
            control={control}
            defaultValue="abc"
          />
        </Content>
        <Content>
          <Label>
            <Font>프로필 이미지</Font>
          </Label>
          {/* <Controller
            render={({ field }) => <FileUpload {...field} />}
            name="job"
            control={control}
            defaultValue="abc"
          /> */}
          <FileUpload />
        </Content>
      </UserInfoForm>
    </>
  );
}

const UserInfoForm = styled.div`
  width: 1380px;
  left: 0px;
  top: 85px;

  /* C5 */

  background: #ededed;
  border-radius: 10px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 15px 0px;
`;

export default UserInfo;
