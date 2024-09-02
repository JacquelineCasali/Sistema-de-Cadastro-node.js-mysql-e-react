import React, { useState ,useContext} from "react";
import styles from "./Hearder.module.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../../context/auth";

function Hearder() {
  const {user,logout} = useContext(AuthContext)
   
  const handleLogout= ()=>{
    console.log('sair')
    logout();
  }
  
  //mostrar ou nao menu
    const [menu, setMenu] = useState(false);
    // //  mudança de menu
    const click = () => {
      setMenu(!menu);
    };
  return (
    <header className={styles.header}>
        <span>Sistema de Contato</span>
      

        <nav className={`${styles.menuSandwich} ${menu ? styles.show : ""} `} onClick={click} >
       
        {(user?.email)?
     <Link className={styles.a} to={`/${user?.id}`}>
     Usuário</Link>:
<Link className={styles.a} to={`/cadastro`}>
          Cadastro Usuario</Link>
          }
       
        <Link  className={styles.a} to={`/${user?.id}/contato`}>Contato</Link>
    



{/* <Link className={styles.a} to={`/login`}>
         
         
          Login</Link> */}
      </nav>

          
          
      {(user?.email)?
      <h3>Olá {(user?.email)}!</h3>:""}

     {/* botao responsivo */}
   
     <div className={styles.hamburger} onClick={click}>
     
     <FaBars size={20} style={{ color: "black"}} />
   
   </div>
   
   
   {(user?.email)?
   <button className={styles.btn} onClick={handleLogout}>Sair</button>
:
<button className={styles.btn}>
  <Link className="link" to='/'>
  Login </Link>
  </button>
 
  }

  

    </header>
  );
}

export default Hearder;
