import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CLabel,
  CRow,
  CInput,
  CToast,
  CToastHeader,
  CToaster,
  CToastBody,
} from "@coreui/react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";

import { checkFileExists, getFormattedToken } from "src/helperFunctions";

import FullPageLoader from "../../hooks/Loader";

import { sAdminBannerApi } from "src/api";
import commonApi from "src/api/commonApi";

import { loaderUrl } from "src/constants";

import no_image from "../../assets/image/no_image.jpg";
import "./Banner.css";

class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      backgroundImage: null,
      contentImage: null,
      link: "",
      text: "",
      submitting: false,
      submitted: false,
      errorStatus: null,
      backgroundImageFile: null,
      contentImageFile: null,
      backgroundImagePreviewUrl: null,
      contentImagePreviewUrl: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
      files: [],
      toast: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    sAdminBannerApi.sAdminGetBannerList(formattedToken).then((response) => {
      this.setState({
        backgroundImage: response.data.backgroundImage,
        contentImage: response.data.contentImage,
        link: response.data.link,
        text: response.data.text,
        _id: response.data._id,
        apiLoadedCount: this.state.apiLoadedCount + 1,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const { backgroundImageFile, contentImageFile, text, link } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("text", text);
    fileData.append("link", link);
    fileData.append(
      "backgroundImage",
      backgroundImageFile ? backgroundImageFile : undefined
    );
    fileData.append(
      "contentImage",
      contentImageFile ? contentImageFile : undefined
    );

    sAdminBannerApi
      .sAdminUpdateBannerDetails(fileData, formattedToken)
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

  handleBackgroundImageChange(e) {
    this.setState({
      backgroundImageFile: null,
      backgroundImagePreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        backgroundImageFile: file,
        backgroundImagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleContentImageChange(e) {
    this.setState({
      contentImageFile: null,
      contentImagePreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        contentImageFile: file,
        contentImagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  showData() {
    const {
      backgroundImage,
      contentImage,
      submitting,
      submitted,
      errorStatus,
      backgroundImagePreviewUrl,
      contentImagePreviewUrl,
      text,
      link,
    } = this.state;

    const backgroundImageExists = checkFileExists(
      commonApi.api + backgroundImage
    );
    const contentImageExists = checkFileExists(commonApi.api + contentImage);

    // const linkValid = link ? true : false;

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>Banner</CCardHeader>
              <CCardBody>
                {submitted && errorStatus === 400 && (
                  <span className="validation-error mt-2">
                    Updating Slider Image Failed
                  </span>
                )}

                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className="form-group row">
                    <label
                      htmlFor="backgroundImage"
                      className="col-sm-4 col-form-label"
                    >
                      New Background Image
                    </label>

                    <div className="col-sm-8 text-left">
                      <input
                        className="fileInput"
                        type="file"
                        onChange={(e) => this.handleBackgroundImageChange(e)}
                      />
                    </div>
                  </div>

                  {!backgroundImagePreviewUrl && (
                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="sliderListPreview">
                          <img
                            src={
                              backgroundImageExists
                                ? commonApi.api + backgroundImage
                                : no_image
                            }
                            alt="slider img..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {backgroundImagePreviewUrl && (
                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="sliderListPreview">
                          <img
                            src={backgroundImagePreviewUrl}
                            alt="slider img..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-group row">
                    <label
                      htmlFor="contentImage"
                      className="col-sm-4 col-form-label"
                    >
                      New Content Image
                    </label>

                    <div className="col-sm-8 text-left">
                      <input
                        className="fileInput"
                        type="file"
                        onChange={(e) => this.handleContentImageChange(e)}
                      />
                    </div>
                  </div>

                  {!contentImagePreviewUrl && (
                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="sliderListPreview">
                          <img
                            src={
                              contentImageExists
                                ? commonApi.api + contentImage
                                : no_image
                            }
                            alt="slider img..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {contentImagePreviewUrl && (
                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="sliderListPreview">
                          <img
                            src={contentImagePreviewUrl}
                            alt="slider img..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="h3 mt-4">Text</p>
                  {submitted && !text && (
                    <span className="validation-error mt-2">
                      This field is required
                    </span>
                  )}

                  <Editor
                    //  onInit={(evt, editor) => editorRef.current = editor}
                    apiKey="igjcxaoj960y7yd2v5ibvdyvi4tu4mbgvuw4ijddgddk32oz"
                    value={text}
                    init={{
                      height: 300,
                      menubar: true,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={(newText) =>
                      this.setState({ text: newText })
                    }
                  />

                  <CFormGroup className="mt-3">
                    <CLabel htmlFor="link">Link</CLabel>

                    <CInput
                      // valid={linkValid && submitted}
                      // invalid={!linkValid && submitted}
                      id="link"
                      type="link"
                      name="link"
                      placeholder="Enter Link.."
                      value={link}
                      onChange={(e) => this.setState({ link: e.target.value })}
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

export default connect(mapStateToProps)(Banner);
