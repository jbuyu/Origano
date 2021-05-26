import React from "react";

export const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Origano",
  description: "Your one stop shop for organic marcantile produce",
  keywords: "organic, farm produce, healthy",
};
