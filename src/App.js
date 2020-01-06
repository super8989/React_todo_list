import React, { Component } from "react";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import uuid from "uuid";

class App extends Component {
	constructor(props) {
		super(props);
		const savedItems = JSON.parse(window.localStorage.getItem("items"));
		this.state = {
			items: savedItems || [{ id: 1, title: "Create a list!" }],
			id: uuid(),
			item: "",
			editItem: false
		};
	}

	handleChange = e => {
		this.setState({
			item: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		const newItem = {
			id: this.state.id,
			title: this.state.item
		};

		const updatedItems = [...this.state.items, newItem];
		this.setState(
			{
				items: updatedItems,
				item: "",
				id: uuid(),
				editItem: false
			},
			this.syncLocalStorage
		);
	};

	clearList = () => {
		this.setState(
			{
				items: []
			},
			this.syncLocalStorage
		);
	};

	handleDelete = id => {
		const filteredItems = this.state.items.filter(item => item.id !== id);

		this.setState(
			{
				items: filteredItems
			},
			this.syncLocalStorage
		);
	};

	handleEdit = id => {
		const filteredItems = this.state.items.filter(item => item.id !== id);
		const selectedItem = this.state.items.find(item => item.id === id);
		this.setState(
			{
				items: filteredItems,
				item: selectedItem.title,
				id: id,
				editItem: true
			},
			this.syncLocalStorage
		);
	};

	syncLocalStorage() {
		window.localStorage.setItem("items", JSON.stringify(this.state.items));
	}

	render() {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-10 mx-auto col-md-8 mt-5'>
						<h3 className='text-capitalize text-center'>Todo Input</h3>
						<TodoInput
							item={this.state.item}
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
							editItem={this.state.editItem}
						/>
						<TodoList
							items={this.state.items}
							clearList={this.clearList}
							handleDelete={this.handleDelete}
							handleEdit={this.handleEdit}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
