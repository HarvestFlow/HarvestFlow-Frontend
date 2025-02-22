import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// data
import { useData } from '../../../../context/DataProvider/DataProvider'

export default function PreBuiltContent() {
  const data = useData();
  const contents = data.landingpage.prebuilt.contents

  return (
    <Row className="gy-3">
      {
        contents.map((content, idx) => (
          <Col key={idx} sm={6} lg={4} xl={3}>
            <Link to={content?.url} className="d-inline-block overflow-hidden w-100">
              <div className="overflow-hidden rounded-bottom-0 rounded-3 mb-3">
                <img src={content?.src} alt={content?.title} />
              </div>
              <h5 className="text-capitalize text-center">{content?.title}</h5>
            </Link>
          </Col>
        ))
      }
    </Row>
  )
}
