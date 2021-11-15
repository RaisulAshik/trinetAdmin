import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CLabel,
  CCol,
  CFormGroup,
  CInput,
  CRow,
  CInvalidFeedback,
  CToast,
  CToastHeader,
  CToaster,
  CToastBody,
} from "@coreui/react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";

import { getFormattedToken } from "src/helperFunctions";

import { sAdminPrivacyPolicyApi } from "../../api";

import FullPageLoader from "../../hooks/Loader";

import { loaderUrl } from "src/constants";

import "./PrivacyPolicy.css";

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      title: "",
      description: "",
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

    sAdminPrivacyPolicyApi
      .sAdminGetPrivacyPolicyDetails(formattedToken)
      .then((response) => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          _id: response.data._id,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const { description, title } = this.state;

    const { formattedToken } = this.props;

    // const fileData = new FormData();
    // fileData.append("description", description);
    // fileData.append("title", title);

    const data = { title, description };

    sAdminPrivacyPolicyApi
      .sAdminUpdatePrivacyPolicyDetails(data, formattedToken)
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

  showData() {
    const { submitting, submitted, errorStatus, description, title } =
      this.state;

    const titleValid = title ? true : false;

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>Privacy Policy</CCardHeader>
              <CCardBody>
                {submitted && errorStatus === 400 && (
                  <span className="validation-error mt-2">
                    Updating Privacy Policy Failed
                  </span>
                )}

                <form onSubmit={this.handleSubmit.bind(this)}>
                  <CFormGroup>
                    <CLabel htmlFor="title">Title</CLabel>

                    <CInput
                      valid={titleValid && submitted}
                      invalid={!titleValid && submitted}
                      id="title"
                      type="title"
                      name="title"
                      placeholder="Enter Title.."
                      value={title}
                      onChange={(e) => this.setState({ title: e.target.value })}
                    />

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

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

export default connect(mapStateToProps)(PrivacyPolicy);
