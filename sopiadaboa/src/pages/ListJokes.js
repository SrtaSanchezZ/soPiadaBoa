import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridList, Box } from '@material-ui/core';

const ListJokes = () => {
    const [jokes, setJokes] = useState([]);

    const ArrJokes = (arr) =>
        arr.map((item) => ({ id: item.id, description: item.description, 
                             uname: item.user.name, uemail: item.user.email, 
                             likes: item.likes, dislike: item.dislike, 
                             created: item.created }));
    
    const handleLoad = () =>{
      axios
      .get('http://localhost:3000/jokes')
      .then((res) => {
        setJokes(ArrJokes(res.data));
      })
      .catch((error) => {
        console.log(error);
      });      
    };
    useEffect(() => {
        handleLoad();
        // eslint-disable-next-line
    },[]);

    return(
        <div align="center" className="bkDrapery">            
            <div className="rtLJokes">
                <GridList display="flex" cellHeight={200} style={{ width:'900px', height:'600px', flexWrap:'wrap', justifyContent:'space-around', overflow:'hidden' }}>
                    {jokes.map((item, index) =>(
                        <React.Fragment>
                            <Box display="block" m={1} className="cardJokes">
                                <span>Piada {item.id}</span>
                                <Box>
                                    <span>{item.description}</span>
                                </Box>
                                <Box display="flex" p={1} m={1}>
                                    <Box p={1} flexGrow={2}>
                                        <span>
                                            {item.uname}
                                        </span>
                                    </Box>
                                    <Box p={1} flexGrow={2}>
                                        <span>
                                            {item.likes}
                                        </span>
                                        <span>
                                            {item.dislike}
                                        </span>
                                    </Box>
                                    <Box p={1} flexGrow={2}>
                                        <span>
                                            {item.created}
                                        </span>
                                    </Box>
                                </Box>
                            </Box>
                        </React.Fragment>
                    ))}
                </GridList>
            </div>
        </div>
    );
}
export default ListJokes;