import { Col, Row } from "antd";
import BlockContent from "@sanity/block-content-to-react";

const serializers = {
  types: {
    code: ({ node }) => {
      return <p>code</p>;
    },
    video: ({ node }) => {
      return <p>video</p>;
    },
    link: ({ node }) => {
      return <p>link</p>;
    },
    imageGallery: ({ node }) => {
      return <p>imageGallery</p>;
    },
  },
};

export default function BlogPostDetail({ blocks }) {
  return (
    <Row>
      <Col span={24}>
        <BlockContent
          blocks={blocks}
          projectId="gvddgzfs"
          dataset="production"
        />
      </Col>
    </Row>
  );
}
