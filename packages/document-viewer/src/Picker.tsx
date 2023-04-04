import React from "react";
import { Box } from "@mui/material";
import { Topic } from "./types";

type PickerProps = {
  topics: Topic[];
  onAnnotation: (topic: Topic) => void;
};

const Picker = (props: PickerProps): JSX.Element => {
  const { onAnnotation, topics } = props;

  return (
    <Box
      className="Picker"
      sx={{
        position: "fixed",
        top: "90px",
        right: "15px",
        width: "200px",
        background: "white",
        border: "solid 1px #E5E9EC",
        boxShadow: "0 1px 3px rgba(14, 15, 15, 0.3)",
      }}
    >
      <div
        style={{ background: "#E5E9EC", borderBottom: "solid 1px #E5E9EC", padding: "12px 6px" }}
      >
        <h4 style={{ margin: "0" }}>Fields</h4>
      </div>
      <ol style={{ overflow: "auto", maxHeight: "500px", padding: 0, margin: 0 }}>
        {topics.map(topic => (
          <li
            key={topic}
            onClick={(): void => {
              onAnnotation(topic);
            }}
            style={{
              cursor: "pointer",
              padding: "6px 12px",
              margin: "3px 0",
              listStyle: "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {topic}
          </li>
        ))}
      </ol>
    </Box>
  );
};

export default Picker;
