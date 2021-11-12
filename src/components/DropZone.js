import React, { Component } from 'react';
import './../assets/css/DropZone.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { withSnackbar } from './Snackbar';

class DropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
    };

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onChange = this.onChange.bind(this);
  };

  onDragEnter() {
    this.setState({ dragging: true });
  };

  onDragLeave() {
    this.setState({ dragging: false });
  }

  onChange(e) {
    var files = e.target.files || e.dataTransfer.files;

    if (!files.length) {
      this.setState({ dragging: false });
      return;
    }

    const extension = /[^/]*$/.exec(files[0].type);

    // only .xml file are accepted
    if (extension.toString().toLowerCase() !== 'xml') {
      this.props.snackbarShowMessage("Please select an .xml file", 'warning', 2000);
      this.dragging = false;
      return;
    }

    this.props.onChange(files[0], e.target.name);

    // reset value so that can be uploaded same file
    e.target.value = '';
  };

  removeFile() {
    this.setState({ file: "" });
  };

  render() {
    const {
      value,
      name,
      id
    } = this.props;
    return (
      <div>
        <div
          className={this.state.dragging ? 'dropZone dropZone-over' : 'dropZone'}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
        >
          <div className="dropZone-info" onDrag={this.onChange}>
            <FileUploadIcon className="dropZone-title icon"/>
            {
              !this.dragging ?
                <span className="dropZone-title">
                  Drop file or click to upload
                </span>
                :
                <span className="dropZone-title">
                  Drop file here
                </span>
            }
          </div>
          <input id={id} name={name} type="file" accept=".xml" onChange={this.onChange} />
        </div>

        <div className="uploadedFile-info">
          {
            value.name &&
            <div>File Name:
              <strong> {value.name} </strong>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default withSnackbar(DropZone);