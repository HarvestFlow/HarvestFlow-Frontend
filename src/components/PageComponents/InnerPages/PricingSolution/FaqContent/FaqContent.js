import React from 'react'
import { Accordion } from 'react-bootstrap';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// compponents
import NioIcon from '../../../../NioIcon/NioIcon';

export default function FaqContent() {

  const data = useData()
  const contents = data.faqs.contents;

  return (
    <div className="nk-faq">
      <Accordion className="accordion-s3 bg-white px-0 px-xl-5" defaultActiveKey={0}>
        {
          contents && contents.map((content, idx) => (
            <Accordion.Item className="py-4" eventKey={idx} key={idx}>
              <Accordion.Header as="div">
                <div className="h5 mb-0 text-capitalize">{content.title}</div>
                <NioIcon size="sm" name="plus" className="on" />
                <NioIcon size="sm" name="minus" className="off" />
              </Accordion.Header>
              <Accordion.Body>
                <p className="text-base">
                  {content.description}
                </p>
              </Accordion.Body>
            </Accordion.Item>
          ))
        }
      </Accordion>
    </div>
  )
}
