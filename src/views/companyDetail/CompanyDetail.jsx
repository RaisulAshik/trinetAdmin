import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInvalidFeedback,
  CRow,
  CLabel,
  CToast,
  CTextarea,
  CFormGroup,
  CToastHeader,
  CInput,
  CToaster,
  CToastBody,
} from "@coreui/react";
import { connect } from "react-redux";

import { checkFileExists, getFormattedToken } from "src/helperFunctions";

import { sAdminCompanyDetailApi } from "../../api";
import commonApi from "src/api/commonApi";

import FullPageLoader from "../../hooks/Loader";

import { loaderUrl } from "src/constants";

import no_image from "../../assets/image/no_image.jpg";
import "./CompanyDetail.css";

class CompanyDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      logo: null,
      favicon: null,
      name: "",
      email: "",
      phone: "",
      address: "",
      details: "",
      facebook: "",
      linkedin: "",
      submitting: false,
      submitted: false,
      errorStatus: null,
      logoFile: null,
      faviconFile: null,
      logoPreviewUrl: null,
      faviconPreviewUrl: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
      files: [],
      toast: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    sAdminCompanyDetailApi
      .sAdminGetCompanyDetailDetails(formattedToken)
      .then((response) => {
        this.setState({
          logo: response.data.logo,
          favicon: response.data.favicon,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
          details: response.data.details,
          facebook: response.data.facebook,
          linkedin: response.data.linkedin,
          _id: response.data._id,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const {
      logoFile,
      faviconFile,
      email,
      name,
      phone,
      address,
      details,
      facebook,
      linkedin,
    } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("email", email);
    fileData.append("name", name);
    fileData.append("phone", phone);
    fileData.append("address", address);
    fileData.append("details", details);
    fileData.append("facebook", facebook);
    fileData.append("linkedin", linkedin);
    fileData.append("logo", logoFile ? logoFile : undefined);
    fileData.append("favicon", faviconFile ? faviconFile : undefined);

    sAdminCompanyDetailApi
      .sAdminUpdateCompanyDetailDetails(fileData, formattedToken)
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

  handleLogoChange(e) {
    this.setState({
      logoFile: null,
      logoPreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        logoFile: file,
        logoPreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleFaviconChange(e) {
    this.setState({
      faviconFile: null,
      faviconPreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        faviconFile: file,
        faviconPreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  showData() {
    const {
      logo,
      favicon,
      submitting,
      submitted,
      errorStatus,
      logoPreviewUrl,
      faviconPreviewUrl,
      email,
      name,
      phone,
      address,
      details,
      facebook,
      linkedin,
    } = this.state;

    const logoExists = checkFileExists(commonApi.api + logo);
    const faviconExists = checkFileExists(commonApi.api + favicon);

    const emailValid = email ? true : false;
    const nameValid = name ? true : false;
    const phoneValid = phone ? true : false;
    const addressValid = address ? true : false;
    const detailsValid = details ? true : false;
    // const facebookValid = facebook ? true : false;
    // const linkedinValid = linkedin ? true : false;

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>Company Details</CCardHeader>
              <CCardBody>
                {submitted && errorStatus === 400 && (
                  <span className="validation-error mt-2">
                    Updating Slider Image Failed
                  </span>
                )}

                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className="form-group row">
                    <label htmlFor="logo" className="col-sm-4 col-form-label">
                      Logo
                    </label>

                    <div className="col-sm-8 text-left">
                      <input
                        className="fileInput"
                        type="file"
                        onChange={(e) => this.handleLogoChange(e)}
                      />
                    </div>
                  </div>

                  {!logoPreviewUrl && (
                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="sliderListPreview">
                          <img
                            src={logoExists ? commonApi.api + logo : no_image}
                            alt="logo preview..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {logoPreviewUrl && (
                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="sliderListPreview">
                          <img src={logoPreviewUrl} alt="logo preview..." />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-group row">
                    <label
                      htmlFor="favicon"
                      className="col-sm-4 col-form-label"
                    >
                      Favicon
                    </label>

                    <div className="col-sm-8 text-left">
                      <input
                        className="fileInput"
                        type="file"
                        onChange={(e) => this.handleFaviconChange(e)}
                      />
                    </div>
                  </div>

                  {!faviconPreviewUrl && (
                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="sliderListPreview">
                          <img
                            src={
                              faviconExists ? commonApi.api + favicon : no_image
                            }
                            alt="favicon..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {faviconPreviewUrl && (
                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="sliderListPreview">
                          <img src={faviconPreviewUrl} alt="favicon..." />
                        </div>
                      </div>
                    </div>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="title">Email</CLabel>

                    <CInput
                      valid={emailValid && submitted}
                      invalid={!emailValid && submitted}
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter Email.."
                      value={email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Company Name</CLabel>

                    <CInput
                      valid={nameValid && submitted}
                      invalid={!nameValid && submitted}
                      id="name"
                      type="name"
                      name="name"
                      placeholder="Enter Company Name.."
                      value={name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Phone Number</CLabel>

                    <CInput
                      valid={phoneValid && submitted}
                      invalid={!phoneValid && submitted}
                      id="phone"
                      type="phone"
                      name="phone"
                      placeholder="Enter Phone Number.."
                      value={phone}
                      onChange={(e) => this.setState({ phone: e.target.value })}
                    />

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Address</CLabel>

                    <CTextarea
                      valid={addressValid && submitted}
                      invalid={!addressValid && submitted}
                      id="address"
                      rows="5"
                      type="textarea"
                      name="address"
                      placeholder="Enter Address.."
                      value={address}
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                    />

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="details">Company Details</CLabel>

                    <CTextarea
                      valid={detailsValid && submitted}
                      invalid={!detailsValid && submitted}
                      id="details"
                      type="details"
                      name="details"
                      rows="5"
                      placeholder="Enter Company Details.."
                      value={details}
                      onChange={(e) =>
                        this.setState({ details: e.target.value })
                      }
                    />

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="facebook">Facebook Link</CLabel>

                    <CInput
                      // valid={facebookValid && submitted}
                      // invalid={!facebookValid && submitted}
                      id="facebook"
                      type="facebook"
                      name="facebook"
                      placeholder="Enter Facebook Link.."
                      value={facebook}
                      onChange={(e) =>
                        this.setState({ facebook: e.target.value })
                      }
                    />

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                    {/* <CInvalidFeedback>This field is required</CInvalidFeedback> */}
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="linkedin">LinkedIn Link</CLabel>

                    <CInput
                      // valid={linkedinValid && submitted}
                      // invalid={!linkedinValid && submitted}
                      id="linkedin"
                      type="linkedin"
                      name="linkedin"
                      placeholder="Enter LinkedIn Link.."
                      value={linkedin}
                      onChange={(e) =>
                        this.setState({ linkedin: e.target.value })
                      }
                    />

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                    {/* <CInvalidFeedback>This field is required</CInvalidFeedback> */}
                  </CFormGroup>

                  <div className="row justify-content-center">
                    {submitting ? (
                      <img src={loaderUrl} alt="Please Wait..." />
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary update-button mt-2"
                      >
                        Submit Updated Data
                      </button>
                    )}
                  </div>
                </form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {this.state.toast}
      </>
    );
  }

  render() {
    const { apiLoadedCount, totalApiCount } = this.state;

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

export default connect(mapStateToProps)(CompanyDetail);
