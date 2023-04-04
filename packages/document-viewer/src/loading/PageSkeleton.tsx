import React from "react";
import { Box, Paper, Skeleton } from "@mui/material";

type ParagraphProps = {
  lines: number;
  trail: string;
};

const Paragraph = ({ lines, trail }: ParagraphProps) => {
  return (
    <>
      {[...Array(lines)].map((_, idx) => (
        <Skeleton key={idx} height="2%" width="100%" />
      ))}
      <Skeleton height="2%" width={trail} />
    </>
  );
};
const ParagraphDivider = () => <Box height="5%" />;

const PageSkeleton = (): JSX.Element => (
  <Paper sx={{ padding: 4, position: "relative", flex: "1 1 auto", cursor: "text" }}>
    <Skeleton height="4%" width="20%" />
    <ParagraphDivider />

    <Paragraph lines={10} trail="70%" />
    <ParagraphDivider />

    <Paragraph lines={13} trail="30%" />
    <ParagraphDivider />

    <Skeleton height="4%" width="20%" />
    <ParagraphDivider />

    <Paragraph lines={8} trail="50%" />
  </Paper>
);

export default PageSkeleton;
