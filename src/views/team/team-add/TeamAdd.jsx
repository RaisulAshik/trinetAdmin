import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CToastBody,
  CInvalidFeedback,
  CCardFooter,
  CInputFile,
  CCardHeader,
  CCol,
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

import { getFormattedToken } from "src/helperFunctions";

import { loaderUrl } from "src/constants";

import { sAdminTeamApi } from "src/api";

import no_image from "../../../assets/image/no_image.jpg";
import "./TeamAdd.css";

class TeamAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      designation: "",
      email: "",
      facebook: "",
      linkedin: "",
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

    const { name, designation, email, facebook, linkedin, imageFile } =
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
      .sAdminAddTeam(fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
          name: "",
          designation: "",
          email: "",
          facebook: "",
          linkedin: "",
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
      name,
      designation,
      email,
      facebook,
      linkedin,
      imagePreviewUrl,
      submitting,
      submitted,
      errorStatus,
      toast,
      imageFile,
    } = this.state;

    const nameValid = name ? true : false;
    const designationValid = designation ? true : false;
    const emailValid = email ? true : false;
    const facebookValid = facebook ? true : false;
    const linkedinValid = linkedin ? true : false;
    const imageFileValid = imageFile ? true : false;

    return (
      <>
        <CRow>
          <CCol>
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Team
                  <small> New Add</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">Adding Team Failed</span>
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
                    <CLabel htmlFor="designation">Designation</CLabel>

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
                    <CLabel htmlFor="email">Email</CLabel>

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
                    <CLabel htmlFor="facebook">Facebook Link</CLabel>

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
                    <CLabel htmlFor="linkedin">Linkedin Link</CLabel>

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
                    <CLabel htmlFor="image">New Image</CLabel>

                    <CInputFile
                      valid={imageFileValid && submitted}
                      invalid={!imageFileValid && submitted}
                      className="fileInput"
                      type="file"
                      onChange={(e) => this.handleImageChange(e)}
                    />

                    <CFormText className="help-block">
                      Please select a image
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>

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
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(TeamAdd);
