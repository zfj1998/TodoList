import React, { Component } from "react";
import Modal  from "react-modal";
import axios from "axios";
import TodoItems from "./TodoItems";
import "./TodoList.css";

const source = "http://localhost:8000/todolist/list/";
const changeItem = "http://localhost:8000/todolist/detail/";

const customStyles = {
    content: {
        top: '15%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#container')

class TodoList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            modelKey: 0,
            modalInput: "",
            modalIsOpen: false,
            items : []
        };
        
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.finish = this.finish.bind(this);
        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    componentDidMount() {
        var items = []; 
        axios.get(source).then(result => {
            result.data.forEach((element,index,ar) => {
                var newItem = {
                    text:element.text, key:element.item_key, finish:element.finish
                };
                items.push(newItem);
            });
            this.setState({
                items: items
            })
        });
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    finish(key, text) {
        var itemsCopy = this.state.items;
        var finish = false;
        itemsCopy.forEach((element, index, ar) => {
            if (element.key === key) {
                finish = !element.finish;
                element.finish = !element.finish;
            }
        });
        axios({
            method: 'put',
            url: changeItem + key + "/",
            data: {
                item_key: key,
                text: text,
                finish: finish
            }
        }).then(response => {
            if (Object.is(response.status, 200)) {
                this.setState({
                    items: itemsCopy
                });
            }else{
                alert("服务出现了错误");
            }
        });
    }

    edit(key, text) {
        this.setState({
            modalIsOpen: true,
            modelKey: key,
            modalInput: text
        });
    }

    confirm(text){
        var key = this.state.modelKey;
        var itemsCopy = this.state.items;
        var finish = false;
        itemsCopy.forEach((element, index, ar) => {
            if (element.key === key) {
                element.text = text;
                finish = element.finish;
            }
        });

        axios({
            method: 'put',
            url: changeItem + key + "/",
            data: {
                item_key: key,
                text: text,
                finish: finish
            }
        }).then(response => {
            if (Object.is(response.status, 200)) {
                this.setState({
                    items: itemsCopy,
                    modalIsOpen: false
                });
            } else {
                alert("服务出现了错误");
            }
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    addItem(e) {
        if (this._inputElement.value !== ""){
            var text = this._inputElement.value;
            var key = Date.now();

            var newItem = {
                text: text,
                key: key
            };

            axios({
                method: 'post',
                url: source,
                data: {
                    item_key: key,
                    text: text,
                    finish: false
                }
            }).then(response => {
                if (Object.is(response.status, 201)) {
                    this.setState((prevState) => {
                        return {
                            items: prevState.items.concat(newItem)
                        };
                    });
                } else {
                    alert("服务出现了错误");
                }
            });
        }

        this._inputElement.value = "";

        e.preventDefault();
    }

    deleteItem(key) {
        var text="";
        var finish=false;
        var filteredItems = this.state.items.filter(function(item) {
            text = item.text;
            finish = item.finish;
            return (item.key !== key) 
        });

        axios({
            method: 'delete',
            url: changeItem+key+"/",
            data: {
                item_key: key,
                text: text,
                finish: finish
            }
        }).then(response => {
            if (Object.is(response.status, 204)) {
                this.setState({
                    items: filteredItems
                });
            } else {
                alert("服务出现了错误");
            }
        });
        
    }

    render(){
        return (
            <div className="todoListMain">
                 <div className="modal">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        style={customStyles}
                        closeTimeoutMS={250}
                        className="Modal"
                    >
                    <span><button className="modalButton" id="cancel" onClick={this.closeModal}>取消</button></span>
                    <span><button className="modalButton" id="confirm" 
                                onClick={()=>this.confirm(this.refs.modalInput.value)}>
                                修改</button></span>
                    <span><input id="modalInput" ref="modalInput" defaultValue={this.state.modalInput}/></span>
                    </Modal>
                </div>
      
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                                placeholder="enter task">
                        </input>
                        <button type = "submit" >添加</button>
                    </form>
                </div>
                <TodoItems entries={this.state.items} 
                            delete={this.deleteItem}
                            edit={this.edit}
                            finish={this.finish}/>
            </div>
        );
    }
}

export default TodoList;