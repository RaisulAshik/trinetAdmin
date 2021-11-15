import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToast,
  CToastHeader,
  CToaster,
  CToastBody,
} from "@coreui/react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";

import { checkFileExists, getFormattedToken } from "src/helperFunctions";

import FullPageLoader from "../../hooks/Loader";

import { sAdminAboutUsApi } from "../../api";
import commonApi from "src/api/commonApi";

import { loaderUrl } from "src/constants";

import no_image from "../../assets/image/no_image.jpg";
import "./AboutUs.css";

class AboutUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      image: null,
      text: "",
      submitting: false,
      submitted: false,
      errorStatus: null,
      imageFile: null,
      imagePreviewUrl: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
      file: null,
      toast: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    sAdminAboutUsApi
      .sAdminGetAboutUsDetails(formattedToken)
      .then((response) => {
        this.setState({
          image: response.data.image,
          text: response.data.text,
          _id: response.data._id,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const { imageFile, text } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("text", text);
    fileData.append("image", imageFile ? imageFile : undefined);

    sAdminAboutUsApi
      .sAdminUpdateAboutUsDetails(fileData, formattedToken)
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
    const { image, submitting, submitted, errorStatus, imagePreviewUrl, text } =
      this.state;

    const imageExists = checkFileExists(commonApi.api + image);

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>Details of "About Us"</CCardHeader>
              <CCardBody>
                {submitted && errorStatus === 400 && (
                  <span className="validation-error mt-2">
                    Updating Slider Image Failed
                  </span>
                )}

                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className="form-group row">
                    <label htmlFor="image" className="col-sm-4 col-form-label">
                      New Image
                    </label>

                    <div className="col-sm-8 text-left">
                      <input
                        className="fileInput"
                        type="file"
                        onChange={(e) => this.handleImageChange(e)}
                      />
                    </div>
                  </div>

                  {!imagePreviewUrl && (
                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="sliderListPreview">
                          <img
                            src={imageExists ? commonApi.api + image : no_image}
                            alt="about us img..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {imagePreviewUrl && (
                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="sliderListPreview">
                          <img src={imagePreviewUrl} alt="about us img..." />
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
                      font_formats:
                      "Arial Black=arial black,avant garde; Courier New=courier new,courier;Poppins=poppins;Open-sans=Open-sans; Lato Black=lato; Roboto=roboto; Jost=jost;",
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                      "@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');body { font-family: 'Jost', sans-serif; } h1,h2,h3,h4,h5,h6 { font-family: 'Jost', sans-serif; }",
                    }}
                    onEditorChange={(newText) =>
                      this.setState({ text: newText })
                    }
                  />

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

export default connect(mapStateToProps)(AboutUs);
