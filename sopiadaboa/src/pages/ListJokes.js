//#region Dependências
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, Box, Dialog, DialogContentText } from '@material-ui/core';
//#endregion
const ListJokes = () => {
    //#region Variveis de Estado e Array
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
        arr.map((item) => ({ 
            id: item.id, description: item.description, 
            uname: item.user.name, likes: item.likes, 
            dislike: item.dislike, created: item.created 
        }));
    //#endregion
    //#region Componentes de Função e Efeito
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
    const handleClick = () =>{
        window.location = '/novapiada';
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
    const handleAlterLike = () =>{
        axios
        .patch('http://localhost:3000/jokes/'+id,{
            likes: like + 1
        })
        .then((res) => {          
            handleLoad();
            setLike(like + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    };    
    const handleAlterDisLike = () =>{
        axios
        .patch('http://localhost:3000/jokes/'+id,{
            dislike: dlike + 1
        })
        .then((res) => {          
            handleLoad();
            setDlike(dlike + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    useEffect(() => {
        handleLoad();
        // eslint-disable-next-line
    },[]);
    //#endregion
    return(           
        <div align="center" className="rtLJokes">
            <Box className="bxBrJ0" p={1} m={1} >
                <Box p={1} flexGrow={2} className="bxBrJ1" >
                    <input type="text" placeholder="Pesquisar piada" className="brJSearch" style={{ backgroundColor:'#E9E4DA' }} />
                </Box>
                <Box p={1} flexGrow={2} display="flex" className="bxBrJ2" >
                    <Box p={1} flexGrow={2} style={{ width:'50%', height:'100%' }} >
                        <input type="text" placeholder="Ordenar" className="brJOrder" style={{ backgroundColor:'#E9E4DA' }} />
                    </Box>
                    <Box p={1} flexGrow={2} style={{ width:'50%', height:'100%' }}>
                        <input type="button" value="Criar piada" className="brJBtCreate" style={{ color:'#FFFFFF' }} onClick={()=>handleClick()} />
                    </Box>                        
                </Box>
            </Box>
            <List className="listJ" > 
                {jokes.map((item, index) =>(  
                    <React.Fragment>
                        <ListItem align="center">
                            <Box display="block" m={1} className="cardJokes" onClick={()=>handleOpen(item.id, index + 1, item.description, item.uname, item.likes, item.dislike, item.created)}>
                                <Box className="bxLtJ0" p={1} m={1} >
                                    <Box p={1} flexGrow={1} className="bxLtJ1">
                                        <h2 style={{ marginTop:'-10px', color:'#cd1d2f' }}>Piada {index + 1}</h2>
                                    </Box>
                                    <Box p={1} flexGrow={1} className="bxLtJ2">
                                        <span className="dtCJ">
                                            {(item.created.slice(0,10).split('-').reverse().join()).replace(/,/g,'/')}
                                        </span>
                                    </Box>
                                </Box>
                                <Box className="bxJoke" >
                                    <p>
                                        {item.description}
                                    </p>
                                </Box>
                                <Box display="flex" p={1} m={1} style={{ width:'100%', height:'30px', marginTop:'20px' }}>
                                    <Box p={1} m={1} flexGrow={2} display="flex" style={{ width:'50%', marginTop:'-8px' }}>
                                        <Box p={1} flexGrow={1} className="bxLrJ1" >
                                            <span className="uJName">
                                                {item.uname}
                                            </span>
                                        </Box>
                                        <Box p={1} m={1} flexGrow={2} className="bxLrJ2" style={{ marginTop:'-8px' }} >
                                            <Box p={1} flexGrow={2} style={{ width:'50%' }}>
                                                <input type="button" value={item.likes} className="lkJ" />
                                            </Box>
                                            <Box p={1} flexGrow={2} style={{ width:'50%' }}>
                                                <input type="button" value={item.dislike} className="dkJ" />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box p={1} flexGrow={3} className="bxLrJ3" >
                                        <span className="dtCJ">
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
                <DialogContentText className="dialogJ" >
                    <Box className="bxLtJ0" p={1} m={1} style={{ marginBottom:'20px' }} >
                        <Box p={1} flexGrow={1} className="bxLtJ1">
                            <h2 style={{ marginTop:'-10px', color:'#cd1d2f' }}>Piada {title}</h2>
                        </Box>
                        <Box p={1} flexGrow={1} className="bxLtJ2">
                            <span className="dtCJ">
                                {(date.slice(0,10).split('-').reverse().join()).replace(/,/g,'/')}
                            </span>
                        </Box>
                    </Box>
                    <Box className="dialogTJ" style={{ marginTop:'-20px' }} >
                        <p>
                            {description}
                        </p>
                    </Box>
                    <Box display="flex" p={1} m={1} style={{ height:'30px', marginTop:'20px' }}>
                        <Box p={1} m={1} flexGrow={2} display="flex" style={{ width:'50%', marginTop:'-8px' }}>
                            <Box p={1} flexGrow={1} style={{ width:'50%' }}>
                                <span className="uJName">
                                    {name}
                                </span>
                            </Box>
                            <Box display="flex" p={1} m={1} flexGrow={2} style={{ width:'50%', marginTop:'-8px' }}>
                                <Box p={1} flexGrow={2} style={{ width:'50%' }}>
                                    <input type="button" value={like} className="lkJ" />
                                </Box>
                                <Box p={1} flexGrow={2} style={{ width:'50%' }}>
                                    <input type="button" value={dlike} className="dkJ" />
                                </Box>
                            </Box>
                        </Box>
                        <Box p={1} flexGrow={3} className="bxLrJ3" style={{ marginRight:'-20px' }}>
                            <span className="dtCJ">
                                Publicada em {(date.slice(0,10).split('-').reverse().join()).replace(/,/g,'/')}
                            </span>
                        </Box>
                    </Box>
                    <hr className="line"/>
                    <div align="center">
                        <Box display="flex" p={1} m={1} flexGrow={2} className="dialogOp" >
                            <Box p={1} flexGrow={2} style={{ width:'50%' }}>
                                <input type="button" value="Chorei" className="dialoglkJ" style={{ backgroundColor:'#1DCC4D'}} onClick={()=>handleAlterLike()} />
                            </Box>
                            <Box p={1} flexGrow={2} style={{ width:'50%' }}>
                                <input type="button" value="Nem ri" className="dialogdkJ" style={{ backgroundColor:'#C8051B' }} onClick={()=>handleAlterDisLike()} />
                            </Box>
                        </Box>
                    </div>
                </DialogContentText>
            </Dialog>
        </div>
    );
}
export default ListJokes;