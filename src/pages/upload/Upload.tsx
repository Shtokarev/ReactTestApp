import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Form } from "react-final-form";

import { MainLogo } from "../../components/MainLogo/MainLogo";
import { asThunk } from "../../stores/common/thunk.helper";
import {
  authByEmail,
  setToastifyError,
  uploadMapboxTileset,
} from "../../stores";
import { InputIconField } from "../../components/fields";
import { ContentContainer } from "../../components/ContentContainer/ContentContainer";
import { Button } from "../../components/uikit/Button";
import { routes } from "../../routes";
import css from "./Upload.module.scss";

interface UploadProps {
  authByEmail: any;
  uploadMapboxTileset: typeof uploadMapboxTileset;
  setToastifyError: typeof setToastifyError;
  push: (path: string) => any;
}

const Upload: React.FC<UploadProps> = ({
  uploadMapboxTileset,
  setToastifyError,
  push,
}) => {
  const onSubmitUpload = async (values: any) => {
    const { file } = values;

    uploadMapboxTileset({
      tilesetName: "test2tileSetName",
      file,
    });
  };

  const goHome = () => push(routes.home());

  const renderInputs = () => (
    <>
      <InputIconField
        label="Shape file"
        name="file"
        buttonLabel="Upload"
        className={css.input}
        prompt={`Valid data formats:\ngeoTiff, .shp`}
        errorCallback={setToastifyError}
      />
    </>
  );

  const renderCustomHeader = () => (
    <MainLogo onClick={goHome} className={css.mainLogo} />
  );

  const renderForm = () => (
    <Form
      onSubmit={onSubmitUpload}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className={css.form}>
          {renderInputs()}
          <div className={css.buttonContainer}>
            <Button className={css.submitButton} type="submit">
              Continue
            </Button>
          </div>
          {submitError && <div className={css.formError}>{submitError}</div>}
        </form>
      )}
    />
  );

  return (
    <div className={css.page}>
      <ContentContainer
        renderCustomHeader={renderCustomHeader}
        showHeader
        className={css.contentContainer}
        centerContent
        centerWithLeftMargin={100}
        wider={false}
      >
        <span className={css.title}>Upload maps</span>
        {renderForm()}
      </ContentContainer>
    </div>
  );
};

const mapDispatchToProps = {
  authByEmail: asThunk(authByEmail),
  uploadMapboxTileset,
  setToastifyError,
  push,
};

export default connect(null, mapDispatchToProps)(Upload);
