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
  CToastHeader,
  CInvalidFeedback,
  CInputFile,
  CFormGroup,
  CCard,
  CFormText,
  CCardFooter,
  CToast,
  CInput,
  CToaster,
  CLabel,
  CRow,
} from "@coreui/react";

import { getFormattedToken } from "src/helperFunctions";

import { sAdminTestimonialApi } from "src/api";

import { loaderUrl } from "src/constants";

import no_image from "../../../assets/image/no_image.jpg";
import "./TestimonialAdd.css";

class TestimonialAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      review: "",
      rating: "",
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

    const { name, review, rating, imageFile } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("name", name);
    fileData.append("review", review);
    fileData.append("rating", rating);
    fileData.append("image", imageFile ? imageFile : undefined);

    sAdminTestimonialApi
      .sAdminAddTestimonial(fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
          name: "",
          review: "",
          rating: "",
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
      review,
      rating,
      imagePreviewUrl,
      submitting,
      submitted,
      errorStatus,
      toast,
      imageFile,
    } = this.state;

    const nameValid = name ? true : false;
    const ratingValid = Math.sign(rating) === 1 ? true : false;
    const imageFileValid = imageFile ? true : false;

    return (
      <>
        <CRow>
          <CCol>
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Testimonial
                  <small> New Add</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">
                      Adding Testimonial Failed
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
                    <CLabel htmlFor="rating">Rating</CLabel>

                    <CInput
                      valid={ratingValid && submitted}
                      invalid={!ratingValid && submitted}
                      type="rating"
                      id="rating"
                      name="rating"
                      placeholder="Enter Rating.."
                      value={rating}
                      onChange={(e) =>
                        this.setState({ rating: e.target.value })
                      }
                    />

                    <CFormText className="help-block">
                      Please enter rating (number only)
                    </CFormText>

                    <CInvalidFeedback>
                      Valid number is required
                    </CInvalidFeedback>
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
                      Please select an image
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

                  <p className="h3 mt-4">Review</p>
                  {submitted && !review && (
                    <span className="validation-error mt-2">
                      This field is required
                    </span>
                  )}

                  <Editor
                    apiKey="igjcxaoj960y7yd2v5ibvdyvi4tu4mbgvuw4ijddgddk32oz"
                    value={review}
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
                    onEditorChange={(newReview) =>
                      this.setState({ review: newReview })
                    }
                  />
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

export default connect(mapStateToProps)(TestimonialAdd);
