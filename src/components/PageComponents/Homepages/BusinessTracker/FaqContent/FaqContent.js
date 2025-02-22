import React from 'react';
import { Accordion } from 'react-bootstrap';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components 
import NioIcon from '../../../../NioIcon/NioIcon';

export default function FaqContent() {
  const data = useData();
  const contents = data.faqs.contents;
  return (
    <div className="nk-faq">
      <Accordion className="accordion-s1" defaultActiveKey={0}>
        {contents &&
          contents.map((content, idx) => (
            <Accordion.Item className="bg-gray p-4 rounded-2 border border-gray-500" eventKey={idx} key={idx}>
              <Accordion.Header>
                <h5 className="h5 mb-0 text-capitalize">{content?.title}</h5>
                <NioIcon
                  name="arrow-down-circle"
                  className="accordion-button-icon"
                />
              </Accordion.Header>
              <Accordion.Body>
                <p className="fs-16 text-base">{content?.description}</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
    </div>
  );
}
