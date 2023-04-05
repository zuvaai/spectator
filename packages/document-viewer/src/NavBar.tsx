import React from "react";
import { DebouncedFunc, debounce } from "lodash";

import { Grid, IconButton, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, Close, ExpandLess, ExpandMore } from "@mui/icons-material";

type NavBarProps = {
  documentName: string;
  SourceLink?: JSX.Element;

  navigationIndex: number;
  navigationTotal: number;
  onNavigationIndexChange: (navigationItem: number) => void;

  onClose: () => void;
  onNextDocument?: () => void;
  onPreviousDocument?: () => void;
};

const NavBar = (props: NavBarProps): JSX.Element => {
  const {
    documentName,
    SourceLink,
    navigationIndex,
    navigationTotal,
    onClose,
    onNavigationIndexChange,
    onNextDocument,
    onPreviousDocument,
  } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = React.useState<string>(navigationIndex.toString());

  const handleNavigationItemUp = (): void => {
    onNavigationIndexChange(navigationIndex - 1);
  };

  const handleNavigationItemDown = (): void => {
    onNavigationIndexChange(navigationIndex + 1);
  };

  const handleNavigationItemBlur = React.useCallback((): void => {
    setInputValue(navigationIndex.toString());
  }, [navigationIndex]);

  const confirmInput = React.useMemo((): (() => void) & DebouncedFunc<() => void> => {
    return debounce(() => {
      if (!inputRef || !inputRef.current) return;

      const value = parseInt(inputRef.current.value);

      if (value > 0 && value <= navigationTotal) {
        onNavigationIndexChange(value);
      }
    }, 750);
  }, [navigationTotal, onNavigationIndexChange]);

  const handleNavigationItemChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
    confirmInput();
  };

  const handleNavigationItemKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== "Enter") return;
      confirmInput.flush();
    },
    [confirmInput]
  );

  React.useEffect(() => {
    setInputValue(navigationIndex.toString());
  }, [navigationIndex]);

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexFlow: "wrap" }}>
      <Grid item md={4} xs={6} sx={{ order: 1 }}>
        <Typography variant="h3" color="inherit" noWrap sx={{ fontSize: "16px", fontWeight: 600 }}>
          {documentName}
        </Typography>
      </Grid>

      <Grid
        container
        item
        md={4}
        xs={12}
        alignItems="center"
        wrap="nowrap"
        justifyContent="center"
        sx={{ order: { md: 3, lg: 2 } }}
      >
        <Typography
          variant="body1"
          display="inline"
          noWrap
          sx={{ color: "white", fontSize: "14px", fontWeight: 400, mx: 1, my: 0 }}
        >
          Pages
        </Typography>

        <TextField
          inputRef={inputRef}
          type="number"
          onChange={handleNavigationItemChange}
          onBlur={handleNavigationItemBlur}
          onKeyDown={handleNavigationItemKeyDown}
          value={inputValue}
          inputProps={{
            min: 1,
            max: navigationTotal,
          }}
          variant="outlined"
          sx={{
            color: "black",
            backgroundColor: "white",
            width: 36,
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& .MuiInput-root": {
              borderRadius: 0,
            },
            "& .MuiInput-input": {
              fontSize: "14px",
              fontWeight: 400,
              padding: 1.25,
              MozAppearance: "textfield",
              textAlign: "center",
            },
          }}
        />

        <Typography
          variant="body1"
          display="inline"
          noWrap
          sx={{
            color: "white",
            fontSize: "14px",
            fontWeight: 400,
            marginLeft: 1,
          }}
        >
          /
        </Typography>
        <Typography
          id="page-count"
          variant="body1"
          display="inline"
          noWrap
          sx={{
            color: "white",
            fontSize: "14px",
            fontWeight: 400,
            marginRight: 1,
            marginLeft: 0.5,
          }}
        >
          {navigationTotal}
        </Typography>

        <IconButton
          aria-label={"Previous Page"}
          disabled={navigationIndex <= 1}
          onClick={handleNavigationItemUp}
          size="large"
          sx={{
            color: "white",
            padding: 1,
            "&.Mui-disabled": {
              color: "grey.500",
            },
          }}
        >
          <ExpandLess />
        </IconButton>
        <IconButton
          aria-label={"Next Page"}
          disabled={navigationIndex >= navigationTotal}
          onClick={handleNavigationItemDown}
          size="large"
          sx={{
            color: "white",
            padding: 1,
            "&.Mui-disabled": {
              color: "grey.500",
            },
          }}
        >
          <ExpandMore />
        </IconButton>
      </Grid>

      <Grid
        container
        item
        md={4}
        xs={6}
        justifyContent="flex-end"
        alignItems="center"
        wrap="nowrap"
        sx={{ order: { md: 2, lg: 3 } }}
      >
        {SourceLink && (
          <Paper elevation={0} sx={{ mr: 1 }}>
            {SourceLink}
          </Paper>
        )}

        <IconButton
          aria-label={"Previous Document"}
          disabled={!onPreviousDocument}
          onClick={onPreviousDocument}
          size="large"
          sx={{
            color: "white",
            padding: 1,
            "&.Mui-disabled": {
              color: "grey.500",
            },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          aria-label={"Next Document"}
          disabled={!onNextDocument}
          onClick={onNextDocument}
          size="large"
          sx={{
            color: "white",
            padding: 1,
            "&.Mui-disabled": {
              color: "grey.500",
            },
          }}
        >
          <ChevronRight />
        </IconButton>

        <IconButton aria-label={"Close Document"} color="inherit" onClick={onClose} size="large">
          <Close />
        </IconButton>
      </Grid>
    </Toolbar>
  );
};

export default NavBar;
