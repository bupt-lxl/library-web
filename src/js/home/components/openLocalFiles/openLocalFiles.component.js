import React, {Component} from "react"
import {Link, browserHistory} from "react-router"
import "./openLocalFiles.style.less"
import { getConfig } from "../../../utils/getConfig"
export default class OpenLocalFiles extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }


    // goToUpload() {
    //     browserHistory.push("/TeachingResourceManagement/myResources/upload");
    // }

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
            <div className="col-sm-12 form-group">
                 {/* <a href="javascript:;" className="file"><i className="glyphicon glyphicon-folder-open" /> 打开本地文档
                      <input type="file" ref={(input) => { this.fileInput = input; }} />  
                    <input type="file"  />
                </a>  */}

                {/* <form>
                    <input type="button"  value="启动本地应用" onClick={ this.exec.bind(this) } />
                </form> */}

                {/* <a href="myOpenLocalFiles://" ><i className="glyphicon glyphicon-folder-open" /> 打开本地文档 </a>     */}
                {/* <a href="Word.Backup.8://" ><i className="glyphicon glyphicon-folder-open" /> 打开Word </a>  */}

                <a href={ getConfig().regeditUrl } ><i className="glyphicon glyphicon-folder-open" /> 打开Word </a> 
                {/* <a href="Word.Document.12://" ><i className="glyphicon glyphicon-folder-open" /> 打开Word </a> */}
                {/* <a href="Explorer.AssocActionId.BurnSelection://" ><i className="glyphicon glyphicon-folder-open" /> 打开本地文档 </a> */}

            </div>
        );

    }
}
