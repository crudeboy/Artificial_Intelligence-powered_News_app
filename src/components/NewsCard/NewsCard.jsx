import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea , CardMedia, CardContent, Button, Typography} from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';
import classNames from 'classnames';
import useStyles from "./styles.js"

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([])
    const scrollToRef = (ref) => {
        return window.scroll(0, ref.current.offsetTop - 50)
    }

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()))
    }, [])

    useEffect(() => {
        if(i === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle])
        }
    }, [i, activeArticle, elRefs])

    console.log(activeArticle, "activeArticle");
    return (
    <Card ref={elRefs[i]} className={classNames(classes.card,  activeArticle === i ? classes.activeCard : null)}>
        <CardActionArea href={url} target="_blank">
            <CardMedia className={classes.media} image={urlToImage ||  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.germanlw.com%2Ffacts-and-news-about-german-language-and-german-speaking-countries%2F&psig=AOvVaw2Q9-vWxEx6vE5tB3zNei4G&ust=1644072203696000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjDkLGk5vUCFQAAAAAdAAAAABAD'}/>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" >{title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
            </CardContent>
        </CardActionArea> 
        <CardActions className={classes.cardActions}>
            <Button size="small" color="primary">Learn More</Button>
            <Typography variant="h5" color="textSecondary" >{i + 1}</Typography>
        </CardActions>
    </Card>
    );
};

export default NewsCard; 
