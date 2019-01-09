import React, { Component } from 'react';

class App extends Component {

	constructor() {
		super();
		
		this.state = {
			title: '',
			description: '',
			tasks: []
		}

		this.addTask = this.addTask.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	addTask(e) {

		e.preventDefault();

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
			})
			.catch(err => console.log(err));

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

	render() {
		return (
			<div>
				{ /** NAVIGATION */}
				<nav className="light-blue darken-4">
					<div className="container">
						<a href="/" className="brand-logo">MERN Stack</a>
					</div>
				</nav>
				<br/>
				<div className="container">
					<div className="row">
						<div className="col s12">
							<div className="card">
								<div className="card-content">
									<form onSubmit={this.addTask}>
										<div className="row">
											<div className="col s12 input-field">
												<input type="text" name="title" onChange={this.handleChange} placeholder="Task title..." value={this.state.title} />
											</div>
										</div>
										<div className="row">
											<div className="col s12 input-field">
												<textarea name="description" onChange={this.handleChange} className="materialize-textarea" placeholder="Task description..." value={this.state.description} ></textarea>
											</div>
										</div>
										<button type="submit" className="btn light-blue darken-4">Send</button>
									</form>
								</div>
							</div>
						</div>
						<div className="col s12">
							<table className="centered">
								<thead>
									<tr>
										<th>ID</th>
										<th>Title</th>
										<th>Description</th>
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