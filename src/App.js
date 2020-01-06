import React, { Component } from "react";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import uuid from "uuid";

class App extends Component {
	state = {
		items: [
			{ id: 1, title: "wake up" },
			{ id: 2, title: "make breakfast" }
		],
		id: uuid(),
		item: "",
		editItem: false
	};

	render() {
		return (
			<div className='App'>
				<TodoInput />
				<TodoList />
			</div>
		);
	}
}

export default App;
