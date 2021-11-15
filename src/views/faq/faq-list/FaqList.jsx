import React, { Component } from "react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToastBody,
  CButton,
  CLink,
  CToaster,
  CToast,
  CToastHeader,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CDataTable,
  CModal,
} from "@coreui/react";

import { getFormattedToken, history } from "src/helperFunctions";

import FullPageLoader from "../../../hooks/Loader";

import { loaderUrl } from "src/constants";

import { sAdminFaqApi } from "src/api";

// import convert from "htmlToText";
// const { convert } = require("html-to-text");

const fields = ["question", "answer", "action"];

class FaqList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      data: [],
      showModal: false,
      submitting: false,
      submitted: false,
      errorStatus: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
      deleting: false,
      toast: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    sAdminFaqApi.sAdminGetFaqList(formattedToken).then((response) => {
      this.setState({
        data: response.data,
        apiLoadedCount: this.state.apiLoadedCount + 1,
      });
    });
  }

  handleDelete() {
    const { _id } = this.state;

    this.setState({ deleting: true, toast: null });

    const { formattedToken } = this.props;

    sAdminFaqApi
      .sAdminDeleteFaq(_id, formattedToken)
      .then((response) => {
        this.setState({
          deleting: false,
          showModal: !this.state.showModal,
          _id: null,
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
                    <CToastBody>Data Deleted Successfully</CToastBody>
                  </CToast>
                </CToaster>
              </CCol>
            </>
          ),
        });

        sAdminFaqApi.sAdminGetFaqList(formattedToken).then((response) => {
          this.setState({
            data: response.data,
          });
        });
      })
      .catch((error) => {
        this.setState({
          deleting: false,
          showModal: !this.state.showModal,
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
                    <CToastBody>Data Deleting Failed</CToastBody>
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
    const { data, toast, showModal, deleting } = this.state;

    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>FAQ List</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={data}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    action: (item) => (
                      <td>
                        <CRow>
                          <Link to={"/faq/faq-edit/" + item._id}>
                            <CIcon name="cil-pencil" title="Edit" />
                          </Link>
                          {/* <CLink
                            className="card-header-action"
                            onClick={() =>
                              history.push("/#/faq/faq-edit/" + item._id)
                            }
                          > 
                            <CIcon name="cil-pencil" title="Edit" />
                          </CLink>*/}

                          <CLink
                            className="card-header-action"
                            onClick={() => {
                              this.setState({
                                showModal: !showModal,
                                _id: item._id,
                              });
                            }}
                          >
                            <CIcon name="cil-trash" title="Delete" />
                          </CLink>
                        </CRow>
                      </td>
                    ),
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CModal
          show={showModal}
          onClose={() => this.setState({ showModal: !showModal })}
          color="danger"
        >
          <CModalHeader closeButton>
            <CModalTitle>Please Confirm</CModalTitle>
          </CModalHeader>

          <CModalBody>
            Do you really want to delete this data? This process can't be
            undone.
          </CModalBody>

          <CModalFooter>
            {deleting ? (
              <img src={loaderUrl} alt="Please Wait..." />
            ) : (
              <CButton color="danger" onClick={() => this.handleDelete()}>
                DELETE
              </CButton>
            )}

            <CButton
              color="secondary"
              onClick={() =>
                this.setState({ showModal: !showModal, _id: null })
              }
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

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
  //   console.log("check store", state.check);
  const formattedToken = getFormattedToken(state.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(FaqList);
