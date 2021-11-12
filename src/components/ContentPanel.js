import React from 'react';
import { withSnackbar } from './Snackbar';
import '../assets/css/ContentPanel.css';
import { Tooltip, Typography } from '@mui/material';

function ContentPanel(props) {
  const getBorderColor = () => {
    const border = { borderColor: '#dddddd' };
    if (props.selectedNode.color !== '#000000') {
      border.borderColor = props.selectedNode.color;
    }

    return border;
  }

  return (
    props.selectedNode ?
      <table id={props.contentPanelId}>
        <thead>
          <tr>
            <th style={getBorderColor()}>name</th>
            <th style={getBorderColor()}>value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={getBorderColor()}>{props.selectedNode.name}</td>
            <td style={getBorderColor()}>
              <Tooltip title={props.selectedNode.value ? props.selectedNode.value : "--"} arrow>
                <Typography noWrap style={{ cursor: 'help' }}>
                  {props.selectedNode.value ? props.selectedNode.value : "--"}
                </Typography>
              </Tooltip>
            </td>
          </tr>

          {props.selectedNode.attributes &&
            <tr>
              <th style={getBorderColor()} colSpan="2" scope="colgroup">
                Attributes
              </th>
            </tr>
          }

          {
            props.selectedNode.attributes && props.selectedNode.attributes.map((attr, index) =>
              <tr key={index}>
                <td style={getBorderColor()}>
                  {attr.name}
                </td>
                <td style={getBorderColor()}>
                  <Tooltip title={attr.value ? attr.value : "--"} arrow>
                    <Typography noWrap style={{ cursor: 'help' }}>
                      {attr.value ? attr.value : "--"}
                    </Typography>
                  </Tooltip>
                </td>
              </tr>
            )
          }
   
        </tbody>
      </table>
      : ""
  );
}

export default withSnackbar(ContentPanel);