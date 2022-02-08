import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/Newscards/NewsCards';
import useStyles from './styles.js'
import wordsToNumbers from 'words-to-number';

const alanKey = 'f2ca3d3b273b61210eb1f7687630bc5c2e956eca572e1d8b807a3e2338fdd0dc/stage'

export const App = () => {
  const [newsArticles,  setNewsArticles ] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
         key: alanKey, 
         onCommand: ({ command, articles, number }) => {
             if(command === 'newHeadlines'){
               setNewsArticles(articles)
               setActiveArticle(-1)
             }else if(command === 'highlight'){
               console.log(command, "command")
                setActiveArticle((prevArticle) => prevArticle + 1)
             }else if(command === 'open'){
               const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
               const article = articles[parsedNumber - 1]

               if (parsedNumber > 20) {
                 alanBtn().playText('Please try that again.')
               } else if(article) {
                  window.open(article.url, '_blank')
                  alanBtn().playText('Just Chill, it\'s coming up')
               }
               
             }
         }
    })
  },[])
 

  return (
    <div>
        <div className={classes.logoContainer}>
          <img className={classes.alanLogo} src="data:image/jpeg;base64,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" alt="alan logo" />
        </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
    );
};

export default App;

//bf288048f32c4dfd823e6e38e048b236

