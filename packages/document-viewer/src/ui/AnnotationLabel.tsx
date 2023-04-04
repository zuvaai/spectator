import React from "react";

import { Box, IconButton, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";

import { topicToColor } from "./annotationColors";

type AnnotationLabelProps = {
  onDelete?: (event: React.MouseEvent) => void;
  topic: string;
};

const AnnotationLabel = (
  props: AnnotationLabelProps & React.HTMLAttributes<HTMLDivElement>
): JSX.Element => {
  const { onClick, onDelete, topic, ...rest } = props;

  return (
    <Paper
      square
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        background: "background.paper",
        py: 0,
        pr: 0.5,
        pl: 1,
        width: "180px",
      }}
      {...rest}
    >
      <span
        style={{
          background: topicToColor(topic),
          borderRadius: "100%",
          flex: "0 0 auto",
          height: "8px",
          width: "8px",
        }}
      />
      <Box
        component="span"
        onClick={onClick}
        sx={{
          cursor: "pointer",
          flex: "1 1 auto",
          fontSize: "12px",
          pt: 0.125,
          pr: 0.5,
          pb: 0,
          pl: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {topic}
      </Box>
      {onDelete && (
        <IconButton onClick={onDelete} size="large" sx={{ flex: "0 0 auto", padding: 0 }}>
          <Close fontSize="small" />
        </IconButton>
      )}
    </Paper>
  );
};

export default AnnotationLabel;
