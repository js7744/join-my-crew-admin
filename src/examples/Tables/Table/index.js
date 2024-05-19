import { useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableRow,
  TablePagination,
} from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({ columns, rows, loading, page, rowsPerPage, onPageChange, onRowsPerPageChange }) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl, pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <SoftBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {name.toUpperCase()}
      </SoftBox>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <SoftBox
            key={uuidv4()}
            component="td"
            p={1}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SoftBox display="flex" alignItems="center" py={0.5} px={1}>
              <SoftBox mr={2}>
                <SoftAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </SoftBox>
              <SoftTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[name][1]}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        );
      } else {
        template = (
          <SoftBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SoftTypography
              variant="button"
              fontWeight="regular"
              color="secondary"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </SoftTypography>
          </SoftBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <>
        {loading ? (
          <SoftTypography
            variant="button"
            fontWeight="medium"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            {"Loading...."}
          </SoftTypography>
        ) : (
          <>
            <TableContainer>
              <MuiTable>
                <SoftBox component="thead">
                  <TableRow>{renderColumns}</TableRow>
                </SoftBox>
                <TableBody>{renderRows}</TableBody>
              </MuiTable>
            </TableContainer>
            <TablePagination
              component="div"
              count={rows.length * (page + 1)} // Adjust count as per total rows if known
              page={page}
              onPageChange={onPageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={onRowsPerPageChange}
              sx={{
                ".MuiTablePagination-selectRoot": {
                  minWidth: "50px", // Adjust the width to your requirement
                  width: "auto",
                },
                ".MuiInputBase-root": {
                  width: "auto",
                  minWidth: "50px", // Adjust the min-width as needed
                },
                ".css-1ui3wbn-MuiInputBase-root-MuiTablePagination-select": { 
                  width: "20px !important"
                },
                ".css-2oc50a-MuiSelect-select-MuiInputBase-input": {
                  width: "auto !important"
                }
              }}
            />
          </>
        )}
      </>
    ),
    [columns, rows, loading, page, rowsPerPage, onPageChange, onRowsPerPageChange]
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  loading: false,
  page: 0,
  rowsPerPage: 10,
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

export default Table;
