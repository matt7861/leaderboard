import React from "react";
import { TableRow, TableRowProps } from "@mui/material";

// Extend StyledTableRowProps with TableRowProps
interface StyledTableRowProps extends TableRowProps {
  isNew: boolean;
}

const StyledTableRow: React.FC<StyledTableRowProps> = ({
  isNew,
  ...otherProps
}) => (
  <TableRow
    {...otherProps}
    sx={{
      backgroundColor: isNew ? "#FFA500" : "#FFFFFF",
      transition: (theme) =>
        theme.transitions.create(["background-color"], {
          duration: theme.transitions.duration.standard,
        }),
    }}
  />
);

export default StyledTableRow;
