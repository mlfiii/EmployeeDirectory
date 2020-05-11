import React from 'react';
import axios from 'axios';

export default class EmployeeList extends React.Component {


    state = {
        employees: [],
        search: ""
    }

    componentDidMount() {

        axios.get("https://randomuser.me/api/?results=200&nat=us")
            .then(res => {
                console.log(res.data.results);
                this.setState({ employees: res.data.results });
            });

    }

    updateSearch(event) {

        this.setState({ search: event.target.value.substr(0, 30) })
    }

    render() {
        let filteredEmployees = this.state.employees.filter(

            (employee) => {

                return employee.name.first.toLowerCase().indexOf(
                    this.state.search.toLowerCase()) !== -1 ||
                    employee.name.last.toLowerCase().indexOf(
                        this.state.search.toLowerCase()) !== -1 ||
                    employee.email.toLowerCase().indexOf(
                        this.state.search.toLowerCase()) !== -1 ||
                    employee.phone.toLowerCase().indexOf(
                        this.state.search.toLowerCase()) !== -1 ||
                    employee.cell.toLowerCase().indexOf(
                        this.state.search.toLowerCase()) !== -1

                    ;
            }
        );
        return (

            <div>

                <input type="text" className="form-control"
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                />
                <br />
                <table className="table-responsive">
                    <thead className="thead-dark">
                        <tr id="state">
                            <th className="th-sm">
                            </th>
                            <th className="th-sm">Name
                            </th>
                            <th className="th-sm">email
                            </th>
                            <th className="th-sm">Phone
                            </th>
                            <th className="th-sm">Cell Phone
                            </th>
                        </tr>
                    </thead>
                    <tbody id="data">

                        {filteredEmployees.map(employee =>
                            <tr>
                                <th><img src={employee.picture.thumbnail} alt="Smiley face" /></th>
                                <th>{employee.name.first} {employee.name.last}</th>
                                <th>{employee.email}</th>
                                <th>{employee.phone}</th>
                                <th>{employee.cell}</th>

                            </tr>



                        )}
                    </tbody>
                </table>



            </div>
        )
    }

}