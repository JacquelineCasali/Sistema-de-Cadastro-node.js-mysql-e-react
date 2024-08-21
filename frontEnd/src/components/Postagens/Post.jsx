
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Card() {

  const [data, setData] = useState([]);
  useEffect(() => {
   
    axios
      .get(["http://localhost:3005/post"])
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);





  return (
    <div className="container">
      
        {/* filtro */}

        <h2 className="h2">Postagens</h2>
     
      
      <div className="card-grid">
        {data.map((post, index) => (
        // <Link  to={`/${menbro.id}`}>
       <div className="cards" key={index}>
            <img src={post.imagen} />
          
            <h5 className="texto">{post.title}</h5>           

            <div className="card-item">
           
              <p className="texto">
            {post.description}
                  </p> 

                  </div>

  
               
            
          </div>
          
          // </Link>
        ))}
      </div>

    
    </div>
  );
}
