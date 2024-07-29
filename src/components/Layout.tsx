import {
  Header,
  HeaderContent,
  HeaderToggler,
  Icon,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Col,
  LinkList,
  LinkListItem,
  MegamenuHighlightColumn,
  MegamenuItem,
  Row,
  Container,
} from 'design-react-kit';

function Layout({ children }: any) {
  return (
    <div className="w-screen h-screen layout">
      <Header theme="" type="navbar" className="mb-3">
        <HeaderContent expand="lg" megamenu>
          <HeaderToggler
            aria-controls="nav1"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {}}
          >
            <Icon icon="it-burger" />
          </HeaderToggler>
          <Collapse header navbar onOverlayClick={() => {}}>
            <div className="menu-wrapper">
              <Nav navbar>
                <NavItem>
                  <NavLink href="/">
                    <span>Home</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/manage-data">
                    <span>Manage Data</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/about">
                    <span>About</span>
                  </NavLink>
                </NavItem>
                <MegamenuItem itemName="Megamenu con Immagine e Descrizione">
                  <Row>
                    <MegamenuHighlightColumn description lg="4" xs="12">
                      <div className="ratio ratio-21x9 lightgrey-bg-a1 mb-4 rounded">
                        <figure className="figure">
                          <img
                            alt="Segnaposto"
                            className="figure-img img-fluid rounded"
                            src="https://via.placeholder.com/560x240/ebebeb/808080/?text=Immagine"
                          />
                        </figure>
                      </div>
                      <p>
                        Omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium, totam rem aperiam.
                      </p>
                    </MegamenuHighlightColumn>
                    <Col lg="8" xs="12">
                      <div className="it-heading-link-wrapper">
                        <a className="it-heading-link" href="#">
                          <Icon
                            className="icon icon-sm me-2 mb-1"
                            icon="it-arrow-right-triangle"
                          />
                          <span>Esplora la sezione megamenu</span>
                        </a>
                      </div>
                      <Row>
                        <Col lg="6" xs="12">
                          <LinkList>
                            <LinkListItem href="#" inDropdown>
                              <Icon
                                className="me-2"
                                color="primary"
                                icon="it-arrow-right-triangle"
                                size="xs"
                              />
                              <span>Link lista 1</span>
                            </LinkListItem>
                            <LinkListItem href="#" inDropdown>
                              <Icon
                                className="me-2"
                                color="primary"
                                icon="it-arrow-right-triangle"
                                size="xs"
                              />
                              <span>Link lista 2</span>
                            </LinkListItem>
                            <LinkListItem href="#" inDropdown>
                              <Icon
                                className="me-2"
                                color="primary"
                                icon="it-arrow-right-triangle"
                                size="xs"
                              />
                              <span>Link lista 3</span>
                            </LinkListItem>
                          </LinkList>
                        </Col>
                        <Col lg="6" xs="12">
                          <LinkList>
                            <LinkListItem href="#" inDropdown>
                              <Icon
                                className="me-2"
                                color="primary"
                                icon="it-arrow-right-triangle"
                                size="xs"
                              />
                              <span>Link lista 4</span>
                            </LinkListItem>
                            <LinkListItem href="#" inDropdown>
                              <Icon
                                className="me-2"
                                color="primary"
                                icon="it-arrow-right-triangle"
                                size="xs"
                              />
                              <span>Link lista 5</span>
                            </LinkListItem>
                            <LinkListItem href="#" inDropdown>
                              <Icon
                                className="me-2"
                                color="primary"
                                icon="it-arrow-right-triangle"
                                size="xs"
                              />
                              <span>Link lista 6</span>
                            </LinkListItem>
                          </LinkList>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </MegamenuItem>
              </Nav>
            </div>
          </Collapse>
        </HeaderContent>
      </Header>
      <div className="main">{children}</div>
      <footer className="it-footer mt-5">
        <div className="it-footer-main">
          <Container>
            <section>
              <Row className="clearfix">
                <Col sm={12}>
                  <div className="it-brand-wrapper">
                    <a className="" href="#">
                      <Icon icon="it-chart-line" />
                      <div className="it-brand-text">
                        <h2>Dataviz</h2>
                        <h3 className="d-none d-md-block">
                          Data visualization for pa
                        </h3>
                      </div>
                    </a>
                  </div>
                </Col>
              </Row>
            </section>
            <section className="py-4 border-white border-top"></section>
          </Container>
        </div>
        <div className="it-footer-small-prints clearfix">
          <Container>
            <h3 className="visually-hidden">Sezione Link Utili</h3>
            <ul className="it-footer-small-prints-list list-inline mb-0 d-flex flex-column flex-md-row">
              <li className="list-inline-item">
                <a href="#" title="Note Legali">
                  Media policy
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" title="Note Legali">
                  Note legali
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" title="Privacy-Cookies">
                  Privacy policy
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" title="Mappa del sito">
                  Mappa del sito
                </a>
              </li>
            </ul>
          </Container>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
