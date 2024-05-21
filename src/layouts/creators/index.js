import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as APIPATHS from "../../API/path";
import APIRequest from "../../API";
import toast from "react-hot-toast";

import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import AlertDialog from "components/ConfirmationDialog";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import { RoleTypes } from "../../Constant/enums/roleTypes";
import { fetchUsersList } from "../../Redux/slices/exploreSlice";
// Data
import team4 from "../../assets/images/team-4.jpg";

// social logos
import logoFacebook from "assets/images/small-logos/logo-facebook.svg";
import logoThread from "assets/images/small-logos/logo-threads.svg";
import logoInstagram from "assets/images/small-logos/logo-instagram.svg";
import logoYoutube from "assets/images/small-logos/logo-youtube.svg";
import logoLink from "assets/images/small-logos/logo-link.svg";

// icon
import deleteIcon from "assets/images/icon-delete.svg";
import dummyUser from "../../assets/images/user-dummy.png";

function Creators() {
  const { loading, results } = useSelector((state) => state.explore);
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [isOpenAlertDialoge, setIsOpenAlertDialoge] = useState(false);
  const [isOpenAlertDeleteDialoge, setIsOpenAlertDeleteDialoge] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    { name: "user", align: "left" },
    { name: "socialLinks", align: "center" },
    { name: "subscribes", align: "center" },
    { name: "status", align: "center" },
    { name: "approve", align: "center" },
    { name: "action", align: "center" },
  ];

  const Author = (data) => {
    const { image, name, email } = data;
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox mr={2}>
          <SoftAvatar src={team4} alt={name} size="sm" variant="rounded" />
        </SoftBox>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {name}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            {email}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    );
  };

  const handleDelete = (isAgree) => {
    setIsOpenAlertDeleteDialoge(false);
    // Implement further actions based on isDeleted and selectedUser
    const path = APIPATHS.upadateUserById;
    path.url = path.url.replaceAll("{{userId}}", selectedUser.id);
    const payload = {
      isDeleted: isAgree,
    };
    // Your reset password logic goes here
    const promise = APIRequest(path, payload);

    toast.promise(promise, {
      loading: "Loading...",
      success: (data) => {
        if (data.error) throw new Error(data.error.message);
        setTimeout(() => {
          fetchData();
        }, [1500]);
        return "User updated successfully.";
      },
      error: (err) => {
        return err.message;
      },
    });
  };

  const handleApproveUnapprove = (isApproved) => {
    setIsOpenAlertDialoge(false);
    // Implement further actions based on isApproved and selectedUser
    const path = APIPATHS.upadateUserById;
    path.url = path.url.replaceAll("{{userId}}", selectedUser.id);
    const payload = {
      isApproved: isApproved,
    };
    // Your reset password logic goes here
    const promise = APIRequest(path, payload);

    toast.promise(promise, {
      loading: "Loading...",
      success: (data) => {
        if (data.error) throw new Error(data.error.message);
        setTimeout(() => {
          fetchData();
        }, [1500]);
        return "User updated successfully.";
      },
      error: (err) => {
        return err.message;
      },
    });
  };

  const fetchData = useCallback(
    (pageNo) => {
      const requestPayload = {
        limit: 10,
        page: pageNo,
        isFilterBySubscriber: false,
        role: RoleTypes.CREATOR,
      };
      dispatch(fetchUsersList(requestPayload));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(pageNo);
  }, [fetchData, pageNo]);

  useEffect(() => {
    if (results.length > 0) {
      const finalRowData = results.map((item) => ({
        user: (
          <Author
            image={item?.image && item?.image?.fileURL ? item?.image?.fileURL : dummyUser}
            name={item.fullname}
            email={item.email}
          />
        ),
        socialLinks: (
          <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
            {item?.socialLinks?.facebook && (
              <SoftTypography variant="button" fontWeight="medium">
                <Link to={item.socialLinks.facebook} target="__blank">
                  <img src={logoFacebook} alt="facebooklogo" height={20} width={20} />
                </Link>
              </SoftTypography>
            )}
            {item?.socialLinks?.instagram && (
              <SoftTypography variant="button" fontWeight="medium" sx={{ mx: 1 }}>
                <Link to={item.socialLinks.instagram} target="__blank">
                  <img src={logoInstagram} alt="instagramlogo" height={20} width={20} />
                </Link>
              </SoftTypography>
            )}
            {item?.socialLinks?.threads && (
              <SoftTypography variant="button" fontWeight="medium" sx={{ mx: 1 }}>
                <Link to={item.socialLinks.threads} target="__blank">
                  <img src={logoThread} alt="threadslogo" height={20} width={20} />
                </Link>
              </SoftTypography>
            )}
            {item?.socialLinks?.youtube && (
              <SoftTypography variant="button" fontWeight="medium" sx={{ mx: 1 }}>
                <Link to={item.socialLinks.youtube} target="__blank">
                  <img src={logoYoutube} alt="youtubelogo" height={20} width={20} />
                </Link>
              </SoftTypography>
            )}
            {item?.socialLinks?.others && (
              <SoftTypography variant="button" fontWeight="medium" sx={{ mx: 1 }}>
                <Link to={item.socialLinks.others} target="__blank">
                  <img src={logoLink} alt="linklogo" height={20} width={20} />
                </Link>
              </SoftTypography>
            )}
          </SoftBox>
        ),
        subscribes: (
          <SoftTypography variant="button" fontWeight="medium">
            {item.subscribeTo.length}
          </SoftTypography>
        ),
        status: (
          <SoftBadge
            variant="gradient"
            badgeContent={item.isDeleted ? "inActive" : "Active"}
            color={item.isDeleted ? "secondary" : "success"}
            size="xs"
            container
          />
        ),
        approve: (
          <SoftBox mt={3} mb={2} lineHeight={1}>
            <Switch
              checked={item.isApproved}
              onChange={() => {
                setSelectedUser(item);
                setIsOpenAlertDialoge(true);
              }}
            />
          </SoftBox>
        ),
        action: (
          <SoftBox mt={3} mb={2} lineHeight={1}>
            <Button
              onClick={() => {
                setSelectedUser(item);
                setIsOpenAlertDeleteDialoge(true);
              }}
            >
              <img src={deleteIcon} alt="delete-icon" height={30} width={30} />
            </Button>
          </SoftBox>
        ),
      }));
      setRowData(finalRowData);
    }
  }, [results]);

  const handlePageChange = (event, newPage) => {
    setPageNo(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNo(0);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Users table</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table
                columns={columns}
                rows={rowData}
                loading={loading}
                page={pageNo}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {isOpenAlertDialoge && (
        <AlertDialog
          title="Approve creator?"
          description="Are you sure you want to approve the creator?"
          agreeButtonText="Agree"
          disAgreeButtonText="Disagree"
          openDialog={isOpenAlertDialoge}
          handleClose={() => setIsOpenAlertDialoge(false)}
          handleAction={(isApproved) => handleApproveUnapprove(isApproved)}
          currentStatus={selectedUser.isApproved}
        />
      )}
      {isOpenAlertDeleteDialoge && (
        <AlertDialog
          title="Delete User"
          description="Are you sure you want to delete the creator?"
          agreeButtonText="Agree"
          disAgreeButtonText="Disagree"
          openDialog={isOpenAlertDeleteDialoge}
          handleClose={() => setIsOpenAlertDeleteDialoge(false)}
          handleAction={(isAgree) => handleDelete(isAgree)}
          currentStatus={selectedUser.isDeleted}
        />
      )}
    </DashboardLayout>
  );
}

export default Creators;
