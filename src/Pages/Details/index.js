import './style.css';
import DatePicker from "react-datepicker";
import {FaArrowLeft} from 'react-icons/fa';
import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = ({history})=>{

    const getTask = async ()=>{
        const task = await axios.get('http://localhost:3333/todo/'+id);
        setTitle(task.data.title);
        setDescription(task.data.description);
        const dateFormatted = new Date(task.data.date)
        setDate(dateFormatted);
    }

    const removeTask = async ()=>{
        await axios.delete('http://localhost:3333/todo/'+id)
        history.push('/');

    }

    const updateTask = async ()=>{
        await axios.put('http://localhost:3333/todo/'+id, {
            title: title,
            description: description,
            date: date
        });
        notify("Task atualizada com sucesso!","success");
    }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const params = useParams();
    const id = params.id;
    const notify = (msg, type) => toast(msg, {type:type});

    useEffect(()=>{
        getTask();
    },[]);

    axios.post('http://localhost:3000/users',

        { id: '154987', nome: 'Wesley Bruno', nascimento: 1992, })

        .then(() => alert('Usuário criado com sucesso!'))

.catch(() => alert('Erro ao criar usuário!'))

    return(
        <div className="container-details">
            <ToastContainer/>
            <div className="subcontainer-details">
                <div className="container-header">
                    <Link to="/">
                        <FaArrowLeft/>
                        <span>Voltar</span>
                    </Link>
                </div>
                <input value={title} placeholder="Título" onChange={(txt)=> setTitle(txt.target.value)}/>
                <textarea value={description} placeholder="Descrição" onChange={(txt) => setDescription(txt.target.value)}/>
                <DatePicker dateFormat="dd/MM/yyyy" selected={date} onChange={(txt) => setDate(txt)}/>
                <div className="container-buttons">
                    <button onClick={updateTask}>Salvar</button>
                    <button onClick={removeTask}>Excluir</button>
                </div>
            </div>
        </div>
    );
}

export default Details;