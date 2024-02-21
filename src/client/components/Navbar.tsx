import { Box, Tab, Tabs, Typography } from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"
// @ts-ignore
import logo from "../assets/ft_logo.png"
const Navbar = ({
  tabValue,
  setTabValue,
}: {
  tabValue: number
  setTabValue: Dispatch<SetStateAction<string>>
}) => {
  const handleChange = (_e: unknown, newValue: string) => {
    setTabValue(newValue)
  }

  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        width: "100%",
        pt: 1,
        borderBottom: "1px solid black",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleChange}
        TabIndicatorProps={{ sx: { backgroundColor: "white" } }}
      >
        <Tab
          label="Home"
          value={0}
          disableRipple
          sx={{
            color: "black",
            "&.Mui-selected": {
              color: "white",
            },
          }}
        />
        <Tab
          label="Secondary"
          value={1}
          disableRipple
          sx={{
            color: "black",
            "&.Mui-selected": {
              color: "white",
            },
          }}
        />
      </Tabs>
      <Typography>Movie Bracket</Typography>
    </Box>
  )
}

export default Navbar
