'use client'
import { SyntheticEvent ,useState } from 'react'
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const AddUser = () => {
    const [nama, setNama] = useState("");
    const [npm, setNpm] = useState("");
    const [matkul, setMatkul] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    async function handleSubmit(e:SyntheticEvent){
        e.preventDefault();
        setIsMutating(true);
        await fetch("http://localhost:5000/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama: nama,
                npm: npm,
                matkul: matkul
            })
        });
        
        setIsMutating(false);

        setNama("");
        setNpm("");
        setMatkul("");
        router.refresh()
        setModal(false);
    }
    function handleChange(){
        setModal(!modal)
    }
    
    return (
    <>  
        <button className="btn bg-blue-500 text-white" onClick={handleChange}>
        <FontAwesomeIcon icon={faUserPlus} className="" />    
        Tambah Data
        </button>
        <input type="checkbox" checked={modal} onClick={handleChange} className="modal-toggle"/>
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center">Tambah Data Mahasiswa</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Nama Mahasiswa</label>
                            <input 
                            type="text" 
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="input w-full input-bordered" 
                            placeholder="nama lengkap"/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">NPM</label>
                            <input type="text" 
                            value={npm}
                            onChange={(e) => setNpm(e.target.value)}
                            className="input w-full input-bordered" 
                            placeholder="nomor pokok mahasiswa"/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Mata Kuliah</label>
                            <select 
                            className="select w-full input-bordered"
                            value={matkul}
                            onChange={(e) => setMatkul(e.target.value)}>
                                <option value="" disabled selected hidden></option>
                                <option value="Teknologi Informasi">Teknologi Informasi</option>
                                <option value="Budidaya Tanaman Perkebunan">Budidaya Tanaman Perkebunan</option>
                                <option value="Teknologi Sipil">Teknologi Sipil</option>
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>Batal</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Simpan</button>
                            ):(
                                <button type="submit" className="btn loading">Menyimpan...</button>
                            )}
                        </div>
                    </form>
            </div>
        </div>
    </>
    )
}

export default AddUser
