import React, { useCallback, useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Visualizer from "./component/visualizer";
import SortLogger from "./component/sort-logger";
import {
  createMuiTheme,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from "@material-ui/core";
import { deepOrange, orange } from "@material-ui/core/colors";
import { SortElement, Status } from "./model/sortElement";
import { heapSort } from "./algorithm/heapSort";
import { useStore } from "react-redux";
import { bubbleSort } from "./algorithm/bubbleSort";
import { mergeSort } from "./algorithm/mergeSort";
import { insertionSort } from "./algorithm/insertionSort";
import { quickSort } from "./algorithm/quickSort";

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      [theme.breakpoints.up("xs")]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.up("xs")]: {
        paddingLeft: drawerWidth,
      },

      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        paddingLeft: "0px",
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      color: "white",
      width: drawerWidth,
      backgroundColor: "#282c34",
      borderRight: "1px solid gray",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function App() {
  const store: any = useStore();
  const classes = useStyles();
  const [modeOpen, setModeOpen] = React.useState(false);
  const [algorithmOpen, setAlgorithmOpen] = React.useState(false);
  const [sampleSizeOpen, setSampleSizeOpen] = React.useState(false);
  const [numArray, setNumArray] = React.useState<number[] | null>(null);
  const [sampleSize, setSampleSize] = React.useState<number>(100);
  const [algorithm, setAlgorithm] = React.useState<string>("heap_sort");
  const [mode, setMode] = React.useState<string>("random");
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      // primary: {
      //   main: orange[500],
      // },
      // secondary: {
      //   main: deepOrange[900],
      // },
    },
  });

  const action = useCallback(
    (type: any, payload?: any) => store.dispatch({ type, payload }),
    [store]
  );

  useEffect(() => {
    action("PAUSE_HISTORY");
    if (algorithm && action && numArray) {
      const elements: SortElement[] = numArray.reduce(
        (acc: SortElement[], val: number, idx: number) => {
          acc.push({
            val,
            status: Status.NORMAL,
            key: `${idx}_${val}`,
          });
          return acc;
        },
        []
      );

      if (algorithm === "bubble_sort") {
        bubbleSort(elements, action);
      } else if (algorithm === "heap_sort") {
        heapSort(elements, action);
      } else if (algorithm === "merge_sort") {
        mergeSort(elements, action);
      } else if (algorithm === "insertion_sort") {
        insertionSort(elements, action);
      } else if (algorithm === "quick_sort") {
        quickSort(elements, action);
      }
    }
  }, [algorithm, action, numArray]);

  useEffect(() => {
    setNumArray(
      Array(sampleSize)
        .fill(null)
        .map((_, idx: number) =>
          mode === "random"
            ? Math.floor(Math.random() * sampleSize) + 1
            : sampleSize - idx
        )
    );
    // setNumArray(
    //   Array(sampleSize)
    //     .fill(null)
    //     .map((_, idx) => sampleSize - idx)
    // );
  }, [sampleSize, mode]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <Typography variant="h6" color="inherit" noWrap>
                  <FormControl>
                    <Select
                      open={algorithmOpen}
                      onClose={() => setAlgorithmOpen(false)}
                      onOpen={() => setAlgorithmOpen(true)}
                      value={algorithm}
                      onChange={(event: any) =>
                        setAlgorithm(event.target.value as string)
                      }
                    >
                      <MenuItem value={"heap_sort"}>Heap Sort</MenuItem>
                      <MenuItem value={"bubble_sort"}>Bubble Sort</MenuItem>
                      <MenuItem value={"merge_sort"}>Merge Sort</MenuItem>
                      <MenuItem value={"insertion_sort"}>
                        Insertion Sort
                      </MenuItem>
                      <MenuItem value={"quick_sort"}>Quick Sort</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="inherit" noWrap>
                  <FormControl>
                    <Select
                      open={sampleSizeOpen}
                      onClose={() => setSampleSizeOpen(false)}
                      onOpen={() => setSampleSizeOpen(true)}
                      value={sampleSize}
                      onChange={(event: any) =>
                        setSampleSize(event.target.value)
                      }
                    >
                      <MenuItem value={10}>Size 10</MenuItem>
                      <MenuItem value={100}>Size 100</MenuItem>
                      <MenuItem value={200}>Size 200</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="inherit" noWrap>
                  <FormControl>
                    <Select
                      open={modeOpen}
                      onClose={() => setModeOpen(false)}
                      onOpen={() => setModeOpen(true)}
                      value={mode}
                      onChange={(event: any) => setMode(event.target.value)}
                    >
                      <MenuItem value={"random"}>Random</MenuItem>
                      <MenuItem value={"reversed"}>Reversed</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Hidden xsDown>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <SortLogger />
            <Divider />
          </Drawer>
        </Hidden>
        <div className={classes.toolbar} />
        <Visualizer />
      </div>
    </ThemeProvider>
  );
}
