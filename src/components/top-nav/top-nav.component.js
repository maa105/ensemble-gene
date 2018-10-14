import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class TopNav extends Component {

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="https://www.ensembl.org">Ensembl</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} componentClass={Link} href="/find-proteins" to={'/find-proteins'}>
              Find Protein
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/hgvs" to={'/hgvs'}>
              HGVS
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} href="https://rest.ensembl.org/">
              API
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default TopNav;
