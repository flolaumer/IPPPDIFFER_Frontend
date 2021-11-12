import React, { Component } from "react";
import TreeView from '@mui/lab/TreeView';
import { Collapse, Grid, Typography } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import ContentPanel from "./ContentPanel";
import CloseSquareIcon from "./icons/CloseSquareIcon";
import MinusSquareIcon from "./icons/MinusSquareIcon";
import PlusSquareIcon from "./icons/PlusSquareIcon";
import { Box } from "@mui/system";
import SearchField from "./SearchField";
import SearchIcon from '@mui/icons-material/Search';

function TransitionComponent(props) {
  return (
    <Collapse {...props} />
  );
}

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 10,
    borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`,
  },

  [`& .${treeItemClasses.content}`]: {
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
  },
}));

class CustomTreeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedNodes: [],
      selectedNode: null,
      nodesList: []
    }
    this.state.nodesList = this.props.nodes;
    this.state.expandedNodes = this.setExpandedNodesValues(this.props.nodes);
  }

  componentDidUpdate(prevProps) {
    // react to prop changes (when another file was uploaded)
    if (prevProps.firstNode !== this.props.firstNode) {
      this.setState({
        expandedNodes: this.setExpandedNodesValues(this.props.nodes),
        selectedNode: null,
        nodesList: this.props.nodes
      });
      return;
    }
  };

  dfs(node, term, foundIDS) {
    // reset selected node
    this.setState({ selectedNode: null });

    const name = node.name ? node.name.toString().toLowerCase() : node.name;
    const value = node.value ? node.value.toString().toLowerCase() : node.value;
    const key = term ? term.toString().toLowerCase() : term;

    // Implement search functionality
    let isMatching = (name && name.indexOf(key) > -1) || (value && value.indexOf(key) > -1);
  
    if (Array.isArray(node.children)) {
      node.children.forEach((child) => {
        const hasMatchingChild = this.dfs(child, term, foundIDS);
        isMatching = isMatching || hasMatchingChild;
      });
    }
  
    // We will add any item if it matches our search term or if it has a children that matches our term
    if (isMatching && node.id) {
      foundIDS.push(node.id);
    }
  
    return isMatching;
  }
  
  filter(data, matchedIDS) {
    return data
      .filter((item) => matchedIDS.indexOf(item.id) > -1)
      .map((item) => ({
        ...item,
        children: item.children ? this.filter(item.children, matchedIDS) : [],
      }));
  }
  
  search(key) {
    // We wrap data in an object to match the node shape
    const dataNode = {
      children: this.props.nodes,
    };
  
    const matchedIDS = [];
    // find all items IDs that matches our search (or their children does)
    this.dfs(dataNode, key, matchedIDS);
  
    // filter the original data so that only matching items (and their fathers if they have) are set to state var
    this.setState({
      nodesList: this.filter(this.props.nodes, matchedIDS)
    });
  }

  /**
   * @name getAllChildrenIDs
   * @description Get all Children IDs from tree.
   * @param {*} node 
   * @returns 
   */
  getAllChildrenIDs(node) {
    let arraywithIDs = [];
    if (Array.isArray(node.children)) {
      node.children.forEach((node1) => {
        arraywithIDs.push(node1.id.toString());
        arraywithIDs = arraywithIDs.concat(this.getAllChildrenIDs(node1));
      });
    }
    return arraywithIDs;
  };

  /**
   * @name setExpandedNodesValues
   * @description Expand all nodes with their child from tree.
   * @param {*} nodesList 
   * @returns 
   */
  setExpandedNodesValues(nodesList) {
    let nodes = [];
    nodesList.forEach(element => {
      nodes.push(element.id.toString())
    });
    nodesList.forEach(element => {
      nodes = nodes.concat(this.getAllChildrenIDs(element));
    });

    return nodes;
  };

  handleToggle(event, nodeIds) {
    this.setState({ expandedNodes: nodeIds });
  };

  handleTreeItemClick(node) {
    this.setState({ selectedNode: node });
    this.props.onTreeItemClick(node);
  };

  renderTree(nodes) {
    return (
      <StyledTreeItem
        key={nodes.id.toString()}
        nodeId={nodes.id.toString()}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0, pl: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
              {nodes.name}
            </Typography>
          </Box>
        }
        style={{ color: nodes.color }}
        onClick={() => this.handleTreeItemClick(nodes)}>
        {
          Array.isArray(nodes.children)
            ? nodes.children.map((node) => this.renderTree(node))
            : null
        }
      </StyledTreeItem>
    );
  };

  render() {
    const {
      nodesList
    } = this.state;
    return (
      this.props.nodes ?
        <div>
          {
            this.props.nodes.length === 0 &&
            <Typography color="gray" m={2}>
              no file selected
            </Typography>
          }

          <Grid container spacing={3}>
            {
              this.props.nodes.length > 0 &&
              <Grid item xs={12} style={{ position: 'sticky', top: '-0.5em', marginLeft: '0.5em', zIndex: 9, backgroundColor: 'white' }}>
                <SearchField search={(key) => this.search(key)}></SearchField>
              </Grid>
            }
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }} mb={3}>
              <TreeView
                aria-label="rich object"
                expanded={this.state.expandedNodes}
                defaultCollapseIcon={<MinusSquareIcon />}
                defaultExpandIcon={<PlusSquareIcon />}
                defaultEndIcon={<CloseSquareIcon />}
                onNodeToggle={this.handleToggle.bind(this)}
              >
                {
                  nodesList.map((node) => {
                    return this.renderTree(node)
                  })
                }
              </TreeView>
            </Grid>
    
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <ContentPanel
                contentPanelId={this.props.contentPanelId}
                selectedNode={this.state.selectedNode}>
              </ContentPanel>
            </Grid>
          </Grid>

          {
            nodesList.length === 0 && this.props.nodes.length > 0 &&
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignContent: 'center',
                p: 1,
                m: 1,
                color: 'text.primary',
                height: 200,
              }}
            >
              <SearchIcon fontSize="small"></SearchIcon>
              No matching item found.
            </Box>
          }
        </div>
        : ""
    );
  }
}

export default CustomTreeView;