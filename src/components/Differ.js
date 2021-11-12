import React, { Component } from 'react';
import CustomTreeView from './TreeView';
import { Backdrop, CircularProgress, Grid, Alert, Typography, Button } from '@mui/material';
import DifferService from '../services/differ';
import { withSnackbar } from './Snackbar';
import { Box, styled } from '@mui/system';
import DropZone from './DropZone';
import './../assets/css/Differ.css';
import ContentPanelService from '../services/content-panel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const CustomButton = styled(Button)`
  text-transform: none;
  transition: all 200ms ease;
  cursor: pointer;
`;

const initialState = {
  pressDiffer: false,
  loading: false,
  firstTree: [],
  secondTree: [],
  firstTreeResult: [],
  secondTreeResult: [],
  firstFile: { name: "" },
  secondFile: { name: "" }
};

class Differ extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.firstNode = null;
    this.firstContentScroll = React.createRef();
    this.secondContentScroll = React.createRef();
    this.firstContentResultScroll = React.createRef();
    this.secondContentResultScroll = React.createRef();

    this.editorRef = React.createRef();
    
    this._preventEvent = false;
  };

  /**
   * @name scrollTo
   * @description Scroll to editor
   */
  scrollTo() {
    this.editorRef.current.scrollIntoView({
      behavior: "smooth",
      top: this.editorRef.current.offsetTop
    });
  }

  /**
   * @name setContentPanelPosition
   * @description Set margin top to content panel based on scroll position.
   * @param {*} e 
   * @param {*} contentPanelId 
   */
  setContentPanelPosition(e, contentPanelId) {
    const marginTop = e.target.scrollTop;
    ContentPanelService.setContentPanelPosition(marginTop, contentPanelId);
  };

  /**
   * @name onFirstContentScroll
   * @description Synchronize scrolling between first content container and second.
   * @param {*} e 
   * @param {*} name 
   * @param {*} contentPanelId 
   * @returns 
   */
  onFirstContentScroll = (e, name, contentPanelId) => {
    if (this._preventEvent) {
      this._preventEvent = false;
      return;
    }

    this._preventEvent = true;
    this[`second${name}Scroll`].current.scrollTop = e.target.scrollTop;
    this[`second${name}Scroll`].current.scrollLeft = e.target.scrollLeft;
    // move content panel based on scroll position
    this.setContentPanelPosition(e, contentPanelId);
    this.onSecondContentScroll(e, name, contentPanelId);
  };

  /**
   * @name onSecondContentScroll
   * @description Synchronize scrolling between second content container and first.
   * @param {*} e 
   * @param {*} name 
   * @param {*} contentPanelId 
   * @returns 
   */
  onSecondContentScroll = (e, name, contentPanelId) => {
    if (this._preventEvent) {
      this._preventEvent = false;
      return;
    }

    this[`first${name}Scroll`].current.scrollTop = e.target.scrollTop;
    this[`first${name}Scroll`].current.scrollLeft = e.target.scrollLeft;
    // move content panel based on scroll position
    this.setContentPanelPosition(e, contentPanelId);
  };

  /**
   * @name onTreeItemClick
   * @description Set content panel position on first click, so that can be visible on container.
   * @param {*} contentScroll 
   * @param {*} contentPanelId 
   */
  onTreeItemClick(contentScroll, contentPanelId) {
    const e = { target: { scrollTop: contentScroll.current.scrollTop } }
    this.setContentPanelPosition(e, contentPanelId);
  };

  /**
   * @name toggleLoader
   * @description Toggle state value so that the loader can be shown or hidden.
   * @param {*} value 
   */
  toggleLoader(value) {
    this.setState({ loading: value });
  };

  onChange(file, inputName) {
    // set file input state
    this.setState({
      [inputName]: file
    });
    this.onFileChange(file, inputName);
  };

  /**
   * @name onFileChange
   * @description Get Tree content on open .XML file.
   * @param {*} file 
   * @param {*} type 
   */
  onFileChange(file, type) {
    const formData = new FormData();
    formData.append("file", file);

    this.toggleLoader(true);
    DifferService.getTree(formData)
      .then((response) => {
        let resp = [];
        resp.push(response)
        this.firstNode = resp[0].id;
        if (type === "firstFile") {
          this.setState({ firstTree: resp });
        } else {
          this.setState({ secondTree: resp });
        }
      })
      .catch((error) => {
        this.props.snackbarShowMessage(error.message, 'error', 2000);
      })
      .finally(() => {
        this.toggleLoader(false);
      });
  }

  /**
   * @name handleStartDifferClick
   * @description Call start differ method.
   */
  handleStartDifferClick() {
    const formData = new FormData();
    formData.append("firstFile", this.state.firstFile);
    formData.append("secondFile", this.state.secondFile);

    this.toggleLoader(true);
    DifferService.startDiffer(formData)
      .then((response) => {
        let first = [];
        let second = [];
        this.setState({ pressDiffer: true });
        if (response.firstTree) {
          first.push(response.firstTree);
          second.push(response.secondTree);
          this.firstNode = first[0].id;
        }
        this.setState({ firstTreeResult: first, secondTreeResult: second });
      })
      .catch((error) => {
        this.props.snackbarShowMessage(error.message, 'error', 2000);
      })
      .finally(() => {
        this.toggleLoader(false);
      });
  }

  handleClearDiffer() {
    this.setState(initialState);
    this.firstNode = null;
  };

  render() {
    const {
      firstFile,
      secondFile,
      firstTree,
      secondTree,
      pressDiffer,
      firstTreeResult,
      secondTreeResult
    } = this.state;

    return (
      <div className="center-content">
        {/* begin: Differ Result Visualisation */}
        {
          firstTreeResult.length > 0 &&
          <div>
             {
              firstTreeResult.length > 0 &&
              <Box style={{ marginBottom: "1em" }}>
                <Typography color="black" fontSize="1em" mb={2}>
                  Compare <strong> {firstFile.name} </strong>
                  to <strong>{secondFile.name}</strong>
                </Typography>

                <CustomButton
                  startIcon={<KeyboardArrowDownIcon/>}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginRight: '0.5em' }}
                  onClick={this.scrollTo.bind(this)}>
                  Editor
                </CustomButton>

                <CustomButton
                  startIcon={<ClearIcon />}
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={this.handleClearDiffer.bind(this)}>
                  Clear
                </CustomButton>
              </Box>
            }

            <Grid
              container
              spacing={{ xs: 2, md: 3 }}>
              
              <Grid item xs={12} md={6} mb={5} className="tree-container">
                <Box
                  id="firstResultTree"
                  className="tree-border"
                  ref={this.firstContentResultScroll}
                  onScroll={(e) => this.onFirstContentScroll(e, 'ContentResult', 'first-tree-result-content-panel')}>
                  <CustomTreeView
                    contentPanelId="first-tree-result-content-panel"
                    firstNode={this.firstNode}
                    nodes={firstTreeResult}
                    onTreeItemClick={() => { this.onTreeItemClick(this.firstContentResultScroll, 'first-tree-result-content-panel') }}
                  ></CustomTreeView>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} mb={5} className="tree-container">
                <Box
                  id="secondResultTree"
                  className="tree-border"
                  ref={this.secondContentResultScroll}
                  onScroll={(e) => this.onSecondContentScroll(e, 'ContentResult', 'second-tree-result-content-panel')}>
                  <CustomTreeView
                    contentPanelId='second-tree-result-content-panel'
                    firstNode={this.firstNode}
                    nodes={secondTreeResult}
                    onTreeItemClick={() => { this.onTreeItemClick(this.secondContentResultScroll, 'second-tree-result-content-panel') }}
                  ></CustomTreeView>
                </Box>
              </Grid>
            </Grid>
          </div>
        }
        {/* end: Differ Result Visualisation */}

        <Grid container spacing={{ xs: 2, md: 3 }} ref={this.editorRef}>
          <Grid item xs={12} md={6} mb={3}>
            {/* begin: Upload First .XML file */}
            <DropZone
              id={1}
              name="firstFile"
              value={firstFile}
              onChange={(file, inputName) => { this.onChange(file, inputName) }}>
            </DropZone>
            {/* end: Upload First .XML file */}
          </Grid>

          <Grid item xs={12} md={6} mb={3}>
            {/* begin: Upload Second .XML file */}
            <DropZone
              id={2}
              name="secondFile"
              value={secondFile}
              onChange={(file, inputName) => { this.onChange(file, inputName) }}>
            </DropZone>
            {/* end: Upload Second .XML file */}
          </Grid>
        </Grid>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={6} className="tree-container">
            {/* begin: First .XML file visualisation as Tree View */}
            <Box
              id="firstTree"
              className="tree-border"
              ref={this.firstContentScroll}
              onScroll={(e) => this.onFirstContentScroll(e, 'Content', 'first-tree-content-panel')}>
              <CustomTreeView
                contentPanelId='first-tree-content-panel'
                nodes={firstTree}
                firstNode={this.firstNode}
                onTreeItemClick={() => { this.onTreeItemClick(this.firstContentScroll, 'first-tree-content-panel') }}
              ></CustomTreeView>
            </Box>
            {/* end: First .XML file visualisation as Tree View */}
          </Grid>

          <Grid item xs={12} md={6} className="tree-container">
            {/* begin: Second .XML file visualisation as Tree View */}
            <Box 
              id="secondTree"
              className="tree-border"
              ref={this.secondContentScroll}
              onScroll={(e) => this.onSecondContentScroll(e, 'Content', 'second-tree-content-panel')}>
              <CustomTreeView
                contentPanelId='second-tree-content-panel'
                nodes={secondTree}
                firstNode={this.firstNode}
                onTreeItemClick={() => { this.onTreeItemClick(this.secondContentScroll, 'second-tree-content-panel') }}
              ></CustomTreeView>
            </Box>
            {/* end: Second .XML file visualisation as Tree View */}
          </Grid>

          {
            firstFile.name && secondFile.name &&
            <Grid item xs={12} md={12} pl={0}>
              <CustomButton
                startIcon={<PlayCircleOutlineIcon />}
                variant="contained"
                onClick={this.handleStartDifferClick.bind(this)}
              >Start Differ</CustomButton>

              <CustomButton
                style={{ marginLeft: '0.5em' }}
                startIcon={<ClearIcon />}
                variant="contained"
                color="info"
                onClick={this.handleClearDiffer.bind(this)}>
                Clear
              </CustomButton>
            </Grid>
          }

          {
            firstTreeResult.length === 0 && pressDiffer &&
            <Grid item xs={12} mt={2} pl={0}>
              <Alert severity="success">0 difference(s) between the two XML documents!</Alert>
            </Grid>
          }
        </Grid>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.state.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

export default withSnackbar(Differ);