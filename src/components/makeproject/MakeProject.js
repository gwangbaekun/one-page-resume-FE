import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import {
  Content,
  ErrorMessage,
  FormText,
  FormTitle,
  InputCustom,
  Label,
  Star,
} from "../makeporf/shared/_sharedStyle";
import styled from "styled-components";
import { Font, FormContents, MultiContent } from "../makeporf/view/Introduce";
import ForProjUpload from "../makeporf/shared/ForPorjUpload";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  customStyles,
  options,
  SelectStack,
  StackBox,
} from "../makeporf/view/Stack";
import PreviousNextProject from "./shared/PreviousNextProject";
import { apis } from "../../shared/axios";
import TemplateProject from "./shared/TemplateProject";
import MarkDown from "./ts/MarkDown";

import Spinner from "../../shared/Spinner";
// mui selector
import ClearIcon from "@mui/icons-material/Clear";
import { grey } from "@mui/material/colors";
import { Autocomplete, Chip, FormControl, TextField } from "@mui/material";
import { CssTextField, theme } from "../../shared/_sharedMuiStyle";
import { option } from "../../shared/common";

function MakeProject() {
  const history = useHistory();
  const { id, projectId } = useParams();
  //포트폴리오 프로젝트 생성
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const content = useRef(null);

  useEffect(() => {
    if (content === null || content.current === null) {
      return;
    }
    content.current.style.height = "20px";
    content.current.style.height = content.current.scrollHeight + "px";

    return handleSubmit(projectSubmit);
  }, []);

  // const handleResizeHeight = useCallback(() => {
  //   if (content === null || content.current === null) {
  //     return;
  //   }
  //   content.current.style.height = "20px";
  //   content.current.style.height = content.current.scrollHeight + "px";
  // }, []);

  // const [stacks, setStacks] = useState([]);
  const [addStack, setAddStack] = useState([]);
  const handleChange = (event, newValue) => {
    setAddStack(newValue);
  };

  const handleDelete = (stack) => {
    setAddStack(addStack.filter((prev) => prev !== stack));
  };

  //이미지 파일 prop으로 넘겨줌
  const [images, setImages] = useState([]);

  const [isModify, setIsModify] = useState(false);

  const [mdValue, setMDValue] = useState();
  const [is_loading, setIs_Loading] = useState(false);
  // form 제출
  const projectSubmit = (data) => {
    setIs_Loading(true);
    const { projectTitle, gitRepoUrl } = data;
    const _gitRepoName = gitRepoUrl.split("/");
    const gitRepoName = _gitRepoName[_gitRepoName.length - 1];

    if (addStack.length < 2) {
      setError("stack", "2개 이상 골라주세요.");
      return;
    }

    const jsonFrm = {
      title: projectTitle,
      content: mdValue,
      stack: addStack,
      gitRepoUrl: gitRepoUrl,
      gitRepoName: gitRepoName,
    };
    let frm = new FormData();
    let modifyPic = new FormData();
    frm.append(
      "data",
      new Blob([JSON.stringify(jsonFrm)], { type: "application/json" })
    );
    for (let i = 0; i < images.length; i++) {
      frm.append("images", images[i]);
      modifyPic.append("images", images[i]);
    }

    if (projectId) {
      apis.modifyInfoProject(jsonFrm, projectId).then((res) => {
        history.push(`/write/project/troubleShooting/${projectId}`);
      });
    } else {
      apis.createProject(frm).then((res) => {
        const { id } = res.data.data;
        history.push(`/write/project/troubleShooting/${id}`);
      });
    }
    setIs_Loading(false);
  };
  // const handleClick = () => {
  //   history.push("/write/project/troubleshooting/id");
  // };

  useEffect(() => {
    if (projectId) {
      apis.projectGet(projectId).then((res) => {
        const { title, gitRepoUrl, imageUrl, content, stack } = res.data.data;
        setValue("projectTitle", title);
        setValue("gitRepoUrl", gitRepoUrl);
        setValue("imageUrl", imageUrl);
        setMDValue(content);
        setAddStack(stack);
        setIsModify(true);
      });
    }
    return () => handleSubmit(projectSubmit);
  }, []);

  return (
    <>
      <FormTitle>
        <FormMainText>STEP 1</FormMainText>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormText>프로젝트 정보</FormText>
          <FormSubText>프로젝트의 전반적인 내용을 작성해주세요</FormSubText>
        </div>
      </FormTitle>
      <form onSubmit={handleSubmit(projectSubmit)}>
        <FormContents>
          <Content>
            <Label>
              <Font>
                프로젝트 제목<Star>*</Star>
                <br></br>(0/50)
              </Font>
            </Label>
            <InputCustom
              placeholder="프로젝트의 제목을 입력해주세요."
              type="text"
              {...register("projectTitle", { required: "필수 항목 입니다." })}
            ></InputCustom>
          </Content>
          <ErrorMessage>{errors?.projectTitle?.message}</ErrorMessage>
          <Content>
            <Label>
              <Font>
                Github<br></br>repository URL<Star>*</Star>
              </Font>
            </Label>
            <InputCustom
              placeholder="프로젝트에서 설명할 Github repository의 URL을 입력해주세요."
              type="text"
              {...register("gitRepoUrl", { required: "필수 항목 입니다." })}
            />
          </Content>
          <ErrorMessage>{errors?.gitRepoUrl?.message}</ErrorMessage>
          <MultiContentFlex style={{ marginBottom: "30px" }}>
            <Label style={{ minWidth: "150px" }}>
              <Font>
                프로젝트 이미지<Star>*</Star>
              </Font>
            </Label>
            <ForProjUpload images={images} setImages={setImages} />
          </MultiContentFlex>
          {/* // 파일 여러개 받는 법 */}
          <MultiContent>
            <Label>
              <Font>
                기술 스택<Star>*</Star>
              </Font>
            </Label>
            <Autocomplete
              multiple
              fullWidth
              filterSelectedOptions
              id="tags-standard"
              options={option}
              value={addStack}
              defaultValue={addStack}
              onChange={handleChange}
              renderTags={(addStack, getTagProps) =>
                addStack.map((option, index) => (
                  <Chip
                    sx={{ display: "none" }}
                    variant="outlined"
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <CssTextField
                  {...params}
                  variant="outlined"
                  placeholder="기술스택으로 검색해보세요"
                />
              )}
            />
          </MultiContent>
          <MultiContent style={{ marginBottom: "30px" }}>
            <Label>
              <Font></Font>
            </Label>
            <StackBox
              style={{
                marginBottom: "0px",
                marginTop: "20px",
                height: "100%",
                width: "100%",
                background: "#393a47",
              }}
            >
              {addStack.map((addStack, index) => {
                return (
                  <SelectStack key={index} {...addStack}>
                    {addStack}
                    <ClearIcon
                      sx={{ fontSize: 14, color: grey[500], marginLeft: 1 }}
                      onClick={() => {
                        handleDelete(addStack);
                      }}
                    ></ClearIcon>
                  </SelectStack>
                );
              })}
            </StackBox>
          </MultiContent>
          <Content>
            <Label style={{ minWidth: "150px" }}>
              <Font>
                프로젝트 내용 <Star>*</Star>
                <br />
                (0/1200)
              </Font>
            </Label>
            <MarkDown setValue={setMDValue} value={mdValue} />
          </Content>
          <ErrorMessage>{errors?.projectContent?.message}</ErrorMessage>
        </FormContents>
        <TemplateProject />
      </form>
      {projectId && <PreviousNextProject />}
      {/* {is_loading && <Spinner />} */}
    </>
  );
}

export const FormSubText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #cfd3e2;
`;

export const FormMainText = styled(FormText)`
  padding: 10px 0;
  color: #ffffff;
`;

export const MultiContentFlex = styled(MultiContent)`
  display: flex;
`;

export default MakeProject;
