import {Component} from 'react';

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";
import './app.css';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: true, id: 1, rise: false} ,
                {name: 'Alex M.', salary: 3000, increase: false, id: 2, rise: false} ,
                {name: 'Carl W.', salary: 5000, increase: false, id: 3, rise: true} ,
            ]

        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        this.setState(({data}) => {
            const newItem = {
                name,
                salary,
                increase: false,
                rise: false,
                id: this.maxId++
            }
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }


    render() {
        const employees = this.state.data.length;
        const employeesIncr = this.state.data.filter(item => item.increase).length;
        return (
            <div className="app">
                <AppInfo employees={employees}
                         employeesIncr={employeesIncr}/>

                <div className='search-panel'>
                    <SearchPanel/>
                    <AppFilter/>

                </div>
                <EmployersList data={this.state.data}
                               onDelete={this.deleteItem}
                               onToggleProp={this.onToggleProp}
                                />
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
        );
    }

}

export default App;