import React from "react";
import { Box, Paper } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

const useStyles = makeStyles(theme => ({
  skeletonViewbox: {
    padding: theme.spacing(4),
    position: "relative",
    flex: "1 1 auto",
    cursor: "text",
  },
}));

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

const PageSkeleton = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Paper className={classes.skeletonViewbox}>
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
};

export default PageSkeleton;
