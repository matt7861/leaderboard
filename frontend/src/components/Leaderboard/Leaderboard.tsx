import React, { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Paper,
  Box,
  Tabs,
  Tab,
  Slider,
  Typography,
} from "@mui/material";
import theme from "./theme";
import UserRow from "./UserRow";
import { User } from "../../types";

const Leaderboard: React.FC = () => {
  // State for storing user data
  const [users, setUsers] = useState<User[]>([]);

  // State to control tab view
  const [tabValue, setTabValue] = useState<number>(0);

  // State to control number of rows displayed in the leaderboard
  const [rowLimit, setRowLimit] = useState<number>(10);

  // State to track newly added user rows for highlighting purposes
  const [newRowIds, setNewRowIds] = useState<Set<string>>(new Set());

  // Handler for tab change event
  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setTabValue(newValue);
  };

  // Handler for row limit change event (slider)
  const handleRowLimitChange = (
    event: Event,
    newValue: number | number[]
  ): void => {
    // Assuming you want to use the slider for single value only
    if (typeof newValue === "number") {
      setRowLimit(newValue);
    }
  };

  // Callback for deleting a user
  const handleDelete = useCallback((userId: string): void => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
  }, []);

  // Effect to handle real-time user data updates via WebSocket
  useEffect(() => {
    const socket: Socket = io("http://localhost:3050");

    // Listening for 'userData' events from the socket
    socket.on("userData", (newUser: User) => {
      // Updating users state with new user data
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, newUser]
          .sort((a, b) => b.score - a.score)
          .slice(0, rowLimit);
        return updatedUsers;
      });

      // Highlighting new user row
      setNewRowIds((prevIds) => new Set(prevIds).add(newUser.userId));

      // Removing highlight from new user row after a set duration
      setTimeout(() => {
        setNewRowIds((prevIds) => {
          const updatedIds = new Set(prevIds);
          updatedIds.delete(newUser.userId);
          return updatedIds;
        });
      }, theme.transitions.duration.standard);
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [rowLimit]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Leaderboard settings"
        >
          <Tab label="Leaderboard" />
          <Tab label="Settings" />
        </Tabs>
      </Box>
      {tabValue === 0 && (
        <Box sx={{ padding: "30px" }}>
          <TableContainer
            component={Paper}
            sx={{ mt: 1, border: "1px solid #e0e0e0", overflow: "hidden" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Score</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(0, rowLimit).map((user) => (
                  <UserRow
                    key={user.userId}
                    user={user}
                    onDelete={handleDelete}
                    newRowIds={newRowIds}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {tabValue === 1 && (
        <Box sx={{ p: 3 }}>
          <Typography gutterBottom>Limit</Typography>
          <Slider
            defaultValue={10}
            value={rowLimit}
            onChange={handleRowLimitChange}
            aria-labelledby="row-limit-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={20}
          />
        </Box>
      )}
    </ThemeProvider>
  );
};

export default Leaderboard;
