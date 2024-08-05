'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface User {
    id: number;
    nama: string;
    npm: number;
    matkul: string;
}

const DeleteUser = (user: User) => {
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();

    async function handleDelete(userId: number) {
        setIsMutating(true);
        await fetch(`http://localhost:5000/users/${userId}`, {
            method: 'DELETE',
        });

        setIsMutating(false);

        router.refresh();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <>  
            <button className="btn btn-error btn-sm text-white px-3" onClick={handleChange}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Anda yakin menghapus {user.nama}?</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Batal</button>
                        {!isMutating ? (
                            <button type="button" onClick={() => handleDelete(user.id)} className="btn btn-primary">Hapus</button>
                        ) : (
                            <button type="button" className="btn loading">Menghapus...</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteUser;
