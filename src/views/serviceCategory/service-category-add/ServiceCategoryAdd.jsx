import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CToastBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CToastHeader,
  CFormGroup,
  CInvalidFeedback,
  CToast,
  CInput,
  CToaster,
  CLabel,
  CRow,
} from "@coreui/react";

import { getFormattedToken } from "src/helperFunctions";

import { sAdminServiceCategoryApi } from "src/api";

import { loaderUrl } from "src/constants";

import "./ServiceCategoryAdd.css";

class ServiceCategoryAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      submitting: false,
      submitted: false,
      errorStatus: null,
      toast: null,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const { title } = this.state;

    const { formattedToken } = this.props;

    const data = { title };

    sAdminServiceCategoryApi
      .sAdminAddServiceCategory(data, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
          title: "",
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

  render() {
    const { toast, title, submitting, submitted, errorStatus } = this.state;

    const titleValid = title ? true : false;

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Service Category
                  <small> New Add</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">
                      Adding Category Name Failed
                    </span>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="title">New Category</CLabel>

                    <CInput
                      valid={titleValid && submitted}
                      invalid={!titleValid && submitted}
                      id="title"
                      type="title"
                      name="title"
                      placeholder="Enter New Category.."
                      value={title}
                      onChange={(e) => this.setState({ title: e.target.value })}
                    />

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>
                </CCardBody>

                <CCardFooter>
                  {submitting ? (
                    <img src={loaderUrl} alt="Please Wait..." />
                  ) : (
                    <CButton type="submit" size="sm" color="primary">
                      Submit
                    </CButton>
                  )}
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

export default connect(mapStateToProps)(ServiceCategoryAdd);
