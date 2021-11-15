import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import {
  CButton,
  CCardBody,
  CToastBody,
  CCardHeader,
  CCol,
  CForm,
  CInvalidFeedback,
  CToastHeader,
  CFormGroup,
  CCard,
  CFormText,
  CCardFooter,
  CToast,
  CInput,
  CInputFile,
  CToaster,
  CLabel,
  CRow,
} from "@coreui/react";

import { getFormattedToken } from "src/helperFunctions";

import { loaderUrl } from "src/constants";

import { sAdminBlogApi } from "src/api";

import no_image from "../../../assets/image/no_image.jpg";
import "./BlogAdd.css";

class BlogAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      date: "",
      authorName: "",
      blogImageFile: null,
      blogImagePreviewUrl: null,
      authorImageFile: null,
      authorImagePreviewUrl: null,
      submitting: false,
      submitted: false,
      errorStatus: null,
      toast: null,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const {
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
      .sAdminAddBlog(fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
          title: "",
          description: "",
          date: "",
          authorName: "",
          blogImageFile: null,
          blogImagePreviewUrl: null,
          authorImageFile: null,
          authorImagePreviewUrl: null,
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

  render() {
    // console.log("check state", this.state);

    const {
      title,
      description,
      date,
      authorName,
      blogImagePreviewUrl,
      authorImagePreviewUrl,
      submitting,
      submitted,
      errorStatus,
      toast,
      blogImageFile,
      authorImageFile,
    } = this.state;

    const titleValid = title ? true : false;
    const dateValid = date ? true : false;
    const authorNameValid = authorName ? true : false;
    const blogImageFileValid = blogImageFile ? true : false;
    const authorImageFileValid = authorImageFile ? true : false;

    return (
      <>
        <CRow>
          <CCol>
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Blog
                  <small> New Add</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">Adding Blog Failed</span>
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

                    <CFormText className="help-block">
                      Please enter title
                    </CFormText>
                  </CFormGroup>

                  <CInvalidFeedback>This field is required</CInvalidFeedback>

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

                    <CFormText className="help-block">
                      Please select a date
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="rating">Author Name</CLabel>

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
                      Please enter author name
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="image">New Blog Image</CLabel>

                    <CInputFile
                      valid={blogImageFileValid && submitted}
                      invalid={!blogImageFileValid && submitted}
                      className="fileInput"
                      type="file"
                      onChange={(e) => this.handleBlogImageChange(e)}
                    />

                    <CFormText className="help-block">
                      Please select a blog image
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>

                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="imgPreview">
                          <img
                            src={
                              blogImagePreviewUrl
                                ? blogImagePreviewUrl
                                : no_image
                            }
                            alt="logo preview..."
                          />
                        </div>
                      </div>
                    </div>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="image">New Author Image</CLabel>

                    <CInputFile
                      valid={authorImageFileValid && submitted}
                      invalid={!authorImageFileValid && submitted}
                      className="fileInput"
                      type="file"
                      onChange={(e) => this.handleAuthorImageChange(e)}
                    />

                    <CFormText className="help-block">
                      Please select an author image
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>

                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="imgPreview">
                          <img
                            src={
                              authorImagePreviewUrl
                                ? authorImagePreviewUrl
                                : no_image
                            }
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

export default connect(mapStateToProps)(BlogAdd);
