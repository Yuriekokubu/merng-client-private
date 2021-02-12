import React, { useContext } from 'react';
import FETCH_POSTQ_QUERY from '../util/graphql';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';

const Home = (props) => {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTQ_QUERY
  );

  return (
    <>
      <Grid.Row className="page-title" style={{ marginBottom: '3rem' }}>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && <PostForm />}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            <Grid columns={1}>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Grid>
          </Transition.Group>
        )}
      </Grid.Row>
    </>
  );
};

export default Home;
