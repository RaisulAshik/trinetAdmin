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

import { checkFileExists, getFormattedToken } from "src/helperFunctions";

import FullPageLoader from "../../hooks/Loader";

import commonApi from "src/api/commonApi";
import { sAdminAwardApi } from "../../api";

import { loaderUrl } from "src/constants";

import no_image from "../../assets/image/no_image.jpg";
import "./AwardEdit.css";

class AwardEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      image: null,
      imageFile: null,
      imagePreviewUrl: null,
      submitting: false,
      submitted: false,
      errorStatus: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
      toast: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    const { id } = this.props.match.params;

    sAdminAwardApi
      .sAdminGetAwardDetails(id, formattedToken)
      .then((response) => {
        this.setState({
          _id: response.data._id,
          image: response.data.image,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const { _id, imageFile } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("image", imageFile ? imageFile : undefined);

    sAdminAwardApi
      .sAdminUpdateAwardDetails(_id, fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
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
                    <CToastBody>Data Updated Successfully</CToastBody>
                  </CToast>
                </CToaster>
              </CCol>
            </>
          ),
        });

        // history.push("/service-category/service-category-list");
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
                    <CToastBody>Data Updating Failed</CToastBody>
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

  showData() {
    const {
      image,
      imagePreviewUrl,
      submitting,
      submitted,
      errorStatus,
      toast,
    } = this.state;

    const imageExists = checkFileExists(commonApi.api + image);

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
                      Updating Award Failed
                    </span>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="image">Image</CLabel>

                    <div className="col-sm-8 text-left">
                      <input
                        className="fileInput"
                        type="file"
                        onChange={(e) => this.handleImageChange(e)}
                      />
                    </div>

                    <CFormText className="help-block">Select image</CFormText>

                    {!imagePreviewUrl && (
                      <div className="container mb-2">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="imgPreview">
                            <img
                              src={
                                imageExists ? commonApi.api + image : no_image
                              }
                              alt="slider img..."
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {imagePreviewUrl && (
                      <div className="container mb-2">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="imgPreview">
                            <img src={imagePreviewUrl} alt="slider img..." />
                          </div>
                        </div>
                      </div>
                    )}
                  </CFormGroup>
                </CCardBody>

                <CCardFooter>
                  {submitting ? (
                    <img src={loaderUrl} alt="Please Wait..." />
                  ) : (
                    <CButton type="submit" size="sm" color="primary">
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

  render() {
    const { totalApiCount, apiLoadedCount } = this.state;

    // console.log("check state", this.state);

    return apiLoadedCount < totalApiCount ? (
      <FullPageLoader />
    ) : (
      this.showData()
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(AwardEdit);
