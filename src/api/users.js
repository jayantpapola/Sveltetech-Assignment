import axios from 'axios';
export async function fetchUsers(){
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  return res.data;
}
