import React from 'react';
import AddUser from './addUser';
import DeleteUser from './deleteUser';
import EditUser from './updateUser';
import UpdateUser from './updateUser';

async function getUsers() {
    const res = await fetch("http://localhost:5000/users", {cache: 'no-store'});
    return res.json();
}

interface User {
    id: number;
    nama: string;
    npm: number;
    matkul: string;
}

async function UserList() {
    const users: User[] = await getUsers();
    return (
    <div className="py-10 px-10">
        <h1 className='text-center text-blue-700 mb-5 font-bold text-4xl'>MAHASISWA TI ANGKATAN 2022</h1>
        <div className="py-2">
            <AddUser/>
        </div>
        <table className="table-auto w-full mt-3">
        <thead className="bg-gray-500 text-white">
            <tr>
                <th className="border border-gray-400 p-2 rounded-tl-lg">ID</th>
                <th className="border border-gray-400 p-2">Nama Mahasiswa</th>
                <th className="border border-gray-400 p-2">NPM</th>
                <th className="border border-gray-400 p-2">Mata Kuliah</th>
                <th className="border border-gray-400 p-2 rounded-tr-lg">Aksi</th>
            </tr>
        </thead>
        <tbody className="bg-gray-200">
            {users.map((user, index) => (
            <tr key={user.id}>
                <td className="border border-gray-400 text-center p-2">{index + 1}</td>
                <td className="border border-gray-400 p-2">{user.nama}</td>
                <td className="border border-gray-400 text-center p-2">{user.npm}</td>
                <td className="border border-gray-400 text-center p-2">{user.matkul}</td>
                <td className="border border-gray-400 text-center p-2">
                    <UpdateUser {...user}/>
                    <DeleteUser {...user}/>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
}

export default UserList