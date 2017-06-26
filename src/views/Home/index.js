import React from 'react';
import { Helmet, title } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Icon from 'react-fontawesome';
import chunk from 'lodash.chunk';
import Markdown from '../../components/Markdown';
import links from '../../links';
import { header, hero, logo, entries, entry, description } from './styles.css';

// Please make sure that link matches location.pathname for the page otherwise
// we won't be able to detect which page you're currently on.
const groups = chunk(links, 4);

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className={entries}>
        <Helmet>
          <title>{'TaskCluster'}</title>
        </Helmet>
        <Row className={hero}>
          <Col md={8} mdOffset={2} sm={10} smOffset={1}>
            <div className={header}>
              <h2>
                Welcome to <span className={logo}>TaskCluster Tools</span>
              </h2>
            </div>
          </Col>
        </Row>
        <Row className={description}>
          <Col sm={12}>
            <p>
              A collection of tools for TaskCluster components and elements in the TaskCluster
              ecosystem. Here you will find tools to manage TaskCluster, as well as run, debug, inspect
              and view tasks, task-graphs, and other TaskCluster related entities.
            </p>
          </Col>
        </Row>

        {groups.map((tiles, index) => (
          <Row key={`home-tiles-${index}`}>
            {tiles.map(({ title, link, icon, description }) => (
              <Col sm={3} key={`home-tile-${link}`}>
                {link.startsWith('/') ?
                  (
                    <Link to={link} className={`${entry} thumbnail`}>
                      <h4><Icon name={icon} /> {title}</h4>
                      <Markdown>{description}</Markdown>
                    </Link>
                  ) :
                  (
                    <a href={link} className={`${entry} thumbnail`} target="_blank" rel="noopener noreferrer">
                      <h4><Icon name={icon} /> {title}</h4>
                      <Markdown>{description}</Markdown>
                    </a>
                  )
                }
              </Col>
            ))}
          </Row>
        ))}
      </div>
    );
  }
}