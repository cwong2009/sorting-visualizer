import React from "react";
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
import { createMuiTheme, Hidden, ThemeProvider } from "@material-ui/core";
import { deepOrange, orange } from "@material-ui/core/colors";

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
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
  })
);

export default function App() {
  const classes = useStyles();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: orange[500],
      },
      secondary: {
        main: deepOrange[900],
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <CssBaseline />
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
        <Visualizer />
      </div>
    </ThemeProvider>
  );
}
