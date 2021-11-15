import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import {
  CCard,
  CCardBody,
  CToastBody,
  CInvalidFeedback,
  CCardHeader,
  CTextarea,
  CCol,
  CForm,
  CInputFile,
  CToastHeader,
  CFormGroup,
  CSelect,
  CFormText,
  CToast,
  CSwitch,
  CInput,
  CCardFooter,
  CButton,
  CToaster,
  CLabel,
  CRow,
} from "@coreui/react";

import { sAdminServiceCategoryApi, sAdminServiceSubcategoryApi } from "src/api";

import { getFormattedToken } from "src/helperFunctions";

import { loaderUrl } from "src/constants";

import no_image from "../../../assets/image/no_image.jpg";
import "./ServiceSubcategoryAdd.css";

class ServiceSubcategoryAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      submitting: false,
      submitted: false,
      errorStatus: null,
      categories: [],
      categoryId: "",
      shortDescription: "",
      longDescription: "",
      extraDescription: "",
      toast: null,
      smallImageFile: null,
      smallImagePreviewUrl: null,
      bigImageFile: null,
      bigImagePreviewUrl: null,
      featureAdded: false,
      numberOfFeatures: 0,
      featureFields: [],
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    sAdminServiceCategoryApi
      .sAdminGetServiceCategoryList(formattedToken)
      .then((response) => {
        this.setState({
          categories: response.data,
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const {
      title,
      categoryId,
      shortDescription,
      longDescription,
      extraDescription,
      smallImageFile,
      bigImageFile,
      featureAdded,
      featureFields,
    } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("title", title);
    fileData.append("serviceCategory", categoryId);
    fileData.append("shortDescription", shortDescription);
    fileData.append("longDescription", longDescription);
    fileData.append("extraDescription", extraDescription);
    fileData.append("smallImage", smallImageFile ? smallImageFile : undefined);
    fileData.append("bigImage", bigImageFile ? bigImageFile : undefined);

    if (featureAdded) {
      for (let index = 0; index < featureFields.length; index++) {
        const feature = featureFields[index];

        feature.featureIcon &&
          fileData.append("featureIcon[]", feature.featureIcon);
        feature.featureTitle &&
          fileData.append("featureTitle[]", feature.featureTitle);
        feature.featureDescription &&
          fileData.append("featureDescription[]", feature.featureDescription);
      }
    }

    sAdminServiceSubcategoryApi
      .sAdminAddServiceSubcategory(fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
          title: "",
          categoryId: "",
          shortDescription: "",
          longDescription: "",
          extraDescription: "",
          smallImageFile: null,
          bigImageFile: null,
          smallImagePreviewUrl: null,
          bigImagePreviewUrl: null,
          featureAdded: false,
          numberOfFeatures: 0,
          featureFields: [],
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

  handleSmallImageChange(e) {
    this.setState({
      smallImageFile: null,
      smallImagePreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        smallImageFile: file,
        smallImagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleBigImageChange(e) {
    this.setState({
      bigImageFile: null,
      bigImagePreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        bigImageFile: file,
        bigImagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  setCategoryInfo(categoryId) {
    this.setState({ categoryId: categoryId || "" });
  }

  render() {
    // console.log("check state", this.state);
    const {
      toast,
      title,
      submitting,
      submitted,
      errorStatus,
      categories,
      shortDescription,
      longDescription,
      extraDescription,
      categoryId,
      smallImagePreviewUrl,
      bigImagePreviewUrl,
      smallImageFile,
      bigImageFile,
      featureAdded,
      featureFields,
    } = this.state;

    const titleValid = title ? true : false;
    const categoryIdValid = categoryId ? true : false;
    const smallImageFileValid = smallImageFile ? true : false;
    const bigImageFileValid = bigImageFile ? true : false;

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Service Subcategory
                  <small> New Add</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">
                      Adding Subcategory Name Failed
                    </span>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="title">New Subcategory</CLabel>

                    <CInput
                      valid={titleValid && submitted}
                      invalid={!titleValid && submitted}
                      id="title"
                      type="title"
                      name="title"
                      placeholder="Enter New Subcategory Name.."
                      value={title}
                      onChange={(e) => this.setState({ title: e.target.value })}
                    />

                    <CFormText className="help-block">
                      Please enter new subcategory name
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="select">Select Category Name</CLabel>

                    <CSelect
                      valid={categoryIdValid && submitted}
                      invalid={!categoryIdValid && submitted}
                      custom
                      name="select"
                      id="select"
                      value={categoryId || 0}
                      onChange={(e) => {
                        this.setCategoryInfo(e.target.value);
                      }}
                    >
                      <option value="0" disabled>
                        Please select
                      </option>

                      {categories.map((data) => (
                        <option key={data._id} value={data._id}>
                          {data.title}
                        </option>
                      ))}
                    </CSelect>

                    <CFormText className="help-block">
                      Please select category
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <p className="h3 mt-4">Description (short)</p>

                  {submitted && !shortDescription && (
                    <span className="validation-error mt-2">
                      This field is required
                    </span>
                  )}

                  <Editor
                    apiKey="igjcxaoj960y7yd2v5ibvdyvi4tu4mbgvuw4ijddgddk32oz"
                    value={shortDescription}
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
                    onEditorChange={(newShortDescription) =>
                      this.setState({ shortDescription: newShortDescription })
                    }
                  />

                  <p className="h3 mt-4">Description (long)</p>

                  {submitted && !longDescription && (
                    <span className="validation-error mt-2">
                      This field is required
                    </span>
                  )}

                  <Editor
                    apiKey="igjcxaoj960y7yd2v5ibvdyvi4tu4mbgvuw4ijddgddk32oz"
                    value={longDescription}
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
                    onEditorChange={(newLongDescription) =>
                      this.setState({ longDescription: newLongDescription })
                    }
                  />

                  <p className="h3 mt-4">Description (extra)</p>

                  {submitted && !extraDescription && (
                    <span className="validation-error mt-2">
                      This field is required
                    </span>
                  )}

                  <Editor
                    apiKey="igjcxaoj960y7yd2v5ibvdyvi4tu4mbgvuw4ijddgddk32oz"
                    value={extraDescription}
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
                    onEditorChange={(newExtraDescription) =>
                      this.setState({ extraDescription: newExtraDescription })
                    }
                  />

                  <CFormGroup className="mt-4">
                    <CLabel htmlFor="smallImage">Image (small)</CLabel>

                    <CInputFile
                      valid={smallImageFileValid && submitted}
                      invalid={!smallImageFileValid && submitted}
                      className="fileInput"
                      type="file"
                      onChange={(e) => this.handleSmallImageChange(e)}
                    />

                    <CFormText className="help-block">
                      Please select a small image
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>

                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="imgPreview">
                          <img
                            src={
                              smallImagePreviewUrl
                                ? smallImagePreviewUrl
                                : no_image
                            }
                            alt="logo preview..."
                          />
                        </div>
                      </div>
                    </div>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="bigImage">Image (large)</CLabel>

                    <CInputFile
                      valid={bigImageFileValid && submitted}
                      invalid={!bigImageFileValid && submitted}
                      className="fileInput"
                      type="file"
                      onChange={(e) => this.handleBigImageChange(e)}
                    />

                    <CFormText className="help-block">
                      Please select a large image
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>

                    <div className="container">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="imgPreview">
                          <img
                            src={
                              bigImagePreviewUrl ? bigImagePreviewUrl : no_image
                            }
                            alt="logo preview..."
                          />
                        </div>
                      </div>
                    </div>
                  </CFormGroup>

                  <CFormGroup row>
                    <CSwitch
                      className="mr-1"
                      color="primary"
                      checked={featureAdded}
                      onChange={() => {
                        this.setState({
                          featureAdded: !this.state.featureAdded,
                        });
                      }}
                    />

                    <CLabel htmlFor="select">Want to add features?</CLabel>
                  </CFormGroup>

                  {featureAdded && (
                    <>
                      {featureFields.map((field, index) => {
                        const featureIconValid = field.featureIcon
                          ? true
                          : false;
                        const featureTitleValid = field.featureTitle
                          ? true
                          : false;
                        const featureDescriptionValid = field.featureDescription
                          ? true
                          : false;

                        return (
                          <div key={index} className="mb-5">
                            <p className="h3">Feature No {index + 1}</p>

                            <CButton
                              className="mb-2"
                              variant="outline"
                              color="danger"
                              onClick={() => {
                                const newFields = [...this.state.featureFields];
                                newFields.splice(index, 1);
                                this.setState({
                                  numberOfFeatures:
                                    this.state.numberOfFeatures - 1,
                                  featureFields: newFields,
                                });
                              }}
                            >
                              Delete this feature
                            </CButton>

                            <CFormGroup>
                              <CLabel htmlFor="featureIcon">
                                Icon Class Name
                              </CLabel>

                              <CInput
                                valid={featureIconValid && submitted}
                                invalid={!featureIconValid && submitted}
                                id="featureIcon"
                                type="featureIcon"
                                name="featureIcon"
                                placeholder="Enter class name of the icon.."
                                value={field.featureIcon}
                                onChange={(e) =>
                                  this.setState((prevState) => ({
                                    featureFields: prevState.featureFields.map(
                                      (obj, prevIndex) =>
                                        index === prevIndex
                                          ? Object.assign(obj, {
                                              featureIcon: e.target.value,
                                            })
                                          : obj
                                    ),
                                  }))
                                }
                              />

                              <CFormText className="help-block">
                                Please enter fa icon class name
                              </CFormText>

                              <CInvalidFeedback>
                                This field is required
                              </CInvalidFeedback>
                            </CFormGroup>

                            <CFormGroup>
                              <CLabel htmlFor="featureTitle">Title</CLabel>

                              <CInput
                                valid={featureTitleValid && submitted}
                                invalid={!featureTitleValid && submitted}
                                id="featureTitle"
                                type="featureTitle"
                                name="featureTitle"
                                placeholder="Enter title of the feature.."
                                value={field.featureTitle}
                                onChange={(e) =>
                                  this.setState((prevState) => ({
                                    featureFields: prevState.featureFields.map(
                                      (obj, prevIndex) =>
                                        index === prevIndex
                                          ? Object.assign(obj, {
                                              featureTitle: e.target.value,
                                            })
                                          : obj
                                    ),
                                  }))
                                }
                              />

                              <CInvalidFeedback>
                                This field is required
                              </CInvalidFeedback>
                            </CFormGroup>

                            <CFormGroup>
                              <CLabel htmlFor="featureDescription">
                                Description
                              </CLabel>

                              <CTextarea
                                valid={featureDescriptionValid && submitted}
                                invalid={!featureDescriptionValid && submitted}
                                id="featureDescription"
                                rows="5"
                                type="textarea"
                                name="featureDescription"
                                placeholder="Enter Description of the feature.."
                                value={field.featureDescription}
                                onChange={(e) =>
                                  this.setState((prevState) => ({
                                    featureFields: prevState.featureFields.map(
                                      (obj, prevIndex) =>
                                        index === prevIndex
                                          ? Object.assign(obj, {
                                              featureDescription:
                                                e.target.value,
                                            })
                                          : obj
                                    ),
                                  }))
                                }
                              />

                              {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                              <CInvalidFeedback>
                                This field is required
                              </CInvalidFeedback>
                            </CFormGroup>
                          </div>
                        );
                      })}

                      <CRow className="align-items-center">
                        <CButton
                          variant="outline"
                          color="success"
                          onClick={() => {
                            this.setState({
                              numberOfFeatures: this.state.numberOfFeatures + 1,
                              featureFields: [
                                ...this.state.featureFields,
                                {
                                  featureIcon: "",
                                  featureTitle: "",
                                  featureDescription: "",
                                },
                              ],
                            });
                          }}
                        >
                          Add New Feature
                        </CButton>
                      </CRow>
                    </>
                  )}
                </CCardBody>

                <CCardFooter>
                  <div className="row justify-content-center">
                    {submitting ? (
                      <img src={loaderUrl} alt="Please Wait..." />
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Submit Subcategory Data
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

export default connect(mapStateToProps)(ServiceSubcategoryAdd);
