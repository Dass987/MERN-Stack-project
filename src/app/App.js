import React, { Component } from 'react';
import NavBar from './NavBar';
import TaskForm from './TaskForm';

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
					M.toast({html: 'Task Updated');
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
				<br/>
				<div className="container">
					<div className="row">
						<div className="col s12">
							
						</div>
						<div className="col s12">
							<table className="centered">
								<thead>
									<tr>
										<th>ID</th>
										<th>Title</th>
										<th>Description</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{this.state.tasks.map(task => {
										return (<tr key={task._id}>
														<td>
															{task._id}
														</td>
														<td>
															{task.title}
														</td>
														<td>
															{task.description}
														</td>
														<td>
															<button className="btn waves-effect waves-light light-blue darken-4 hoverable" onClick={() => {
																this.editTask(task._id);
															}}><i className="material-icons">edit</i></button>&nbsp;
															<button className="btn waves-effect waves-light light-blue darken-4 hoverable" onClick={() => {
																this.deleteTask(task._id);
															}}><i className="material-icons">delete</i></button>
														</td>
													</tr>);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default App;