import React, { useState, useEffect } from "react";
import { Select, Typography, Row, Col, Avatar, Card, Spin } from "antd";
import moment from "moment";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const {
    data: cryptoNews,
    isFetching,
    error
  } = useGetCryptoNewsQuery({
    query: newsCategory,
    count: simplified ? 6 : 12
  });

  const { data: cryptosList } = useGetCryptosQuery(100);

  if (error) {
    return (
      <div className="error-container">
        <Text type="danger">Error loading news: {error.message}</Text>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="loader-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={setNewsCategory}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            value={newsCategory}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptosList?.data?.coins?.map((coin) => (
              <Option value={coin.name} key={coin.uuid}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}

      {cryptoNews?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={news.url || i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title.length > 60
                    ? `${news.title.substring(0, 60)}...`
                    : news.title}
                </Title>
                <img
                  src={news.urlToImage || demoImage}
                  alt="news"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = demoImage;
                  }}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "100px",
                    objectFit: "cover"
                  }}
                />
              </div>
              <p>
                {news.description?.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={demoImage} alt={news.source?.name} />
                  <Text className="provider-name">{news.source?.name}</Text>
                </div>
                <Text>{moment(news.publishedAt).fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
