import '../styles/Admin.css'

import { BsBagCheck } from "react-icons/bs";
import { GoPlusCircle } from "react-icons/go";
const SignIn = () =>{





    return(
        <div className='Admin-Container'>
            <div className='Options-Box'>

                <a href='/ProductsAdd' className='Admin-Tile'>
                        <p className='Tile-Icon'>
                            <BsBagCheck />
                        </p>
                        <p className='Tile-Description'>Add & Edit Products</p>
                </a>
                <a href='/Orders' className='Admin-Tile'>

                    <p className='Tile-Icon'>
                        <GoPlusCircle/>
                    </p>
                    <p className='Tile-Description'>Show All Orders</p>
                </a>
            </div>
        </div>
    )
}


export default SignIn;