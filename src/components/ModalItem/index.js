import React from 'react';
import { any, bool, func, node, string } from 'prop-types';
import { MenuItem, Modal, Button } from 'react-bootstrap';
import Icon from 'react-fontawesome';

export default class ModalItem extends React.PureComponent {
  static propTypes = {
    disabled: bool,
    onSubmit: func,
    onComplete: func,
    button: bool,
    body: node.isRequired,
    bsStyle: string,
    bsSize: string
  };

  static defaultProps = {
    disabled: false,
    button: false,
    bsStyle: 'primary'
  };

  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      show: false,
      executing: false
    };
  }

  handleOpen(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleSubmit() {
    this.setState({ executing: true }, async () => {
      const result = await (this.props.onSubmit && this.props.onSubmit());

      this.setState({ executing: false, show: false }, () => {
        if (this.props.onComplete) {
          this.props.onComplete(result);
        }
      });
    });
  }

  render() {
    const { disabled, body, children, button, bsStyle, bsSize } = this.props;
    const { show, executing } = this.state;
    const modal = (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title>{children}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button onClick={this.handleSubmit} disabled={executing} bsStyle={bsStyle}>
            {executing ? <Icon name="spinner" pulse /> : children}
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return button ?
      (
        <Button onClick={this.handleOpen} disabled={disabled} bsStyle={bsStyle} bsSize={bsSize}>
          {children}
          {modal}
        </Button>
      ) :
      (
        <MenuItem onSelect={this.handleOpen} disabled={disabled}>
          {children}
          {modal}
        </MenuItem>
      );
  }
}
