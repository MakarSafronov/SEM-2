import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
const Table=()=>{
    const initialData=[
        {id:1,firstname:'Ваня',lastname:'Свинов',city:'Калининград',email:'trtewrsdx.@gmail.com'},
        {id:2,firstname:'Алеся',lastname:'Кистева',city:'Самара',email:'astewrsdx.@gmail.com'},
        {id:3,firstname:'Антон',lastname:'Алогов',city:'Краснодар',email:'kotewrsdx.@gmail.com'},
        {id:4,firstname:'Дима',lastname:'Циферов',city:'Москва',email:'lmtewrsdx.@gmail.com'},
        {id:5,firstname:'Лера',lastname:'Светова',city:'Тверь',email:'ertewrsdx.@gmail.com'},
        {id:6,firstname:'Онтон',lastname:'Амоников',city:'Владивосток',email:'ewtewrsdx.@gmail.com'},
        {id:7,firstname:'Олег',lastname:'Шлестов',city:'Курск',email:'aitewrsdx.@gmail.com'},
        {id:8,firstname:'Женя',lastname:'Фегоров',city:'Ростов на Дану',email:'pxtewrsdx.@gmail.com'},
        {id:9,firstname:'Радион',lastname:'Делов',city:'Санкт-Питербург',email:'vbtewrsdx.@gmail.com'},
        {id:10,firstname:'Миша',lastname:'Стирков',city:'Ялта',email:'wetewrsdx.@gmail.com'}
    ];
    const [data,setData]=useState(initialData);
    const [sortConfig,setSortConfig]=useState({key:null,direction:'ascending'});

    const requestSort=(key)=>{
        let direction='ascending';
        if (sortConfig.key===key && sortConfig.direction==='ascending'){
            direction='descending'
        }
        setSortConfig({key,direction});
        const sortedData=[...data].sort((a,b)=>{
            if (a[key]<b[key]) return direction==='ascending' ? -1:1;
            if (a[key]>b[key]) return direction==='ascending' ? 1:-1;
            return 0;
        });
        setData(sortedData)
    };
    const getSortDirectionIndicator=(key)=>{
        if (sortConfig.key!==key) return ''
        return sortConfig.direction ==='ascending' ? ' ↑' : ' ↓';
    };
    return(
    <div className="container mt-4">
        <h3 className="mb-4">Таблица с сортировкой</h3>
        <table className="table table-striped table-bordered">
            <thead className="thead-dark">
                <tr>
                    <th onClick={()=>requestSort('id')}>ID{getSortDirectionIndicator('id')}</th>
                    <th onClick={()=>requestSort('firstname')}>ИМЯ{getSortDirectionIndicator('firstname')}</th>
                    <th onClick={()=>requestSort('lastname')}>ФАМИЛИЯ{getSortDirectionIndicator('lastname')}</th>
                    <th onClick={()=>requestSort('city')}>ГОРОД{getSortDirectionIndicator('city')}</th>
                    <th onClick={()=>requestSort('email')}>EMAIL{getSortDirectionIndicator('email')}</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.city}</td>
                        <td>{item.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};
export default Table;