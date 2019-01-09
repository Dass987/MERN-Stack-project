import React, { Component } from 'react';

class TaskForm extends Component {
	render() {
		return (
			<div className="container">
				<div className="card z-depth-1">
					<div className="card-content">
						<span className="card-title"><h4 className="center-align">Add new task</h4></span>
						<form onSubmit={this.props.addTask}>
							<div className="row">
								<div className="col s12 input-field">
									<label>Task title</label>
									<input type="text" name="title" onChange={this.props.handleChange} value={this.props.state.title} />
								</div>
							</div>
							<div className="row">
								<div className="col s12 input-field">
									<label>Task description</label>
									<textarea name="description" onChange={this.props.handleChange} className="materialize-textarea" value={this.props.state.description} ></textarea>
								</div>
							</div>
							<div className="center-align">
								<button type="submit" className="btn light-blue darken-4 hoverable">Send</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default TaskForm;