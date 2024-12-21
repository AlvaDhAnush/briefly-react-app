import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-black text-[#f9f2ec] p-2 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Website title */}

                <div className=' items-end'>
                    <h1 className="text-[40px] text-[#f9f2ec] font-roboto font-bold"><span className='text-[60px]'>.</span>Briefly</h1>
                    <p className='text-sm font-roboto mt-[-20px]'>All you need to know, briefly.</p>
                </div>

                {/* Navigation links */}
                <div>
                    <Link className="mr-4 hover:border-b-2"  to="/">Home</Link>
                    <Link className="mr-4 hover:border-b-2"  to="/headlines">Headlines</Link>
                    <Link className="hover:border-b-2" to="/preferences">Preferences</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;