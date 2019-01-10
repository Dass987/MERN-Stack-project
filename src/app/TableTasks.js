import React from 'react';
import Task from './Task';

class TableTasks extends React.Component {
	render() {
		return (
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
					<Task tasks={this.props.tasks} editTask={this.props.editTask.bind(this)} deleteTask={this.props.deleteTask} />
				</tbody>
			</table>
		);
	}
}

export default TableTasks;