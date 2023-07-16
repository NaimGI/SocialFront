import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from './style';
import { Grid, CircularProgress } from '@material-ui/core';
import PostD from './post/post.js';
const Post = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  
  const classes = useStyles();

  if (!posts?.length && !isLoading) return 'No posts';
  console.log(posts);

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <PostD post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Post;
