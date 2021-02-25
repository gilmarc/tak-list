import './style.css';
import DatePicker from "react-datepicker";
import {FaCheck} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ()=>{

    const saveTask = async ()=>{
        const task = await axios.post('http://localhost:3333/todo',{
            title: title,
            description: description,
            date: date
        });
        getTask();
        notify("Task adiconada com sucesso!", "success");
    }

    const getTask = async ()=>{
        const tasks = await axios.get('http://localhost:3333/todo');
        setTasks(tasks.data);
        console.log('task: ', tasks);
    }

    const updateTask = async (id, status)=>{
        await axios.put('http://localhost:3333/todo/'+id, {
            status: !status,
        });
        getTask();
        notify("Task status feito!", "success");
        alert("Task atualizada!")
    }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const notify = (msg, type) => toast(msg, {type:type});

        useEffect(()=>{
            getTask();
        },[]);

    return(
        <div className="container-home">
            <ToastContainer/>
            <div className="subcontainer-home">
                <div className="container-left">
                    <h1>Task List</h1>
                    <p>Junte-se a mais de um milhão de usuários e gerencie seus serviços!</p>
                    <div className="container-form" >
                        <input placeholder="Título" onChange={(txt)=> setTitle(txt.target.value)}/>
                        <textarea placeholder="Descrição" onChange={(txt) => setDescription(txt.target.value)}/>
                        <DatePicker dateFormat="dd/MM/yyyy" selected={date} onChange={(txt) => setDate(txt)}/>
                        <button className="btn-save" onClick={saveTask}>Salvar</button>
                    </div>
                </div>
                <ul className="container-right">
                    {tasks.map(item=>{
                        const dateFormated = moment(item.date).format('DD/MM/yyyy')
                        return(
                        <li key={item._id}>
                            <div>
                                <Link to={"/details/"+item._id}>
                                    <h2 style={item.status?{}:{textDecoration:'line-through'}}>{item.title}</h2>
                                    <h3>{dateFormated}</h3>
                                    <h3>{item.description}</h3>
                                </Link>
                            </div>
                            <button  onClick={()=> updateTask(item._id, item.status)}>
                                <FaCheck size="22" color="#1a1a1a"/>
                            </button>
                        </li>
                    )})}
                </ul>
            </div>
        </div>
    );
}
export default Home;