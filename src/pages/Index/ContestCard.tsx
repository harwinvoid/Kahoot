/*
 * @Author: yanghuayun
 * @Date: 2021-06-29 02:14:43
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-30 21:26:29
 * @Description: file content
 */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IContestItem } from '../../interface';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

interface ICard {
  item: IContestItem, 
  index: number,
}

const  ImgMediaCard:React.FC<ICard> = ({item, index}) => {
  const classes = useStyles();

  const history = useHistory();


  const randomId = parseInt(`${Math.random() * 10 * 100}`, 10);

  const handleToDetail = () => {
    history.push(`/${index}/${item.entranceToken}`);
  }

  return (
    <Card onClick={handleToDetail} className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={`https://picsum.photos/id/${randomId}/200/300`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.contestName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default ImgMediaCard;
