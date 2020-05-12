import React from 'react';
import axios from 'axios';
import "./style.css";

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

        // console.log("sorted:", this.state.employees.sort(function (a, b) {
        //     var nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
        //     var nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
        //     if (nameA < nameB) {
        //         return -1;
        //     }
        //     if (nameA > nameB) {
        //         return 1;
        //     }
        //     // names must be equal
        //     return 0;
        // }))
        let filteredEmployees = this.state.employees.sort(function (a, b) {
            var nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        }).filter(

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
                <nav className="navbar navbar-light bg-light">

                    <input type="text" className="search-imput"
                        value={this.state.search}
                        onChange={this.updateSearch.bind(this)}
                        placeholder="Search Employee Directory"
                    />
                </nav>
                <table className="table-responsive">
                    <thead className="thead-dark">
                        <tr id="state">
                            <th className="th-sm">
                            </th>
                            <th className="th-sm">Name
                            </th>
                            <th className="th-sm">Email
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