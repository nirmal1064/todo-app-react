import React, { Component } from "react";
import {DropdownButton, Dropdown} from 'react-bootstrap';

class DropdownComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            selected: 'ALL'
        }
    }

    handleSelect(evt) {
        this.setState({
            selected: evt
        });
        this.props.handleDropdown(evt);
    }

    render() {
        return (
            <DropdownButton id="dropdown-todo" title={this.state.selected} variant="success" onSelect={this.handleSelect}>
                <Dropdown.Item eventKey="All">ALL</Dropdown.Item>
                <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
                <Dropdown.Item eventKey="Incomplete">Incomplete</Dropdown.Item>
            </DropdownButton>
        );
    }
}
export default DropdownComponent;
