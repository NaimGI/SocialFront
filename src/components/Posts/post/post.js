import {useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography,ButtonBase  } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts.js';

import useStyles from './stlyes';

const PostD = ({post,setCurrentId}) => {
  console.log(post);
  const navigate =useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [like,setLike]=useState(post?.likeCount);
  console.log(like);
  const UserId=user?.result.googleId || user?.result?.userId;
  const FoundedLike=post?.likeCount.find((l)=>l===(user.result.googleId || user?.result?.userId));
    const dispatch = useDispatch();
    const classes = useStyles();
    const handleLikes=()=>{
      dispatch(likePost(post._id));
      if(FoundedLike){
       setLike(post.likeCount.filter((id)=>id !== UserId));
      }else{
        setLike([...post.likeCount,UserId]);
      }
    }
    const Likes = () => {
      if (like?.length > 0) {
        return like.find((li) => li === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{like.length > 2 ? `You and ${like.length - 1} others` : `${like.length} like${like.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{like.length} {like.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
   
    const openPost = (e) => {
      navigate(`/posts/${post._id}`);
    };
    return (
         <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLikes}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
    );
}

export default PostD;
