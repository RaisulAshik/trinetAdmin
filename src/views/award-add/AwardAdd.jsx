import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CToastBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CToastHeader,
  CFormGroup,
  CFormText,
  CToast,
  CToaster,
  CLabel,
  CRow,
} from "@coreui/react";

import { getFormattedToken } from "src/helperFunctions";

import { loaderUrl } from "src/constants";

import { sAdminAwardApi } from "../../api";

import no_image from "../../assets/image/no_image.jpg";
import "./AwardAdd.css";

class AwardAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageFile: null,
      imagePreviewUrl: null,
      submitting: false,
      submitted: false,
      errorStatus: null,
      toast: null,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const { imageFile } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("image", imageFile ? imageFile : undefined);

    sAdminAwardApi
      .sAdminAddAward(fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
          imageFile: null,
          imagePreviewUrl: null,
          toast: (
            <>
              <CCol sm="12" lg="6">
                <CToaster position="top-right">
                  <CToast
                    title="Successful"
                    show={true}
                    autohide={10000}
                    color="success"
                  >
                    <CToastHeader close>
                      <strong className="me-auto">Successful</strong>
                    </CToastHeader>
                    <CToastBody>Data Added Successfully</CToastBody>
                  </CToast>
                </CToaster>
              </CCol>
            </>
          ),
        });
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
          toast: (
            <>
              <CCol sm="12" lg="6">
                <CToaster position="top-right">
                  <CToast
                    title="Error"
                    show={true}
                    autohide={10000}
                    color="danger"
                  >
                    <CToastHeader close>
                      <strong className="me-auto">Error</strong>
                    </CToastHeader>
                    <CToastBody>Data Adding Failed</CToastBody>
                  </CToast>
                </CToaster>
              </CCol>
            </>
          ),
        });

        console.log(error);
      });
  }

  handleImageChange(e) {
    this.setState({
      imageFile: null,
      imagePreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageFile: file,
        imagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    // console.log("check state", this.state);

    const {
      imagePreviewUrl,
      submitting,
      submitted,
      errorStatus,
      toast,
      imageFile,
    } = this.state;

    return (
      <>
        <CRow>
          <CCol xs="12" sm="6">
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Award
                  <small> New Add</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">
                      Adding Award Failed
                    </span>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="image">New Image</CLabel>

                    <div className="col-sm-8 text-left">
                      <input
                        className="fileInput"
                        type="file"
                        onChange={(e) => this.handleImageChange(e)}
                      />
                    </div>

                    <CFormText className="help-block">
                      Please select a image
                    </CFormText>

                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="imgPreview">
                          <img
                            src={imagePreviewUrl ? imagePreviewUrl : no_image}
                            alt="logo preview..."
                          />
                        </div>
                      </div>
                    </div>
                  </CFormGroup>
                </CCardBody>

                <CCardFooter>
                  {submitting ? (
                    <img src={loaderUrl} alt="Please Wait..." />
                  ) : (
                    <CButton
                      type="submit"
                      size="sm"
                      color="primary"
                      disabled={!imageFile}
                    >
                      Submit
                    </CButton>
                  )}
                </CCardFooter>
              </CCard>
            </CForm>
          </CCol>
        </CRow>

        {toast}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(AwardAdd);
