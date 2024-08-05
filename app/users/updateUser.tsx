'use client'
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

interface User {
    id: number;
    nama: string;
    npm: number;
    matkul: string;
}

const UpdateUser = (user: User) => {
    const [nama, setNama] = useState(user.nama);
    const [npm, setNpm] = useState(user.npm);
    const [matkul, setMatkul] = useState(user.matkul);
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();

    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        await fetch(`http://localhost:5000/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama: nama,
                npm: npm,
                matkul: matkul,
            }),
        });

        setIsMutating(false);
        setMatkul("");
        router.refresh();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <>  
            <button className="btn btn-info btn-sm mr-2 text-white px-3" onClick={handleChange}>
                <FontAwesomeIcon icon={faPencilAlt} />
            </button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Edit data {user.nama}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Nama Mahasiswa</label>
                            <input 
                                type="text" 
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                className="input w-full input-bordered" 
                                placeholder="nama lengkap"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">NPM</label>
                            <input 
                                type="text" 
                                value={npm}
                                onChange={(e) => setNpm(Number(e.target.value))}
                                className="input w-full input-bordered" 
                                placeholder="nomor pokok mahasiswa"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Mata Kuliah</label>
                            <select 
                                className="select w-full input-bordered"
                                value={matkul}
                                onChange={(e) => setMatkul(e.target.value)}
                            >
                                <option value="" disabled selected hidden>Pilih Mata Kuliah</option>
                                <option value="Teknologi Informasi">Teknologi Informasi</option>
                                <option value="Budidaya Tanaman Perkebunan">Budidaya Tanaman Perkebunan</option>
                                <option value="Teknologi Sipil">Teknologi Sipil</option>
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>Batal</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Simpan</button>
                            ) : (
                                <button type="submit" className="btn loading">Menyimpan...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateUser;
