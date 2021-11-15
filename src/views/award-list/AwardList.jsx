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

import FullPageLoader from "../../hooks/Loader";

import { loaderUrl } from "src/constants";

import commonApi from "src/api/commonApi";
import { sAdminAwardApi } from "../../api";

import {
  checkFileExists,
  getFormattedToken,
  history,
} from "src/helperFunctions";

import no_image from "../../assets/image/no_image.jpg";
import "./AwardList.css";

class AwardList extends Component {
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

    sAdminAwardApi.sAdminGetAwardList(formattedToken).then((response) => {
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

    sAdminAwardApi
      .sAdminDeleteAward(_id, formattedToken)
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

        sAdminAwardApi.sAdminGetAwardList(formattedToken).then((response) => {
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
          {data.map((d) => {
            const { image, _id } = d;

            const imageExists = checkFileExists(commonApi.api + image);

            return (
              <CCol xs="12" sm="6" md="4" key={_id}>
                <CCard accentColor="info">
                  <CCardHeader>
                    Award
                    <div className="card-header-actions">
                      <Link to={"/award/award-edit/" + _id}>
                        <CIcon name="cil-pencil" title="Edit" />
                      </Link>
                      {/* <CLink
                        className="card-header-action"
                        onClick={() =>
                          history.push("/#/award/award-edit/" + _id)
                        }
                      >
                        <CIcon name="cil-pencil" title="Edit" />
                      </CLink> */}

                      <CLink
                        className="card-header-action"
                        onClick={() => {
                          this.setState({ showModal: !showModal, _id });
                        }}
                      >
                        <CIcon name="cil-trash" title="Delete" />
                      </CLink>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <div className="container mb-4">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="imgPreview">
                          <img
                            src={imageExists ? commonApi.api + image : no_image}
                            alt="slider img..."
                          />
                        </div>
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            );
          })}
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

    console.log("check state", this.state);

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

export default connect(mapStateToProps)(AwardList);
