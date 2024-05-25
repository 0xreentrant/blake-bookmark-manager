import { Box } from "@mui/material";
import {
  KeyboardDoubleArrowRightRounded as IconRight,
  KeyboardDoubleArrowLeftRounded as IconLeft,
} from "@mui/icons-material";

export const Navigation = ({ isExpanded, handleExpand, children }) => {
  return (
    <Box
      display="flex"
      height="100%"
      flexDirection="row"
      padding="20px"
      width={isExpanded ? "40px" : "10px"}
      style={{
        gap: "20px",
        background: "#eee",
        borderBottom: "1px solid black",
      }}
    >
      {isExpanded ? <IconLeft onClick={handleExpand} /> : <IconRight onClick={handleExpand}/>}
      {children}
    </Box>
  );
};
