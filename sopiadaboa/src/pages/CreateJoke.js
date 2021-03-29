//#region Dependências
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Dialog, DialogContentText } from '@material-ui/core';
//#endregion
const CreateJoke = () => {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [email,  setEmail] = useState("");

    var msg = "";
    var user = [];
    var temail = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
    
    const handleOpen = (alert) => {
        setOpen(true);
        setAlert(alert);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = () =>{
        window.location = '/piadas';
    };

    const handleChange = (set) => (event) => set(event.target.value);
    
    const SubmitJoke = () => {
        
        if(name !== "" && name.length < 100){
            if(email !== "" && email.length < 100 && temail.test(email)){
                if(description !== "" && description.length < 601 ){
                    user = {
                        name: name,
                        email: email
                    }
                    var date = new Date().toLocaleString('pt-BR');
                    axios
                    .post('http://localhost:3000/jokes',{
                        user: user,
                        description: description,
                        created: date,
                        likes: 0,
                        dislike: 0,
                    })
                    .then((res) => {  
                        msg = "Piada salva com sucesso!";
                        handleOpen(msg);
    
                        handleClick();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }else{
                    msg = "Por favor, preencher uma piada de até 600 caracteres!";
                    handleOpen(msg);
                }
            }else{
                msg = "Por favor, preencher um e-mail válido de até 100 caracteres!";
                handleOpen(msg);
            }
        }else{
            msg = "Por favor, preencher um nome válido de até 100 caracteres!";
            handleOpen(msg);
        }        
    };

    return(           
        <div className="rtLJokes" >
            <form style={{ marginTop:'-20px', marginLeft:'-10px' }}>
                <h2 style={{ marginLeft:'20px', color:'#cd1d2f', fontSize:'30px' }}>Nova piada</h2>
                <Box className="bxCreate" p={1} m={1} >
                    <Box p={1} flexGrow={2} >
                        <label style={{ color:'#BAB6AE' }}>Nome: <br/>
                            <input 
                                type="text" maxLength="100" 
                                style={{ backgroundColor:'#E9E4DA' }} 
                                className="txCreate"
                                value={name}
                                onChange={handleChange(setName)} />
                        </label>
                    </Box>
                    <Box p={1} flexGrow={2} >
                        <label style={{ color:'#BAB6AE' }}>Email: <br/> 
                            <input 
                                type="text" maxLength="100" 
                                style={{ backgroundColor:'#E9E4DA' }} 
                                className="txCreate"
                                value={email}
                                onChange={handleChange(setEmail)} />
                        </label>
                    </Box> 
                </Box>
                <Box p={1} flexGrow={2} style={{ marginLeft:'10px' }}>
                    <label style={{ color:'#BAB6AE' }}>Piada: <br/>
                        <textarea 
                            type="text" maxLength="600"
                            style={{ backgroundColor:'#E9E4DA' }} 
                            className="txACreate"
                            value={description}
                            onChange={handleChange(setDescription)} />
                    </label>
                </Box>                
                <Box align="right" >
                    <input type="button" value="Cancelar" className="btCancelCreate" onClick={()=>handleClick()} />
                    <input type="button" value="Enviar piada" className="btCreate" onClick={()=>SubmitJoke()} />                        
                </Box>
            </form>
            <Dialog open={open} onClose={()=>handleClose()} >
                <DialogContentText style={{ width:'300px', height:'300px', padding:'20px'  }} >
                    <h2 style={{ color:'#cd1d2f' }}>Atenção!</h2>
                    <Box align="center">
                        <p style={{ height:'150px' }}>{alert}</p>
                        <hr className="line"/><br/>
                        <input type="button" value="Ok" style={{ width:'100px', height:'50px', backgroundColor:'#cd1d2f', color:'#FFFFFF', fontSize:'19px', borderRadius:'8px' }} onClick={()=>handleClose()} />
                    </Box>
                </DialogContentText>
            </Dialog>
        </div>
    );
}
export default CreateJoke;