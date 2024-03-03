import React, { useContext, useEffect, useState, useRef } from 'react'
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext';
import userContext from '../context/usersDetails/userContext';
import { useNavigate } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    ArcElement
} from 'chart.js';
import Notes from './Notes';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    ArcElement
)

const DashBoard = (props) => {
    const noteCont = useContext(noteContext);
    const userCont = useContext(userContext);
    const { notes, getNotes } = noteCont;
    const { user, getUser } = userCont;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser();
            getNotes();
        }
        // eslint-disable-next-line
    }, [])
    // creating a use state to display user data

    const noteArr = notes;
    const curr_date = new Date();
    let curr_month, curr_year;
    curr_month = curr_date.getMonth();
    // curr_week = curr_date.getWeek();
    curr_year = curr_date.getFullYear()
    let monthWiseNotesCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let codeWiseNotesCount = [0, 0, 0, 0, 0];
    noteArr.forEach((obj) => {
        let date = new Date(obj.date);
        let index = date.getMonth();
        let year = date.getFullYear();
        if (year == curr_year) {
            monthWiseNotesCount[index]++;
        }
        if (obj.tag === "code") codeWiseNotesCount[0]++;
        else if (obj.tag === "general") codeWiseNotesCount[1]++;
        else if (obj.tag === "") codeWiseNotesCount[2]++;
        else if (obj.tag === "personal") codeWiseNotesCount[3]++;
        else codeWiseNotesCount[4]++;
    })
    // console.log(noteArr)
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Notes in the Year ' + curr_year,
            data: monthWiseNotesCount,
            backgroundColor: 'aqua',
            borderColor: 'grey',
            pointBorderColor: 'aqua'
        }]
    }
    const pieChartData = {
        labels: ['Code', 'General', 'No Tag', 'Personal', 'Other'],
        datasets: [{
            label: 'Notes by Tags',
            data: codeWiseNotesCount,
            backgroundColor: ['#ffc107', '#0d6efd', '#dc3545', '#198754', '#0dcaf0'],
            borderColor: 'white',
            pointBorderColor: 'aqua'
        }]
    }
    const options = {
        plugins: {
            legend: true
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center w-100 gap-5 mx-auto p-2 flex-wrap">
                <div className='d-flex flex-column'>
                    <div className="user-details d-flex flex-column rounded shadow p-2 justify-content-center" style={{ height: "15rem" }}>
                        <h3 className='ms-3'>{user.name}</h3>

                        <p className='ms-3'>
                            Email : {user.email}
                        </p>
                        <p className='ms-3'>
                            Total Notes : {noteArr.length}
                        </p>
                    </div>
                    <div className='pie-chart p-1 my-3 shadow rounded'>
                        <Pie
                            data={pieChartData}
                            options={options}
                        >
                        </Pie>
                    </div>
                </div>
                <div className="w-50">
                    <div className="user-notes-chart shadow rounded w-100 ms-3 p-2" style={{ height: "25rem" }}>
                        <Line
                            data={data}
                            options={options}
                        >
                        </Line>
                    </div>
                    <div className="column container mx-3 shadow p-2 rounded my-3">
                        <h3 className='text-center my-3'>Your Notes</h3>
                        {notes.length !== 0 ? notes.map((note, index) => {
                            return <div key={index} className="col-md-3 w-75 mx-auto">
                            <div className="card my-3">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title me-2">{note.title}</h5>
                                        <span className={`badge rounded-pill text-bg-${note.tag==="general"?"primary":(note.tag==="personal"?"success":note.tag==="code"?"warning":note.tag===""?"danger":"info")} text-center`}>{note.tag===""?"No Tag":note.tag}</span>
                                    </div>
                                    <p className="card-text">{note.description}</p>
                                    <p className="card-text">{new Date(note.date).toUTCString().slice(0,17)}</p>
                                </div>
                            </div>
                        </div>
                        }).reverse() : <p className='container text-center'>No Notes to display</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard