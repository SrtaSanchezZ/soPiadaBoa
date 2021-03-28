import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, Box, Button, Dialog, DialogActions, DialogContentText } from '@material-ui/core';

const ListJokes = () => {
    const [jokes, setJokes] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [like, setLike] = useState(0);
    const [dlike, setDlike] = useState(0);
    const [date,  setDate] = useState("");

    const ArrJokes = (arr) =>
        arr.map((item) => ({ id: item.id, description: item.description, 
                             uname: item.user.name, uemail: item.user.email, 
                             likes: item.likes, dislike: item.dislike, 
                             created: item.created }));
    
    const handleOpen = (id, tit, desc, nam, lik, dis, dt) => {
        setOpen(true);
        setId(id);
        setTitle(tit);
        setDescription(desc);
        setName(nam);
        setLike(lik);
        setDlike(dis);
        setDate(dt);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
        <div align="center" className="rtLJokes">
            <Box display="flex" p={1} m={1} >
                <Box p={1} flexGrow={2} style={{ width:'50%', height:'40px' }} >
                    <input type="text" placeholder="Pesquisar piada" className="brJSearch" style={{ backgroundColor:'#E9E4DA' }} />
                </Box>
                <Box p={1} flexGrow={2} display="flex" style={{ width:'50%', height:'40px', marginTop:'-8px' }} >
                    <Box p={1} flexGrow={2} style={{ width:'50%', height:'100%' }} >
                        <input type="text" placeholder="Ordenar" className="brJOrder" style={{ backgroundColor:'#E9E4DA' }} />
                    </Box>
                    <Box p={1} flexGrow={2} style={{ width:'50%', height:'100%' }}>
                        <input type="button" value="Criar piada" className="brJBtCreate" style={{ color:'#FFFFFF' }} />
                    </Box>                        
                </Box>
            </Box>
            <List style={{ width:'900p', height:'500px', overflow:'auto' }} > 
                {jokes.map((item, index) =>(  
                    <React.Fragment>
                        <ListItem align="center">
                            <Box display="block" m={1} className="cardJokes" onClick={()=>handleOpen(item.id, index + 1, item.description, item.uname, item.likes, item.dislike, item.created)}>
                                <h2 style={{ marginTop:'-10px', color:'#cd1d2f' }}>Piada {index + 1}</h2>
                                <Box className="txJoke" style={{ marginTop:'-20px' }} >
                                    <p>
                                        {item.description}
                                    </p>
                                </Box>
                                <Box display="flex" p={1} m={1} style={{ width:'100%', height:'30px', marginTop:'30px' }}>
                                    <Box p={1} m={1} flexGrow={2} display="flex" style={{ width:'50%', marginTop:'-8px' }}>
                                        <Box p={1} flexGrow={1} style={{ width:'50%' }}>
                                            <span className="uJName">
                                                {item.uname}
                                            </span>
                                        </Box>
                                        <Box p={1} m={1} flexGrow={2} display="flex" style={{ width:'50%', marginTop:'-8px' }}>
                                            <Box p={1} flexGrow={2} style={{ width:'50%' }}>
                                                <input type="button" value={item.likes} className="lkJ" />
                                            </Box>
                                            <Box p={1} flexGrow={2} style={{ width:'50%' }}>
                                                <input type="button" value={item.dislike} className="dkJ" />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box p={1} flexGrow={3} style={{ width:'50%' }} className="dtCJ">
                                        <span>
                                            Publicada em {(item.created.slice(0,10).split('-').reverse().join()).replace(/,/g,'/')}
                                        </span>
                                    </Box>
                                </Box>
                            </Box>
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
            <Dialog open={open} onClose={()=>handleClose()} >
                <DialogContentText className="dialogJ" style={{ padding:'30px', marginRight:'-50px' }}>
                    <h2 style={{ marginTop:'-10px', color:'#cd1d2f' }}>Piada {title}</h2>
                    <Box className="txJoke" style={{ width:'80%', marginTop:'-20px' }} >
                        <p>
                            {description}
                        </p>
                    </Box>
                    <Box display="flex" p={1} m={1} style={{ width:'80%', height:'30px', marginTop:'30px' }}>
                        <Box p={1} m={1} flexGrow={2} display="flex" style={{ width:'50%', marginTop:'-8px' }}>
                            <Box p={1} flexGrow={1} style={{ width:'50%' }}>
                                <span className="uJName">
                                    {name}
                                </span>
                            </Box>
                            <Box p={1} m={1} flexGrow={2} display="flex" style={{ width:'50%', marginTop:'-8px' }}>
                                <Box p={1} flexGrow={2} style={{ width:'50%' }}>
                                    <input type="button" value={like} className="lkJ" />
                                </Box>
                                <Box p={1} flexGrow={2} style={{ width:'50%' }}>
                                    <input type="button" value={dlike} className="dkJ" />
                                </Box>
                            </Box>
                        </Box>
                        <Box p={1} flexGrow={3} style={{ width:'50%' }} className="dtCJ">
                            <span>
                                Publicada em {(date.slice(0,10).split('-').reverse().join()).replace(/,/g,'/')}
                            </span>
                        </Box>
                    </Box>
                </DialogContentText>
            </Dialog>
        </div>
    );
}
export default ListJokes;