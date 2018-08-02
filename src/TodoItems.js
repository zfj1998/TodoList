import React, { Component } from "react";
import FlipMove from "react-flip-move";

class TodoItems extends Component {
    constructor(props){
        super(props);

        this.createTasks = this.createTasks.bind(this);
        this.edit = this.edit.bind(this);
        this.finish = this.finish.bind(this);
    }

    createTasks(item) {
        var itemText;
        if (item.finish) {
            itemText = <s>{item.text}</s>;
        }else{
            itemText = item.text;
        }

        return <li key={item.key}>
                    <span> 
                        < button id="btn1" onClick={()=>this.delete(item.key)}>移除</button>
                    </span>
                    <span>
                        <button id="btn2" onClick={()=>this.finish(item.key, item.text)}>完成</button> 
                    </span>
                    <span id="text"><p ref="P" onClick={()=>this.edit(item.key, item.text)}>{itemText}</p></span>
                </li>
    }

    finish(key, text){
        this.props.finish(key, text);
    }

    edit(key, text) {
        this.props.edit(key, text);
    }

    delete(key) {
        this.props.delete(key);
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return (
            <ul className="theList">
                <FlipMove duration={250} easing="ease-out">
                    {listItems}
                </FlipMove>
            </ul>
        );
    }
}

export default TodoItems;