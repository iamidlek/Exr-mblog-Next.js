import { Card, Col, Row } from "antd";
import Link from "next/link";

export default function BlogMainPost({
  slug,
  thumbnail,
  title,
  subtitle,
  author,
  createdAt,
}) {
  return (
    <Row align="middle" style={{ height: "auto" }}>
      <Col span={24}>
        <Link href={`/post/${slug}`}>
          <a>
            <Card
              style={{ border: "none" }}
              cover={<img alt={thumbnail.alt} src={thumbnail.imageUrl} />}
            >
              <h1>{title}</h1>
              <h3>{subtitle}</h3>
              <h4>
                {author.name} - {createdAt}
              </h4>
            </Card>
          </a>
        </Link>
      </Col>
    </Row>
  );
}
