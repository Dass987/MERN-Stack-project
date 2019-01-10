import React, { Component } from 'react';
import NavBar from './NavBar';
import TaskForm from './TaskForm';
import TableTasks from './TableTasks';

class App extends Component {

	constructor() {
		super();
		
		this.state = {
			title: '',
			description: '',
			_id: '',
			tasks: []
		}

		this.addTask = this.addTask.bind(this);
		this.handleChange = this.handleChange.bind(this);
		//this.deleteTask = this.deleteTask.bind(this);

	}

	addTask(e) {

		e.preventDefault();

		if (this.state._id) {

			fetch('/api/tasks/' + this.state._id, {
				method: 'PUT',
				body: JSON.stringify(this.state),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then(res => res.json(res))
				.then(data => {
					console.log(data);
					this.setState({
						title: '',
						description: '', 
						_id: ''
					});
					this.fetchTasks();
					M.toast({html: 'Task Updated'});
					M.updateTextFields();
				})
				.catch(err => console.log(err));

		} else {

			fetch('/api/tasks', {
				method: 'POST',
				body: JSON.stringify(this.state),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then(res => res.json(res))
				.then(data => {
					M.toast({html: 'Task saved!', position: 'right'});
					console.log(data);
					this.setState({title: '', description: ''});
					this.fetchTasks();
				})
				.catch(err => console.log(err));

		}

	}

	componentDidMount() {
		this.fetchTasks();
	}

	fetchTasks() {
		fetch('/api/tasks')
			.then(res => res.json())
			.then(data => {
				console.log(data);
				this.setState({tasks: data});
			});
	}

	handleChange(e) {

		const { name, value } = e.target;

		this.setState({
			[name]: value
		});

	}
	
	editTask(id) {

		fetch('/api/tasks/' + id)
			.then(res => res.json())
			.then(data => {
				this.setState({
					title: data.title,
					description: data.description, 
					_id: data._id
				});
				M.updateTextFields();
			});
			
	}

	deleteTask(id) {

		// --- Establecer cuadro de confirmación
		
		fetch('/api/tasks/' + id, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				M.toast({html: 'Task Deleted'});
				this.fetchTasks();
			});

	}

	render() {
		return (
			<div>
				<NavBar/>
				<div className="container">
					<TaskForm addTask={this.addTask} handleChange={this.handleChange} state={this.state} />
				</div>
				<TableTasks tasks={this.state.tasks} editTask={this.editTask.bind(this)} deleteTask={this.deleteTask} />
			</div>
		);
	}
}

export default App;