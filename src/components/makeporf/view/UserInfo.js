import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import {
  Content,
  ErrorMessage,
  FormText,
  FormTitle,
  InputCustom,
  Label,
} from "../shared/_sharedStyle";
import { Font } from "./Introduce";
import FileUpload from "../shared/ImageUpload";
import { apis } from "../../../shared/axios";
import { useSelector } from "react-redux";
import { urlCheck } from "../../../shared/common";

function UserInfo() {
  const defaultValues = {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    onChange,
    setValue,
  } = useForm({ defaultValues });

  const [data, setData] = useState({});

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  const onValid = (data) => {
    const stack = userInfo.stack;
    const _data = { ...data, stack };
    apis.addInfo(_data).then((res) => { });
  };

  useEffect(() => {
    apis
      .userInfo()
      .then((res) => {
        const { name, job, phoneNum, gitUrl, email, blogUrl } = res.data.data;
        setData(res.data.data);
        setValue("name", name);
        setValue("job", job);
        setValue("phoneNum", phoneNum);
        setValue("gitUrl", gitUrl);
        setValue("email", email);
        setValue("blogUrl", blogUrl);
      })
      .catch((error) => {
        setValue(null);
      });
  }, []);

  return (
    <>
      <FormTitle>
        <FormText>내 정보</FormText>
      </FormTitle>
      <UserInfoForm onSubmit={handleSubmit(onValid)}>
        <Content>
          <Label>
            <Font>*이름(실명)</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
                defaultValue={data?.name}
              />
            )}
            rules={{
              required: "필수 항목 입니다.",
              maxLength: { value: 50, message: "이름은 50자 제한입니다." },
            }}
            onChange={onChange}
            name="name"
            control={control}
          />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
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
                defaultValue={data?.job}
              />
            )}
            name="job"
            control={control}
          />
        </Content>
        <MultiContent>
          <Label style={{ minWidth: "150px" }}>
            <Font>프로필 이미지</Font>
          </Label>
          <FileUpload />
        </MultiContent>
        <Content>
          <Label>
            <Font>전화번호</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
                defaultValue={data?.phoneNum}
                maxLength={13}
              />
            )}
            rules={{
              pattern: {
                value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                message: "전화번호 형식이 아닙니다.",
              },
            }}
            name="phoneNum"
            control={control}
          />
          <ErrorMessage>{errors?.phoneNum?.message}</ErrorMessage>
        </Content>
        <Content>
          <Label>
            <Font>이메일</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ background: "white" }}
                {...field}
                defaultValue={data?.email}
              />
            )}
            rules={{
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                message: "이메일 형식이 아닙니다.",
              },
            }}
            name="email"
            control={control}
          />
          <ErrorMessage>{errors?.email?.message}</ErrorMessage>
        </Content>
        <Content>
          <Label>
            <Font>GitHub URL</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
                defaultValue={data?.gitUrl}
              />
            )}
            rules={{
              pattern: {
                value:
                  /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/,
                message: "url주소 형식이 아닙니다.",
              },
            }}
            name="gitUrl"
            control={control}
          />
          <ErrorMessage>{errors?.gitUrl?.message}</ErrorMessage>
        </Content>
        <Content>
          <Label>
            <Font>Blog URL</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
                defaultValue={data?.blogUrl}
              />
            )}
            rules={{
              pattern: {
                value:
                  /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/,
                message: "url주소 형식이 아닙니다.",
              },
            }}
            name="blogUrl"
            control={control}
          />
          <ErrorMessage>{errors?.blogUrl?.message}</ErrorMessage>
        </Content>
        <input type="submit" />
      </UserInfoForm>
    </>
  );
}
export const MultiContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 50px 0px 50px;
`;

const UserInfoForm = styled.form`
  flex-direction: column;
  align-items: center;
  padding: 0px;
  height: 100%;
`;

export default UserInfo;
