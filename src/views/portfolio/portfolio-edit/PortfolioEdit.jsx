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
  CForm,
  CToastHeader,
  CFormGroup,
  CFormText,
  CInvalidFeedback,
  CToast,
  CInput,
  CToaster,
  CLabel,
  CRow,
} from "@coreui/react";

import { sAdminPortfolioApi } from "src/api";
import commonApi from "src/api/commonApi";

import { checkFileExists, getFormattedToken } from "src/helperFunctions";

import FullPageLoader from "../../../hooks/Loader";

import { loaderUrl } from "src/constants";

import no_image from "../../../assets/image/no_image.jpg";
import "./PortfolioEdit.css";

class PortfolioEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      link: "",
      filter: "",
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

    sAdminPortfolioApi
      .sAdminGetPortfolioDetails(id, formattedToken)
      .then((response) => {
        this.setState({
          _id: response.data._id,
          name: response.data.name,
          link: response.data.link,
          filter: response.data.filter,
          image: response.data.image,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const { name, link, filter, imageFile, _id } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("name", name);
    fileData.append("link", link);
    fileData.append("filter", filter);
    fileData.append("image", imageFile ? imageFile : undefined);

    sAdminPortfolioApi
      .sAdminUpdatePortfolioDetails(_id, fileData, formattedToken)
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
      toast,
      name,
      submitting,
      submitted,
      errorStatus,
      imagePreviewUrl,
      link,
      filter,
      image,
    } = this.state;

    const imageExists = checkFileExists(commonApi.api + image);

    const nameValid = name ? true : false;
    const linkValid = link ? true : false;
    const filterValid = filter ? true : false;

    return (
      <>
        <CRow>
          <CCol>
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Portfolio
                  <small> New Add</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">
                      Updating Portfolio Data Failed
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
                      Please enter portfolio name
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Link</CLabel>

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
                      Please enter link
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Filter</CLabel>

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

export default connect(mapStateToProps)(PortfolioEdit);
