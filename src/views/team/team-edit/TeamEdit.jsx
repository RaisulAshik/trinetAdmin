import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CToastBody,
  CCardFooter,
  CCardHeader,
  CInputFile,
  CCol,
  CInvalidFeedback,
  CForm,
  CToastHeader,
  CFormGroup,
  CFormText,
  CToast,
  CInput,
  CToaster,
  CLabel,
  CRow,
} from "@coreui/react";

import { checkFileExists, getFormattedToken } from "src/helperFunctions";

import FullPageLoader from "../../../hooks/Loader";

import { sAdminTeamApi } from "src/api";
import commonApi from "src/api/commonApi";

import { loaderUrl } from "src/constants";

import no_image from "../../../assets/image/no_image.jpg";
import "./TeamEdit.css";

class TeamEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      name: "",
      designation: "",
      email: "",
      facebook: "",
      linkedin: "",
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

    sAdminTeamApi.sAdminGetTeamDetails(id, formattedToken).then((response) => {
      this.setState({
        _id: response.data._id,
        name: response.data.name,
        designation: response.data.designation,
        email: response.data.email,
        facebook: response.data.facebook,
        linkedin: response.data.linkedin,
        image: response.data.image,
        apiLoadedCount: this.state.apiLoadedCount + 1,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const { _id, name, designation, email, facebook, linkedin, imageFile } =
      this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("name", name);
    fileData.append("designation", designation);
    fileData.append("email", email);
    fileData.append("facebook", facebook);
    fileData.append("linkedin", linkedin);
    fileData.append("image", imageFile ? imageFile : undefined);

    sAdminTeamApi
      .sAdminUpdateTeamDetails(_id, fileData, formattedToken)
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
      name,
      designation,
      email,
      facebook,
      linkedin,
      image,
      imagePreviewUrl,
      submitting,
      submitted,
      errorStatus,
      toast,
    } = this.state;

    const imageExists = checkFileExists(commonApi.api + image);

    const nameValid = name ? true : false;
    const designationValid = designation ? true : false;
    const emailValid = email ? true : false;
    const facebookValid = facebook ? true : false;
    const linkedinValid = linkedin ? true : false;

    return (
      <>
        <CRow>
          <CCol>
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Team
                  <small> Edit</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">
                      Updating Team Data Failed
                    </span>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>

                    <CInput
                      valid={nameValid && submitted}
                      invalid={!nameValid && submitted}
                      type="name"
                      id="name"
                      name="name"
                      placeholder="Enter Name.."
                      value={name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />

                    <CFormText className="help-block">
                      Please enter name
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Designation</CLabel>

                    <CInput
                      valid={designationValid && submitted}
                      invalid={!designationValid && submitted}
                      type="designation"
                      id="designation"
                      name="designation"
                      placeholder="Enter Designation.."
                      value={designation}
                      onChange={(e) =>
                        this.setState({ designation: e.target.value })
                      }
                    />

                    <CFormText className="help-block">
                      Please enter designation
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Email</CLabel>

                    <CInput
                      valid={emailValid && submitted}
                      invalid={!emailValid && submitted}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email.."
                      value={email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />

                    <CFormText className="help-block">
                      Please enter email
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Facebook Link</CLabel>

                    <CInput
                      valid={facebookValid && submitted}
                      invalid={!facebookValid && submitted}
                      type="facebook"
                      id="facebook"
                      name="facebook"
                      placeholder="Enter Facebook Link.."
                      value={facebook}
                      onChange={(e) =>
                        this.setState({ facebook: e.target.value })
                      }
                    />

                    <CFormText className="help-block">
                      Please enter facebook link
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Linkedin Link</CLabel>

                    <CInput
                      valid={linkedinValid && submitted}
                      invalid={!linkedinValid && submitted}
                      type="linkedin"
                      id="linkedin"
                      name="linkedin"
                      placeholder="Enter Linkedin Link.."
                      value={linkedin}
                      onChange={(e) =>
                        this.setState({ linkedin: e.target.value })
                      }
                    />

                    <CFormText className="help-block">
                      Please enter linkedin link
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="image">Image</CLabel>

                    <CInputFile
                      className="fileInput"
                      type="file"
                      onChange={(e) => this.handleImageChange(e)}
                    />

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
                  <div className="row justify-content-center">
                    {submitting ? (
                      <img src={loaderUrl} alt="Please Wait..." />
                    ) : (
                      <CButton type="submit" className="btn btn-primary">
                        Submit Data
                      </CButton>
                    )}
                  </div>
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

export default connect(mapStateToProps)(TeamEdit);
