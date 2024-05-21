import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as APIPATHS from "../../API/path";
import APIRequest from "../../API";
import toast from "react-hot-toast";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import AlertDialog from "components/ConfirmationDialog";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

import { RoleTypes } from "../../Constant/enums/roleTypes";
import { fetchUsersList } from "../../Redux/slices/exploreSlice";
import team4 from "../../assets/images/team-4.jpg";
import dummyUser from "../../assets/images/user-dummy.png";

// icon
import deleteIcon from "assets/images/icon-delete.svg";

function Users() {
  const { loading, results } = useSelector((state) => state.explore);
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowData, setRowData] = useState([]);
  const [isOpenAlertDeleteDialoge, setIsOpenAlertDeleteDialoge] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    { name: "user", align: "left" },
    { name: "subscribes", align: "center" },
    { name: "status", align: "center" },
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

  const fetchData = useCallback(
    (pageNo, rowsPerPage) => {
      let requestPayload = {
        limit: rowsPerPage,
        page: pageNo,
        isFilterBySubscriber: false,
        role: RoleTypes.USER,
      };
      dispatch(fetchUsersList(requestPayload));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(pageNo, rowsPerPage);
  }, [fetchData, pageNo, rowsPerPage]);

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
        action: (
          <SoftBox mt={3} mb={2} lineHeight={1}>
            {item.isDeleted ? (
              <Button
                onClick={() => {
                  setSelectedUser(item);
                  setIsOpenAlertDeleteDialoge(true);
                }}
                disabled
              >
                <img src={deleteIcon} alt="delete-icon" height={30} width={30} />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setSelectedUser(item);
                  setIsOpenAlertDeleteDialoge(true);
                }}
              >
                <img src={deleteIcon} alt="delete-icon" height={30} width={30} />
              </Button>
            )}
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
      {isOpenAlertDeleteDialoge && (
        <AlertDialog
          title="Delete User"
          description="Are you sure you want to delete the user?"
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

export default Users;
