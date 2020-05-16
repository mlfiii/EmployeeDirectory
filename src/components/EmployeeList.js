import React from 'react';
import axios from 'axios';
import "./style.css";

export default class EmployeeList extends React.Component {


    state = {
        employees: [],
        search: "",
        previousField: "",
        previousProp: "",
        sortOrder: "asc"

    }


    sortBy(key, prop) {


        let sortOrder = this.state.sortOrder

        // console.log('prevprop:', this.state.previousProp, 'prop:', prop)
        if ((this.state.previousField !== key)) {

            sortOrder = 'asc'

        }


        this.setState({
            employees: this.state.employees.sort(function (a, b) {
                var nameA = a[key]; // ignore upper and lowercase
                var nameB = b[key];
                if (prop === 'first') {
                    nameA = a[key][prop]; // ignore upper and lowercase
                    nameB = b[key][prop]; // ignore upper and lowercase
                }

                if (prop === 'last') {
                    nameA = a[key][prop]; // ignore upper and lowercase
                    nameB = b[key][prop]; // ignore upper and lowercase
                }
                if (sortOrder === 'asc') {

                    if (nameA < nameB) {

                        return -1;

                    }
                    if (nameA > nameB) {

                        return 1;
                    }
                } else {
                    if (nameB < nameA) {

                        return -1;

                    }
                    if (nameB > nameA) {

                        return 1;
                    }
                }

                // names must be equal

                return 0;
            })

        }

        )



        this.setState({ previousProp: prop })
        this.setState({ previousField: key })

        if (this.state.sortOrder === 'asc') {

            this.setState({ sortOrder: 'desc' })


        } else {
            this.setState({ sortOrder: 'asc' })


        }


    }

    componentDidMount() {

        axios.get("https://randomuser.me/api/?results=200&nat=us")
            .then(res => {
                // console.log(res.data.results);
                this.setState({
                    employees: res.data.results.sort(function (a, b) {
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
                    })



                });
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
                <nav className="navbar navbar-light bg-light">

                    <input type="text" className="search-imput"
                        value={this.state.search}
                        onChange={this.updateSearch.bind(this)}
                        placeholder="Search Employee Directory"
                    />
                </nav>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-light">
                            <tr key='300'>
                                <th className="">
                                </th>
                                <th className="">
                                    <button className="btn btn-link" onClick={() => this.sortBy('name', 'first')}>First Name</button>
                                </th>
                                <th className="th-sm">
                                    <button className="btn btn-link" onClick={() => this.sortBy('name', 'last')}>Last Name</button>
                                </th>
                                <th className="th-sm">
                                    <button className="btn btn-link" onClick={() => this.sortBy('email', '')}>Email</button>
                                </th>
                                <th className="th-sm">
                                    <button className="btn btn-link" onClick={() => this.sortBy('phone', '')}>Phone</button>
                                </th>
                                <th className="th-sm">
                                    <button className="btn btn-link" onClick={() => this.sortBy('cell', '')}>Cell Phone</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="data">

                            {filteredEmployees.map(employee =>
                                <tr key={employee.email + employee.phone} >
                                    <td><img src={employee.picture.thumbnail} alt="Smiley face" /></td>
                                    <td id="first_name_column" className="data-column">{employee.name.first}</td>
                                    <td className="data-column">{employee.name.last}</td>
                                    <td className="data-column">{employee.email}</td>
                                    <td className="data-column">{employee.phone}</td>
                                    <td className="data-column">{employee.cell}</td>

                                </tr>



                            )}
                        </tbody>
                    </table>

                </div>

            </div >
        )
    }

}