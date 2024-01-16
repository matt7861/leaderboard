import React, { memo } from "react";
import { TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StyledTableRow from "./StyledTableRow";
import { User } from "../../types";

interface UserRowProps {
  user: User;
  onDelete: (userId: string) => void;
  newRowIds: Set<string>;
}

const UserRow: React.FC<UserRowProps> = memo(
  ({ user, onDelete, newRowIds }) => {
    const isNew = newRowIds.has(user.userId);

    return (
      <StyledTableRow isNew={isNew}>
        <TableCell>
          <img width="50" height="50" src={user.avatar} alt={user.username} />
        </TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell align="right">
          {new Intl.NumberFormat().format(user.score)}
        </TableCell>
        <TableCell>
          <IconButton onClick={() => onDelete(user.userId)}>
            <DeleteIcon sx={{ color: "#1675D1" }} />
          </IconButton>
        </TableCell>
      </StyledTableRow>
    );
  }
);

export default UserRow;
