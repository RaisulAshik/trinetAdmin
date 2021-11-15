import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CToastBody,
  CInputFile,
  CCardHeader,
  CCol,
  CForm,
  CInvalidFeedback,
  CToastHeader,
  CCardFooter,
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

import { loaderUrl } from "src/constants";

import commonApi from "src/api/commonApi";
import { sAdminBlogApi } from "src/api";

import no_image from "../../../assets/image/no_image.jpg";
import "./BlogEdit.css";

class BlogEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      title: "",
      description: "",
      date: "",
      authorName: "",
      blogImage: null,
      blogImageFile: null,
      blogImagePreviewUrl: null,
      authorImage: null,
      authorImageFile: null,
      authorImagePreviewUrl: null,
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

    sAdminBlogApi.sAdminGetBlogDetails(id, formattedToken).then((response) => {
      const date = new Date(response.data.date);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      const formattedDate = year + "-" + month + "-" + dt;

      this.setState({
        _id: response.data._id,
        title: response.data.title,
        description: response.data.description,
        date: formattedDate,
        authorName: response.data.authorName,
        blogImage: response.data.blogImage,
        authorImage: response.data.authorImage,
        apiLoadedCount: this.state.apiLoadedCount + 1,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const {
      _id,
      title,
      description,
      date,
      authorName,
      blogImageFile,
      authorImageFile,
    } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("title", title);
    fileData.append("description", description);
    fileData.append("date", date);
    fileData.append("authorName", authorName);
    fileData.append("blogImage", blogImageFile ? blogImageFile : undefined);
    fileData.append(
      "authorImage",
      authorImageFile ? authorImageFile : undefined
    );

    sAdminBlogApi
      .sAdminUpdateBlogDetails(_id, fileData, formattedToken)
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

  handleBlogImageChange(e) {
    this.setState({
      blogImageFile: null,
      blogImagePreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        blogImageFile: file,
        blogImagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleAuthorImageChange(e) {
    this.setState({
      authorImageFile: null,
      authorImagePreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        authorImageFile: file,
        authorImagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  showData() {
    const {
      title,
      submitting,
      submitted,
      errorStatus,
      toast,
      blogImage,
      authorImage,
      description,
      date,
      authorName,
      blogImagePreviewUrl,
      authorImagePreviewUrl,
    } = this.state;

    const blogImageExists = checkFileExists(commonApi.api + blogImage);
    const authorImageExists = checkFileExists(commonApi.api + authorImage);

    const titleValid = title ? true : false;
    const dateValid = date ? true : false;
    const authorNameValid = authorName ? true : false;

    return (
      <>
        <CRow>
          <CCol>
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Blog
                  <small> Edit</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">
                      Updating Blog Data Failed
                    </span>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="title">Title</CLabel>

                    <CInput
                      valid={titleValid && submitted}
                      invalid={!titleValid && submitted}
                      type="title"
                      id="title"
                      name="title"
                      placeholder="Enter Title.."
                      value={title}
                      onChange={(e) => this.setState({ title: e.target.value })}
                    />

                    <CFormText className="help-block">Enter title</CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <p className="h3 mt-4">Description</p>
                  {submitted && !description && (
                    <span className="validation-error mt-2">
                      This field is required
                    </span>
                  )}

                  <Editor
                    apiKey="igjcxaoj960y7yd2v5ibvdyvi4tu4mbgvuw4ijddgddk32oz"
                    value={description}
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
                    onEditorChange={(newDescription) =>
                      this.setState({ description: newDescription })
                    }
                  />

                  <CFormGroup className="mt-3">
                    <CLabel htmlFor="date-input">Date</CLabel>

                    <CInput
                      valid={dateValid && submitted}
                      invalid={!dateValid && submitted}
                      type="date"
                      id="date-input"
                      name="date-input"
                      placeholder="date"
                      value={date}
                      onChange={(e) => this.setState({ date: e.target.value })}
                    />

                    <CFormText className="help-block">Select date</CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="authorName">Author Name</CLabel>

                    <CInput
                      valid={authorNameValid && submitted}
                      invalid={!authorNameValid && submitted}
                      type="authorName"
                      id="authorName"
                      name="authorName"
                      placeholder="Enter Author Name.."
                      value={authorName}
                      onChange={(e) =>
                        this.setState({ authorName: e.target.value })
                      }
                    />

                    <CFormText className="help-block">
                      Enter author name
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="image">Blog Image</CLabel>

                    <CInputFile
                      className="fileInput"
                      type="file"
                      onChange={(e) => this.handleBlogImageChange(e)}
                    />

                    <CFormText className="help-block">
                      Select blog image
                    </CFormText>

                    {!blogImagePreviewUrl && (
                      <div className="container mb-2">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="imgPreview">
                            <img
                              src={
                                blogImageExists
                                  ? commonApi.api + blogImage
                                  : no_image
                              }
                              alt="slider img..."
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {blogImagePreviewUrl && (
                      <div className="container mb-2">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="imgPreview">
                            <img
                              src={blogImagePreviewUrl}
                              alt="slider img..."
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="image">Author Image</CLabel>

                    <CInputFile
                      className="fileInput"
                      type="file"
                      onChange={(e) => this.handleAuthorImageChange(e)}
                    />

                    <CFormText className="help-block">
                      Select an author image
                    </CFormText>

                    {!authorImagePreviewUrl && (
                      <div className="container mb-2">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="imgPreview">
                            <img
                              src={
                                authorImageExists
                                  ? commonApi.api + authorImage
                                  : no_image
                              }
                              alt="slider img..."
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {authorImagePreviewUrl && (
                      <div className="container mb-2">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="imgPreview">
                            <img
                              src={authorImagePreviewUrl}
                              alt="slider img..."
                            />
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

export default connect(mapStateToProps)(BlogEdit);
