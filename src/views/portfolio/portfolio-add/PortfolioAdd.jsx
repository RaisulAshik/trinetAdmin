import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CCard,
  CCardBody,
  CToastBody,
  CCardFooter,
  CCardHeader,
  CInvalidFeedback,
  CCol,
  CInputFile,
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

import { sAdminPortfolioApi } from "src/api";

import { getFormattedToken } from "src/helperFunctions";

import { loaderUrl } from "src/constants";

import no_image from "../../../assets/image/no_image.jpg";
import "./PortfolioAdd.css";

class PortfolioAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      link: "",
      filter: "",
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

    const { name, link, filter, imageFile } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("name", name);
    fileData.append("link", link);
    fileData.append("filter", filter);
    fileData.append("image", imageFile ? imageFile : undefined);

    sAdminPortfolioApi
      .sAdminAddPortfolio(fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
          name: "",
          link: "",
          filter: "",
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
      toast,
      name,
      submitting,
      submitted,
      errorStatus,
      imagePreviewUrl,
      link,
      filter,
      imageFile,
    } = this.state;

    const nameValid = name ? true : false;
    const linkValid = link ? true : false;
    const filterValid = filter ? true : false;
    const imageFileValid = imageFile ? true : false;

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Portfolio
                  <small> New Add</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">
                      Adding Portfolio Failed
                    </span>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="name">Portfolio Name</CLabel>

                    <CInput
                      valid={nameValid && submitted}
                      invalid={!nameValid && submitted}
                      type="name"
                      id="name"
                      name="name"
                      placeholder="Enter Portfolio Name.."
                      value={name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />

                    <CFormText className="help-block">
                      Please enter new portfolio name
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="link">New Link</CLabel>

                    <CInput
                      valid={linkValid && submitted}
                      invalid={!linkValid && submitted}
                      type="link"
                      id="link"
                      name="link"
                      placeholder="Enter Link.."
                      value={link}
                      onChange={(e) => this.setState({ link: e.target.value })}
                    />

                    <CFormText className="help-block">
                      Please enter new link
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="filter">New Filter</CLabel>

                    <CInput
                      valid={filterValid && submitted}
                      invalid={!filterValid && submitted}
                      type="filter"
                      id="filter"
                      name="filter"
                      placeholder="Enter Filter.."
                      value={filter}
                      onChange={(e) =>
                        this.setState({ filter: e.target.value })
                      }
                    />

                    <CFormText className="help-block">
                      Please enter new filter
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
                      <button type="submit" className="btn btn-primary">
                        Submit Data
                      </button>
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

export default connect(mapStateToProps)(PortfolioAdd);
