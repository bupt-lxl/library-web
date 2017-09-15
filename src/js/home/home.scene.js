import React, {Component} from "react"
import { Link } from "react-router"
import {Navbar, Nav, NavItem, Carousel, Image, } from "react-bootstrap"
import UploadButton from "../components/uploadButton/uploadButton.component"
import UpDownCollectNum from "../components/upDownCollectNum/upDownCollectNum.component"
import "./home.style.less"
import networkAction from "../utils/networkAction"
import { date } from "../utils/utilFunctions"
import OpenLocalFiles from "./components/openLocalFiles/openLocalFiles.component"

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            downloadsList: [],
            commentScoreList: [],
            resourceNum: 0,
            userInfo: {}
        }
    }

    componentWillMount(){
        const rankInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/homepage/homepageRankingInfo`, method: 'POST'})
        const userInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/homepage/homepageUserInfo`, method: 'POST'})
        rankInfo.then((res) => {
            console.log("homepageRankingList-res:", res)
            this.setState({
                downloadsList: res.data.downloadsList,
                commentScoreList: res.data.commentScoreList,
                resourceNum: res.data.resourceNum
            })
            
        })
        userInfo.then((res) => {
            console.log("homepageUserInfo-res:", res)
            if(res.code === 0) {
                this.setState({
                    userInfo: res.data
                })
            } else if(res.code === 1){
                let guestInfo = {
                    uploads: 0,
                    collections: 0,
                    downloads: 0,
                    userName: '游客'
                }
                this.setState({
                    userInfo: guestInfo
                })
            }
        })
    }

    render() {
        let {uploads, collections, downloads, userName} = this.state.userInfo;
        let isGuest = !sessionStorage.getItem('userId') || sessionStorage.getItem('userId') === 'guest';
        return (
        <div>
            <div className="col-sm-12">
                <div className="home-left col-sm-3">
                    <div className="download-rank">
                        <h4> &nbsp;下载排行</h4>
                        {this.state.downloadsList.map((item, index) => {
                            return (
                                <p className="rank-list" key={index}>
                                    <Link to={`/TeachingResourceManagement/resource/${item.resId}`} className="rank-list-text">{item.title} <span> ({item.downloads})</span></Link>
                                    <span className="rank-list-date">{date(item.date)} &nbsp;</span> 
                                </p>
                            );
                        })}
                    </div>
    
                    <div className="cutoff-line ">
                    </div>
                    <div className="score-rank">
                        <h4 className="score"> &nbsp;评分排行</h4>
                        {this.state.commentScoreList.map((item, index) => {
                            return (
                                <p className="rank-list" key={index}>
                                    <Link to={`/TeachingResourceManagement/resource/${item.resId}`} className="rank-list-text">{item.title} <span> ({item.commentscore})</span></Link>
                                    <span className="rank-list-date">{date(item.date)} &nbsp;</span> 
                                </p>
                            );
                        })}
                        <br/>
                    </div>  
                </div>
                <div className="mid-pic col-sm-6">
                    <Carousel>
                        <Carousel.Item>
                                <Image width={900} height={500} alt="900x500" responsive src="/assets/img/carousel_1.png"/>
                            <Carousel.Caption>
                                <h3></h3>
                                <p></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image width={900} height={500} alt="900x500" src="/assets/img/carousel_2.png"/>
                            <Carousel.Caption>
                                <h3></h3>
                                <p></p>
                                </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image width={900} height={500} alt="900x500" src="/assets/img/carousel_3.png"/>
                            <Carousel.Caption>
                                <h3></h3>
                                <p></p>
                                </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="home-right col-sm-3">
                    <div className="right-top">
                        <div className="top-name">
                            <p className="top-name-title">资源库海量资源</p>
                        </div>
                        <div className="resource-num">{this.state.resourceNum}</div>
                    </div>
                    <div className="right-mid ">
                        <div className="right-mid-top">
                            <div className="user-img"> 
                                <img src="/assets/img/userimg.jpg" style={{height: 80, width: 80}}/>
                            </div>
                            <div className="user-name">
                                <p>{userName}</p>
                            </div>
                        </div>
                        <div className="right-mid-mid ">
                            <UpDownCollectNum uploadNum={uploads} downloadNum={downloads} collectNum={collections} isGuest={isGuest}/>
                        </div>
                        <div className="cutoff-line ">
                        </div>
                        <div className="col-sm-12 ">
                            <br/>
                            <UploadButton isGuest={isGuest}/>
                            <OpenLocalFiles />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12  home-footer" >
                <div className="col-sm-3 col-sm-offset-2 footer-left" onClick={() => ('http://www.eduyun.cn/')}>
                    <img src="/assets/img/footerLeft.png"/>
                </div>
                <div className="col-sm-3 col-sm-offset-2 footer-right" onClick={() => window.open('http://zyk.ouchn.edu.cn/portal/index')}>
                    <img src="/assets/img/footerRight.png"/>
                </div>
            </div>
        </div>
        
        )
    }
}
