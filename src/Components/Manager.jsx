import React, { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import logo2 from '../assets/logo-2.png';
import show from '../assets/show.svg';
import unshow from '../assets/unshow.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

    const [visibility, setvisibility] = useState(false)
    const [form, setform] = useState({siteUrl: "", uname: "", upass: "" })
    const [forms, setforms] = useState([])
    const save=useRef()
    const source=useRef()
    const toastId1 = uuidv4();
    const toastId2 = uuidv4();
    const toastId3 = uuidv4();
    const toastId4 = uuidv4();

    const getPassword = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_Site_Uri);
            if (!response.ok) {
                throw new Error('Failed to fetch passwords');
            }
            const data = await response.json();
            setforms(data);
        } catch (error) {
            console.error('Error fetching passwords:', error);
        }
    };
    
    

    useEffect(() => {
      getPassword()
    }, [])
    const isFormValid = () => {
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        const usernamePattern = /^(?!\d)[A-Za-z_]{3,}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    
        const isSiteUrlValid = urlPattern.test(form.siteUrl.trim());
        const isUsernameValid = usernamePattern.test(form.uname.trim());
        const isPasswordValid = passwordPattern.test(form.upass.trim());
    
        return !isSiteUrlValid || !isUsernameValid || !isPasswordValid;
    };        
    const passref = useRef()
    const toggelVisibility = () => {
        setvisibility(!visibility)
        passref.current.type = visibility ? 'password' : 'text'
    }
    const savePassword = async () => {
    try {
        // Send POST request to save the password
        const response = await fetch(import.meta.env.VITE_Site_Uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...form, id: uuidv4() })
        });

        if (!response.ok) {
            throw new Error('Failed to save password');
        }

        // Fetch updated data from the server
        await getPassword();
        
        if (!toast.isActive(toastId1)) {
            toast('🫡 Password Saved Successfully !!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: toastId1,
            });
        }

        // Reset form state
        setform({ siteUrl: "", uname: "", upass: "" });
    } catch (error) {
        console.error('Error saving password:', error);
        toast.error('❌ Failed to save password');
    }
};

    
    const deletePassword = async (id) => {
        if (!toast.isActive(toastId2)) {
            toast(
                ({ closeToast }) => (
                    <div className='text-center'>
                        🥺 Are you sure you want to delete this password?
                        <div className="toast-confirm-buttons flex justify-evenly">
                            <button className='px-3 text-white mt-2 bg-red-700 border-1 border-slate-400 rounded-lg bg-slate-200'
                                onClick={async () => {
                                    try {
                                        // Send DELETE request to remove the data
                                        const response = await fetch(import.meta.env.VITE_Site_Uri, { 
                                            method: "DELETE", 
                                            headers: { "Content-Type": "application/json" }, 
                                            body: JSON.stringify({ id }) 
                                        });
    
                                        if (!response.ok) {
                                            throw new Error('Failed to delete the password');
                                        }
    
                                        // Fetch updated data from the server
                                        await getPassword();
                                        
                                        toast.success('😒  Deleted Successfully!');
                                    } catch (error) {
                                        console.error('Error deleting password:', error);
                                        toast.error('❌ Failed to delete password');
                                    } finally {
                                        closeToast(); // Close the confirmation toast
                                    }
                                }}
                            >
                                Yes
                            </button>
                            <button className='px-3 text-white mt-2 bg-green-700 border-1 border-slate-400 rounded-lg bg-slate-200' onClick={closeToast}>No</button>
                        </div>
                    </div>
                ),
                {
                    position: "top-right",
                    autoClose: false, // Disable auto-close for the confirmation
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    theme: "light",
                    toastId: toastId2,
                }
            );
        }
    };
    
    
    
    const editPassword = async (id) => {
        // First, populate the form with the selected password's data
        const passwordToEdit = forms.find(item => item.id === id);
        setform({...passwordToEdit, id: id});
        setforms(forms.filter(item => item.id !== id)); // Remove the selected password from the forms state
    
        // Now, delete the selected password from the database
        try {
            const response = await fetch(import.meta.env.VITE_Site_Uri, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id }),
            });
            if (!response.ok) {
                throw new Error("Failed to delete password");
            }
            if (!toast.isActive(toastId4)) {
                toast('🤞 Update Your Password !!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    toastId: toastId4,
                });
            }
        } catch (error) {
            console.error('Failed to delete password:', error);
            toast.error('Failed to delete password');
        }
    }
    
    
    
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copy = (item) => {
        if(!toast.isActive(toastId3)){
            toast('©️ Copied to Clipboard!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId:toastId3,
            });
        }
        navigator.clipboard.writeText(item)
    }



    return (
        <>
            <ToastContainer />
            <div className=" Manager-container custom-md:flex custom-md:justify-center  m-5 p-5">
                <div className="absolute inset-0 -z-10  w-full">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
                </div>
                <div className="Manager-pass space-y-5 xl:w-4/6  my-12">
                    <div className="heading flex flex-col items-center space-y-5">
                        <div className="relative inline-block group">
                            <img className="w-32" src={logo2} alt="passVault-logo" />
                            <div className="absolute bottom-[-10px] left-0 w-full h-1 bg-green-300 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                        </div>
                        <div className='text-center'>Your Digital Fortress for Secure Passwords.</div>
                    </div>
                    <div className='pass-input space-y-5 relative w-full m-auto '>
                        <input onChange={handleChange} value={form.siteUrl} name="siteUrl" className='rounded-md py-1 px-4 border w-full border-green-900' type="url" placeholder='Enter URL (e.g., https://example.com)' pattern="https://.+" required />
                        <div className="pass-input-wrapper flex flex-col gap-2.5  sm:flex-row  sm:gap-5">
                            <input onChange={handleChange} value={form.uname} name="uname" className='rounded-md py-1 px-4 border w-full border-green-900' type="text" placeholder='Username (min 3 chars, letters or underscores)' pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$" required />
                            <div className='input-Wrapper'></div>
                            <input value={form.upass} name="upass" onChange={handleChange} ref={passref} className='rounded-md py-1 px-4 border w-full border-green-900' type="password" placeholder='Password (8+ chars, upper, lower, number, special)' required />
                            <span className='absolute right-1 bottom-1 cursor-pointer' onClick={toggelVisibility}>
                                <img className="w-6" src={visibility ? show : unshow} alt="show" />
                            </span>
                        </div>
                    </div>
                    <div className="submit flex justify-center">
                        <button  disabled={isFormValid()} onClick={savePassword} className="disabled:opacity-50 disabled:cursor-not-allowed  relative rounded-md py-1 px-4 border border-green-900 overflow-hidden group">
                            <span className="relative flex items-center  z-10">
                                <lord-icon ref={source} src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                                <span ref={save}> Add Password</span>
                            </span>
                            <div className="absolute inset-0 bg-green-300 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                        </button>
                    </div>
                    <div className='font-bold text-pretty text-center custom-md:text-left text-xl'><h2>Your Passwords</h2></div>
                    {forms.length == 0 && <div className=' text-pretty text-lg text-center'><h3>No Password to Show !!</h3></div>}
                    {forms.length != 0 && <div className="relative  mx-auto w-full overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full  text-sm text-left rtl:text-right">
                            <thead className="text-xs uppercase  dark:bg-green-800 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Site URL
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Password
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {forms.map((item) => {
                                    return <tr key={item.id} className="relative dark:bg-green-50 dark:border-gray-700 overflow-hidden group">
                                        <td scope="row" className="px-6 py-4 whitespace-nowrap relative z-10">
                                            <div className='flex items-center cursor-pointer '>
                                                <div className='min-w-48  '><a href={item.siteUrl} target='_blank'>{item.siteUrl}</a></div>
                                                <div><lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ height: '15px' }}
                                                    onClick={() => { copy(item.siteUrl) }}
                                                >
                                                </lord-icon></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 relative z-10">
                                            <div className="flex item-centercursor-pointer ">
                                                <div className='min-w-28'>{item.uname}</div>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ height: '15px' }}
                                                    onClick={() => { copy(item.uname) }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 relative z-10">
                                            <div className="flex item-centercursor-pointer ">
                                                <div className='min-w-36'>{"*".repeat(item.upass.length)}</div>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ height: '15px' }}
                                                    onClick={() => { copy(item.upass) }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 relative z-10">
                                            <div className="flex item-centercursor-pointer ">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wkvacbiw.json"
                                                trigger="hover"
                                                style={{ height: '15px' }}
                                                onClick={()=>{editPassword(item.id)}}
                                                >
                                            </lord-icon>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ height: '15px' }}
                                                onClick={()=>{deletePassword(item.id)}}
                                                >
                                            </lord-icon>
                                            </div>
                                        </td>
                                        <div className="absolute inset-0 bg-green-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </div>
        </>
    )
}


export default Manager;