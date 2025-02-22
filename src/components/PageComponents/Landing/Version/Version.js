import React from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import NioBadge from '../../../NioBadge/NioBadge';
import NioButton from '../../../../components/NioButton/NioButton';
import NioSection from '../../../../components/NioSection/NioSection';

export default function Version() {
  return (
    <NioSection space='sm'>
      <div className="call-to has-mask rounded-3 ">
        <div className="nk-mask blur-6"></div>
        <div className="call-to-content is-theme p-5 p-sm-6 p-md-7 overflow-hidden rounded-lg">
          <Row className="justify-content-center">
            <Col xl={7}>
              <div className="call-to-info text-center">
                <NioBadge
                  size='md'
                  rounded
                  outline='white'
                  label='Nioland Versions'
                  className='mb-3'
                />
                <h2 className="m-0">Looking For Vue version?</h2>
                <p className="lead"> We are working continuously to bring it as soon as possible </p>
                <div className='d-flex flex-wrap align-items-center justify-content-center gap-2 text-center pt-5'>
                  <NioButton
                    as="link"
                    icon='html5'
                    target='blank'
                    variant='white'
                    label='HTML Version'
                    className='mb-2'
                    to='https://themeforest.net/item/nioland-saas-app-landing-page-html-template/43790266?s_rank=2'
                  />
                  <NioButton
                    as="link"
                    icon='react'
                    target='blank'
                    variant='white'
                    label='REACT Version'
                    className='mb-2'
                    to='#'
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </NioSection>
  )
}
