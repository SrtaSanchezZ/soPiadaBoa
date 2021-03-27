//#region Dependências
import React from "react";
import logo from '../assets/img/emojione_studio-microphone.png';
import ha from '../assets/img/HA.png';
import ha2 from '../assets/img/HA-1.png';
import ha1 from '../assets/img/HA-2.png';
import ha3 from '../assets/img/HA-3.png';
//#endregion
const Home = () => {
    //#region Funções
    const handleClick = () =>{
        window.location = '/piadas';
    };
    //#endregion
    return(
        <div align="center" className="bkDrapery">            
            <div className="rtHome">
                <div style={{ marginTop:'70px' }}>
                    <div className="ha">
                        <img src={ha} alt="HA" />
                    </div>
                    <div className="ha1">
                        <img src={ha1} alt="HA" />
                    </div>
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="ha2">
                        <img src={ha2} alt="HA" />
                    </div>
                    <div className="ha3">
                        <img src={ha3} alt="HA" />
                    </div>
                </div>
                <div style={{ marginTop:'54.88px' }}>
                    <h1>SÓ <span style={{color:'#cd1d2f'}}>PIADA</span> BOA</h1>
                    <div className="txHome">
                        <p>
                            Participe da maior comunidade de piadistas do Brasil. Vote nas piadas de outros usuários e cadastre suas as suas próprias.
                        </p> 
                        <br/>
                        <span style={{ color:'#0a325e', fontWeight:'800' }}>Só não vá morrer de rir! kkk</span>
                    </div>
                </div>
                <div style={{ marginTop:'190px'}}>
                    <div className="mic">
                    </div>
                </div>
                <button className="btNext" onClick={()=>handleClick()}>Começar</button>
            </div>
        </div>
    );
}
export default Home;