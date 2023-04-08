import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
    

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //        articles: [],
    //        loading: true,
    //        page: 1,
    //        totalResults: 0 
    //     }
    // }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=674b8346cc354df8b8c5527275911ce8&page=${page}&pageSize=${props.pageSize}`
        // this.setState({loading: true})
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false)
        // this.setState({articles: parsedData.articles,
        //      totalResults: parsedData.totalResults,
        //      loading: false
        //     })
            props.setProgress(100);
    }

    useEffect(() => {
       document.title = `${capitalizeFirstLetter(props.category)} - NewsEve`;
      updateNews();
      // eslint-disable-next-line
    }, [])
    

    // async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=674b8346cc354df8b8c5527275911ce8&page=1&pageSize=${props.pageSize}`
        // this.setState({loading: true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles,
        //      totalResults: parsedData.totalResults,
        //      loading: false
        //     })

    //     this.updateNews();
    // }

    // const handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=674b8346cc354df8b8c5527275911ce8&page=${this.state.page-1}&pageSize=${props.pageSize}`
        // this.setState({loading: true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        // this.setState({page: this.state.page - 1})
    //     setPage(page-1);
    //     updateNews();
    // }

    // const handleNextClick = async () => {
        // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))){
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=674b8346cc354df8b8c5527275911ce8&page=${this.state.page+1}&pageSize=${props.pageSize}`
        // this.setState({loading: true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page + 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        // this.setState({page: this.state.news + 1})
    //     setPage(page+1);
    //     updateNews();
    // }

    const fetchMoreData = async () => {
      //  this.setState({page: this.state.page + 1})
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=674b8346cc354df8b8c5527275911ce8&page=${page+1}&pageSize=${props.pageSize}`
      setPage(page+1);
    //    this.setState({loading: true})
       let data = await fetch(url);
       let parsedData = await data.json()
       setArticles(articles.concat(parsedData.articles))
       setTotalResults(parsedData.totalResults)
      //  this.setState({
      //       articles: articles.concat(parsedData.articles),
      //       totalResults: parsedData.totalResults,
      //       // loading: false,
      //      })
      };
    
  
    return (
      <div>
          <h1 className="text-center" style={{marginTop: '90px'}}>NewsEve - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          {loading && <Spinner />}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        > 

        <div className="container">
         <div className="row">
           {articles.map((element)=>{
             return <div className="col-md-4 my-3" key={element.url}>
               <NewsItem title={element.title?element.title.slice(0, 41):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
             </div>
           })}
          </div>
          </div>
          </InfiniteScroll>
          {/*<div className="container d-flex justify-content-between my-3">
              <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
              <button disabled={(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>*/}
      </div>
    )
  
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes,
  category: PropTypes.string,
}

export default News