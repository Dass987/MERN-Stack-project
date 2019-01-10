import React from 'react';

class Task extends React.Component {	
	render() {
		return (
			this.props.tasks.map(task => {
				
				return <tr key={task._id}>
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
							this.props.editTask(task._id);
						}}><i className="material-icons">edit</i></button>&nbsp;
						<button className="btn waves-effect waves-light light-blue darken-4 hoverable" onClick={() => {
							this.props.deleteTask(task._id);
						}}><i className="material-icons">delete</i></button>
					</td>
				</tr>;
			})
		);
	}
}

export default Task;
