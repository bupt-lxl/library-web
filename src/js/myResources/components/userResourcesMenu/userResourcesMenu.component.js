import "./userResourcesMenu.style.less";
import {Image} from "react-bootstrap";
import {Modal, Button} from "react-bootstrap"
import React, {Component} from "react";
import {Link, browserHistory} from "react-router";
import UploadButton from "../../../components/uploadButton/uploadButton.component";
import networkAction from "../../../utils/networkAction"
import $ from "jquery"
export default class UserResourcesMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar'],
            userAuthId: "",
            closeServerModal: false,
            copyDatabaseModal: false,
        };
        console.log(browserHistory.getCurrentLocation().pathname)
    //this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
    // This section is bad style and causes a bug
        const words = this.state.words;
        words.push('marklar');
        this.setState({words: this.state.words.concat(['yyf'])});
    }

    componentWillMount() {
        const userInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/user/getUserInfo`, method: 'POST'});
        //console.log("查询权限信息userInfo: ", userInfo);
        userInfo.then((res) => {
            console.log("查询权限信息userInfo: ", res);
            this.setState({
                userAuthId: res.data.userauthId,  
            },)
        })
    }

    // showAdministrator(){
    //     let userAuthId = this.state.userAuthId;
    //     console.log("权限信息userAuthId: ", userAuthId);
    //     if(userAuthId == "00"){
    //         return(
    //             <ul className="nav navbar-nav">
    //                 <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />我的账号</li>
    //                 <li className="col-sm-12 text-center active"><Link to="/user/changeInfo">修改资料</Link></li>
    //                 <li className="col-sm-12 text-center active"><Link to="/user/changePassword">修改密码</Link></li>
    //                 <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />管理员</li>
    //                 <li className="col-sm-12 text-center active"><Link to="/user/adminQuery">查询/添加/修改</Link></li>
    //             </ul>
    //         )
    //     }else{
    //         return(
    //             <ul className="nav navbar-nav">
    //                 <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />我的账号</li>
    //                 <li className="col-sm-12 text-center active"><Link to="/user/changeInfo">修改资料</Link></li>
    //                 <li className="col-sm-12 text-center active"><Link to="/user/changePassword">修改密码</Link></li>
    //             </ul>
    //         )
    //     }
    // }

    componentDidMount() {

    }

    closeServerModal(){
        console.log("closeServerModal!!");
        return (
            <Modal show={this.state.closeServerModal} onHide={this.cancelCloseServer.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>确定要关闭远程服务器吗？</Modal.Title>
                </Modal.Header> 
                <Modal.Body>
                    <form onSubmit={this.handleCloseServer.bind(this)}>
                        <br/>
                        <input type="submit" className="btn btn-default info-submit" value="是" /> 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="button" className="btn btn-default reset" onClick={this.cancelCloseServer.bind(this)} value="否" /> 
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
    handleCloseServer(event){
        event.preventDefault();
        console.log("enter handleCloseServer$$$$$$$$$$$$$$$$$$$$$$$$$");
        const closeServerResult = networkAction.promiseNetwork({"url": `TeachingResourceManagement/remoteControl/shutdown`, "method": 'POST'})
        closeServerResult.then((res) => {
            console.log("closeServerResult@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:", res);
            this.setState({
                closeServerModal: false,
            })
        })
        //event.preventDefault();
    }
    cancelCloseServer(event){
        this.setState({
            closeServerModal: false,
        })
    }
    closeServer(event){
        console.log("enter closeServer##################");
        this.setState({
            closeServerModal: true,
        })
    }
    copyDatabaseModal(){
        console.log("copyDatabaseModal!!");
        return (
            <Modal show={this.state.copyDatabaseModal} onHide={this.cancelCopyDatabase.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>确定要备份数据库吗？</Modal.Title>
                </Modal.Header> 
                <Modal.Body>
                    <form onSubmit={this.handleCopyDatabase.bind(this)}>
                        <br/>
                        <input type="submit" className="btn btn-default info-submit" value="是" /> 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="button" className="btn btn-default reset" onClick={this.cancelCopyDatabase.bind(this)} value="否" /> 
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
    handleCopyDatabase(event){
        event.preventDefault();
        const copyDatabaseResult = networkAction.promiseNetwork({"url": `TeachingResourceManagement/remoteControl/backupdata`, "method": 'POST'})
        copyDatabaseResult.then((res) => {
            console.log("copyDatabaseResult:", res);
            this.setState({
                copyDatabaseModal: false,
            })
        })
        //event.preventDefault();
    }
    cancelCopyDatabase(event){
        this.setState({
            copyDatabaseModal: false,
        })
    }
    copyDatabase(event){
        console.log("enter copyDatabase##################");
        this.setState({
            copyDatabaseModal: true,
        })
    }

    renderBottom() {
        if(browserHistory.getCurrentLocation().pathname.search("user") !== -1) {
            let userAuthId = this.state.userAuthId;
            console.log("权限信息userAuthId: ", userAuthId);
            if(userAuthId == "00"){
                return(
                    <ul className="nav navbar-nav">
                        <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />我的账号</li>
                        <li className="col-sm-12 text-center active"><Link to="/TeachingResourceManagement/user/changeInfo">修改资料</Link></li>
                        <li className="col-sm-12 text-center active"><Link to="/TeachingResourceManagement/user/changePassword">修改密码</Link></li>
                        <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />管理员</li>
                        <li className="col-sm-12 text-center active"><Link to="/TeachingResourceManagement/user/adminQuery">查询/添加/修改</Link></li>
                        <li className="col-sm-12 text-center active"><Link onClick={this.closeServer.bind(this)}><span className="glyphicon glyphicon-off"></span> 关闭服务器</Link></li>
                        <li className="col-sm-12 text-center active"><Link onClick={this.copyDatabase.bind(this)}><span className="glyphicon glyphicon-copyright-mark"></span> 备份数据库</Link></li>
                    </ul>
                )
            }else{
                return(
                    <ul className="nav navbar-nav">
                        <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />我的账号</li>
                        <li className="col-sm-12 text-center active"><Link to="/TeachingResourceManagement/user/changeInfo">修改资料</Link></li>
                        <li className="col-sm-12 text-center active"><Link to="/TeachingResourceManagement/user/changePassword">修改密码</Link></li>
                        
                    </ul>
                )
            }

            //this.showAdministrator();
            // return (
            //     <ul className="nav navbar-nav">
            //         <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />我的账号</li>
            //         <li className="col-sm-12 text-center active"><Link to="/user/changeInfo">修改资料</Link></li>
            //         <li className="col-sm-12 text-center active"><Link to="/user/changePassword">修改密码</Link></li>
            //         <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />管理员</li>
            //         <li className="col-sm-12 text-center active"><Link to="/user/adminQuery">查询/添加/修改</Link></li>
            //     </ul>
            // )
        } else {
            return (
                <div className="col-sm-12">
                    <UploadButton />
                    <ul className="nav navbar-nav">
                        <li className="col-sm-12 text-center"><Link to="/TeachingResourceManagement/myResources/contribution">我的贡献</Link></li>
                        <li className="col-sm-12 text-center"><Link to="/TeachingResourceManagement/myResources/collection">我的收藏</Link></li>
                        <li className="col-sm-12 text-center"><Link to="/TeachingResourceManagement/myResources/download">我的下载</Link></li>
                    </ul>
                </div>
            )
        }
    }
    render() {
        return (
        <div>
            <Image className="col-sm-offset-3 user-image " height={80} width={80} src={"/assets/img/userimg.jpg"}  />
            <p className="col-sm-12 name text-center">{this.props.userName}</p>
            {this.renderBottom()}
            {this.closeServerModal()}
            {this.copyDatabaseModal()}    
        </div>
        );
    }
}

UserResourcesMenu.propTypes = {
    userName: React.PropTypes.string.isRequired,
    sex: React.PropTypes.number.isRequired,
    isAdmin: React.PropTypes.bool
}

UserResourcesMenu.defaultProps = {
    userName: "",
    sex: 0
}