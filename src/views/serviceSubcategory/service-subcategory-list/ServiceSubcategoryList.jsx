import React, { Component } from "react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CDataTable,
  CToast,
  CToastHeader,
  CToastBody,
  CButton,
  CRow,
  CToaster,
  CLink,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

import { getFormattedToken, history } from "src/helperFunctions";

import { sAdminServiceSubcategoryApi } from "src/api";

import FullPageLoader from "../../../hooks/Loader";

import { loaderUrl } from "src/constants";

const fields = ["title", "serviceCategory", "action"];

class ServiceSubcategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      data: [],
      showModal: false,
      totalApiCount: 1,
      apiLoadedCount: 0,
      deleting: false,
      toast: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    sAdminServiceSubcategoryApi
      .sAdminGetServiceSubcategoryList(formattedToken)
      .then((response) => {
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

    sAdminServiceSubcategoryApi
      .sAdminDeleteServiceSubcategory(_id, formattedToken)
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

        sAdminServiceSubcategoryApi
          .sAdminGetServiceSubcategoryList(formattedToken)
          .then((response) => {
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
    const { data, showModal, deleting, toast } = this.state;

    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Service Subcategory List</CCardHeader>
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
                    serviceCategory: (item) => (
                      <td>
                        {item.serviceCategory && item.serviceCategory.title
                          ? item.serviceCategory.title
                          : "N/A"}
                      </td>
                    ),
                    action: (item) => (
                      <td>
                        <CRow>
                          <Link to={"/service/service-subcategory-edit/" + item._id}>
                            <CIcon name="cil-pencil" title="Edit" />
                          </Link>
                          {/* <CLink
                            className="card-header-action"
                            onClick={() =>
                              history.push(
                                "/#/service/service-subcategory-edit/" + item._id
                              )
                            }
                          >
                            <CIcon name="cil-pencil" title="Edit" />
                          </CLink> */}

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
  const formattedToken = getFormattedToken(state.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(ServiceSubcategoryList);
