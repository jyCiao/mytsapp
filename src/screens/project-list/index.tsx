import React from 'react';
import {useState, useEffect} from 'react';
import { cleanObject, useMount, useDebounce} from 'utils';
import List from './list';
import SearchPanel from './search-panel';
import * as qs from 'qs'
const apiUrl = process.env.REACT_APP_API_URL
function ProjectListScreen() {
  const [ param, setParam ] = useState({
    name:'',
    personId:''
  });
  const [ users, setUsers ] = useState([]);
  const debouncedParam = useDebounce(param,2000)
  const [list,setList]=useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response=>{
      if(response.ok){
        setList(await response.json())
      }
    })
  }, [debouncedParam]);
  useMount(()=>{
    fetch(`${apiUrl}/users`).then(async response=>{
      if(response.ok){
        setUsers(await response.json())
      }
    })
  })
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
}

export default ProjectListScreen;  
