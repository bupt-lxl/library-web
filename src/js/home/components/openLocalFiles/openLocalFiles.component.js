import React, {Component} from "react"
import {Link, browserHistory} from "react-router"
//import "./openLocalFiles.style.less"
import { getConfig } from "../../../utils/getConfig"
export default class OpenLocalFiles extends React.Component {
    constructor(props) {
        super(props);
    }


    exec(event){
        let location = 'C:\\Windows\\explorer.exe';
        let obj = new ActiveXObject('Wscript.shell');
        if(obj) {
            obj.run(location);
            obj = null;
        } else {
            alert("wrong！");
        }
    }

    render() {
        return (
            <div className="open-files-area ">
                 {/* <div className="col-sm-4">
                    <a href={ getConfig().WordRegeditUrl } className="btn btn-warning " > 打开Word </a> 
                </div>
               
                <div className="col-sm-4">
                    <a href={ getConfig().ExcelRegeditUrl } className="btn btn-warning " > 打开Excel </a> 
                </div>
                <div className="col-sm-4">
                    <a href={ getConfig().PPTRegeditUrl } className="btn btn-warning " > 打开PPT </a> 
                </div>  */}
                 
                <a href={ getConfig().WordRegeditUrl } className="btn btn-info col-sm-4" > 打开Word </a>
                <a href={ getConfig().ExcelRegeditUrl } className="btn btn-info col-sm-4" > 打开Excel </a>
                <a href={ getConfig().PPTRegeditUrl } className="btn btn-info col-sm-4" > 打开PPT </a> 
            </div>
        );

    }
}
