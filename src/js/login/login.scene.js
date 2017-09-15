import React, {Component} from "react";
import ReactDOM from "react-dom";
import {browserHistory} from 'react-router'
import './login.style.less'
import networkAction from "../utils/networkAction"
<<<<<<< Updated upstream
import { Modal, Button } from "react-bootstrap"
=======
import {encrypt} from '../utils/encrypt'
>>>>>>> Stashed changes

export default class Login extends Component {
    constructor(props) {  // 只有在constructor中可以直接为this.state分配值，其他情况要是用setState()方法更新state值，如this.setState({loginState:0})
        super(props);
        this.userId = "",
        this.post = [];     // 职务
        this.protitle = [];   // 职称
        this.departmentInfo = [];  // 院系
        this.userAuthInfo = [];
        this.state = {
            loginState: 0, // 0表示未登录，1表示用户名或密码错误，2表示该用户不存在
            content: ["用户名或密码错误，请重新输入！","该用户不存在，请重新输入！"],
            userNum: "",
            password: "",
            showModal:false,
            showRemind:false,
            pwordConfirm:"",
            individualInfo: {},
        }
    }
    componentWillMount() {
        // 发送清除cookie的请求
        const result = networkAction.promiseNetwork({"url": `TeachingResourceManagement/user/logout`, "method": 'POST'});
        const departmentInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/departmentBrowsing`, method: 'POST'});
        const postAndProtitle = networkAction.promiseNetwork({url: `TeachingResourceManagement/user/getPostAndProtitle`, method: 'POST'});
        const userAuthInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/user/getAuthorityList`, method: 'POST'});
        
        result.then((res) => {
            console.log("logout-result:", res);
            sessionStorage.clear();
        })
        departmentInfo.then((res) => {
            console.log("departmentBrowsing: ", res);
            this.departmentInfo = res.data.departmentInfo;
        })
        postAndProtitle.then((res) => {
            console.log("getPostAndProtitle: ", res);
            this.post = res.data.post;
            this.protitle = res.data.protitle;
        })
        userAuthInfo.then((res) => {
            console.log("userAuthInfo: ", res);
            this.userAuthInfo = res.data.userAuthorities;
        })
    }
    handleLogin(event) {
        event.preventDefault();
        console.log("handleLogin")
        // let userNum = document.getElementsByName("userNum")[0].value;
        // let password = document.getElementsByName("password")[0].value;
        let userNum = this.state.userNum;
        let password = this.state.password;

        // let encryptUserNum = encrypt(userNum);
        // let encryptPassword = encrypt(password);
        //console.log("usrNum: ", encryptUserNum, "psw: ", encryptUserNum);
        // let CryptoJS = require("crypto-js");
        // console.log("########", CryptoJS.HmacSHA1("Message", "Key"));

        //console.log("usrNum: ", userNum, "psw: ", password);
        const result = networkAction.promiseNetwork({"url": `TeachingResourceManagement/user/login`, "method": 'POST'},{"userNum": userNum, "password": password})
        result.then((res) => {
            console.log("login-result:", res);
            if(res.code == 0){
                this.userId = res.data.userId;
                console.log("this.userId:", this.userId);
                this.props.userStateOnChange(this.userId);
                sessionStorage.setItem('userId', this.userId);
                browserHistory.push('/TeachingResourceManagement/home');
            }else if(res.code == 1){
                this.setState({loginState: 1});
            }else{
                this.setState({loginState: 2});
            }
        })
    }  
    guestLogin() {
        const result = networkAction.promiseNetwork({"url": `TeachingResourceManagement/user/guestLogin`, "method": 'POST'})
        result.then((res) => {
            console.log("guest-login-result:", res);
            if(res.code == 0){
                // this.userId = res.data.userId;
                console.log("this.userId:", this.userId);
                this.props.userStateOnChange('guest');
                sessionStorage.setItem('userId', 'guest');
                browserHistory.push('/TeachingResourceManagement/home');
            }else if(res.code == 1){
                this.setState({loginState: 1});
            }else{
                this.setState({loginState: 2});
            }
        })
    }
    renderWrong(){
        if(this.state.loginState == 1){
           return "用户名或密码错误，请重新输入！"
        }else return null;
    }
    userNumChange(event) {
        this.setState({
            userNum: event.target.value,
            loginState: 2
        })
    }
    passwordChange(event) {
        this.setState({
            password: event.target.value,
            loginState: 2
        })
    }
    
    register(event) {
        console.log("registermodal:");
        this.setState({
            showModal: true,
            individualInfo: {
                gender: "0",
                depId:  this.departmentInfo[0].depId,
                postId: this.post[0].postId,
                protitleId: this.protitle[0].protitleId,
                userauthId: this.userAuthInfo[0].userauthId
            }
        })
    }
    showRegisterModal() {
        return (
            <div className="modal">
       <Modal show = { this.state.showModal} onHide = {this.closeModal.bind(this) }>
             <Modal.Header closeButton>
                    <Modal.Title>注册新用户</Modal.Title>
                </Modal.Header>
                    {this.inputForm()}
                <Modal.Footer>
                </Modal.Footer>
        </Modal >  
        </div>     
        )

    }
    closeModal(event) {
        this.setState({
            showModal: false,
            individualInfo: {}
        })
    }
    handleInfoSubmit(event) {
        event.preventDefault();
        //alert("register");
        console.log("handleRegisterSubmit");
        let { id, pword, name, gender, age, depId, postId, protitleId, research, userauthId, userId } = this.state.individualInfo;
        let url = `TeachingResourceManagement/user/register`;
        let obj = {
            "userNum": id,
            "userName": name,
            "sex": gender,
            "birthDate": age,
            "depId": depId,
            "postId": postId,
            "protitleId": protitleId,
            "researcharea": research,
            "userauthId": userauthId,
            "password":pword
        };
        const result = networkAction.promiseNetwork({
            "url": url,
            "method": 'POST'
        }, obj);

        result.then((res) => {
            console.log("handle-register-result:", res);
            if (res.code == 0) {
                alert("注册成功！");
                this.setState({
                    showModal: false,
                    individualInfo: {}
                })
            } else {
                alert("注册失败，请稍后重试！");
            }
        })
        event.preventDefault();

    }
    showRemind() {
        if(this.state.showRemind) {
            return <div className="register-remind">两次密码不一致！</div> ;
        }
        else return null;
    }
    confirmPword(pwordConfirm) {
        console.log("first:",this.state.individualInfo.pword,"again:",pwordConfirm)
        if(this.state.individualInfo.pword!=pwordConfirm) {
            this.setState({
                showRemind:true,
            })
        }
        else {
            this.setState({
                showRemind:false,
            })
        }
    }
    userNumbChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, { id: event.target.value })
        })
    }
    pwordChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, { pword: event.target.value })
        })
    }
    userNameChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, { name: event.target.value })
        })
    }
    pwordConfirmChange(event) {
        this.setState({
            pwordConfirm: event.target.value,
        })
        this.confirmPword(event.target.value);
    }
    sexChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, { gender: event.target.value })
        })
    }
    birthDateChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, { age: event.target.value })
        })
    }
    depIdChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, { depId: event.target.value })
        })
    }
    postIdChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, { postId: event.target.value })
        })
    }
    protitleIdChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, { protitleId: event.target.value })
        })
    }
    researchareaChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, { research: event.target.value })
        })
    }
    authIdChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, { userauthId: event.target.value })
        })
    }
    inputForm() {
        let {id, pword, name, gender, age, depId, postId, protitleId, research, userauthId} = this.state.individualInfo; 
        let pwordConfirm = this.state.pwordConfirm;  
        return (
        <div>
            <div className="change-info-left col-sm-offset-3">
                <div className="change-info-text-first">教工号</div>
                <div className="change-info-text">密码</div>
                <div className="change-info-text">确认密码</div>
                <div className="change-info-text">姓名</div>
                <div className="change-info-text">性别</div>
                <div className="change-info-text">生日</div>
                <div className="change-info-text">科室</div>
                <div className="change-info-text">职务</div>
                <div className="change-info-text">职称</div>
                <div className="change-info-text">研究方向</div>
                <div className="change-info-text">教工权限</div>
            </div>

            <div className="change-info-right"> 
                <form onSubmit={this.handleInfoSubmit.bind(this)}>                                      
                    <div className="change-info-first">
                        <input type="text" className="form-control"
                        value={id} 
                        onChange={this.userNumbChange.bind(this)} required/>
                    </div>
                    <div className="change-info ">
                        <input type="password" className="form-control" 
                            value={pword} 
                            onChange={this.pwordChange.bind(this)} required/>
                    </div>
                    <div className="change-info ">
                        <input type="password" className="form-control" 
                            value={pwordConfirm} 
                            onChange={this.pwordConfirmChange.bind(this)} required/>
                            {this.showRemind()}
                    </div>
                    <div className="change-info ">
                        <input type="text" className="form-control" 
                            value={name} 
                            onChange={this.userNameChange.bind(this)} required/>
                    </div>
                    <div className="change-info">  
                        <select className="changeInfo-select form-control"
                                value={gender} 
                                onChange={this.sexChange.bind(this)} required>
                            <option value="0">男</option>
                            <option value="1">女</option>
                        </select>
                    </div>
                    <div className="change-info  ">
                        <input name="" type="date" className="changeInfo-select form-control"
                            value={age} 
                            onChange={this.birthDateChange.bind(this)} required/> 
                    </div>
                    <div className="change-info ">
                        <select className="changeInfo-select form-control"
                                value={depId} 
                                onChange={this.depIdChange.bind(this)} required>
                            {this.departmentInfo.map((department, index) => {
                            return (
                                <option value={department.depId} key={department.depId}>{department.depName}</option>
                            )
                        })}
                        </select>
                    </div>
                    <div className="change-info">
                        <select type="text" className="form-control" 
                            value={postId} 
                            onChange={this.postIdChange.bind(this)} required>
                        {this.post.map((post, index) => {
                            return (
                                <option value={post.postId} key={post.postId}>{post.postName}</option>
                            )
                        })}    
                        </select>
                    </div>
                    <div className="change-info">  
                        <select className="changeInfo-select form-control"
                                value={protitleId} 
                                onChange={this.protitleIdChange.bind(this)} required>
                            {this.protitle.map((protitle, index) => {
                                return (
                                    <option value={protitle.protitleId} key={protitle.protitleId}>{protitle.protitleName}</option>
                                )
                            })}    
                        </select> 
                    </div>
                    <div className="change-info">
                        <input type="text" className="form-control" 
                            value={research} 
                            onChange={this.researchareaChange.bind(this)} required/>
                    </div>
                    <div className="change-info">
                        <select className="changeInfo-select form-control"
                            value={userauthId} 
                            onChange={this.authIdChange.bind(this)} required>
                            {this.userAuthInfo.map((userAuth, index) => {
                                return (
                                    <option value={userAuth.userauthId} key={userAuth.userauthId}>{userAuth.userauthName}</option>
                                )
                            })}
                        </select> 
                    </div>
                     
                    <div className="button">
                        <input type="submit" className="btn btn-default info-submit"  value="提交" /> 
                        <input type="button" className="btn btn-default info-submit" onClick={this.closeModal.bind(this)} value="取消" /> 
                    </div>
                </form>
            </div>
        </div>
        )
    }

    render(){
        return(
            <div id="login-page">
                <div className=" login-all ">
                    <div  className=" login-left " >
                        <form className="form-sign" onSubmit={this.handleLogin.bind(this)}>
                            <div className="head">
                                <h3 className="form-sign-heading">欢迎登录智能实训管理平台！</h3>
                            </div>
                            <div className="username">
                                <input type="text" className="form-control" name="userNum" placeholder="账号"
                                value={this.state.userNum} 
                                onChange={this.userNumChange.bind(this)} 
                                required />
                            </div>
                            <div className="password">
                                <input type="password" className="form-control" name="password" placeholder="密码"
                                value={this.state.password} 
                                onChange={this.passwordChange.bind(this)} 
                                required />
                            </div>
                            <div className="summit">
                                <input className="btn btn-md btn-primary btn-block" type="submit" value="登录"/>
                                <div className="left-summit">
                                    <input className="btn btn-md btn-primary btn-block" type="button" onClick={this.guestLogin.bind(this)} value="游客访问"/>
                                </div>
                                <div className="right-summit">
                                    <input className="btn btn-md btn-primary btn-block" type="button" onClick={this.register.bind(this)} value="注册"/>
                                </div>
                            </div>
                        </form>
                        <br /><br />
                        <div className="login-remind">{this.renderWrong()}</div> 
                    </div>
                    <div className=" login-right  ">
                        <h4>扫描二维码登录</h4>
                        <img src="/assets/img/login.jpg" />
                    </div>
                </div>
                {this.showRegisterModal() }
            </div>
           
        );
    }
}
