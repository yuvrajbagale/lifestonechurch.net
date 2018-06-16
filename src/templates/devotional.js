import React from "react";
import styled from "react-emotion";
import { longFormatDate } from "../utils/formatDate";

const MetaData = styled.div`
  font-size: 14px;
  font-style: italic;
  color: rgba(0, 0, 0, 0.6);
  line-height: 2em;
  margin-bottom: 10px;
`;

export default ({ data }) => {
  const post = data.contentfulPost;

  return (
    <div>
      <h1>{post.title}</h1>
      <MetaData>
        <div>{post.author.map(s => <span key={s.id}>{s.name}</span>)}</div>
        <div>{longFormatDate(post.date)}</div>
      </MetaData>
      {post.fields.bodyFormatted && (
        <div
          dangerouslySetInnerHTML={{
            __html: post.fields.bodyFormatted
          }}
        />
      )}
    </div>
  );
};

export const query = graphql`
  query DevotionalTemplateQuery($id: String!) {
    contentfulPost(id: { eq: $id }) {
      id
      fields {
        bodyFormatted
      }
      title
      author {
        id
        name
        photo {
          file {
            url
          }
        }
      }
      date
      mainImage {
        file {
          url
        }
      }
    }
  }
`;
