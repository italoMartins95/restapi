import Styles from './App.module.css';

import FormCadastro from './forms/FormCadastro';
import FormLoggin from './forms/FormLoggin';
import Conteiner from './layout/Conteiner';

import {useState} from "react"

function App() {

  const [cadastrar , setCadastrar] = useState(false)
  const [dataCars , setDataCars] = useState()

  function newUser(){
    setCadastrar(!cadastrar)
  }

  return (
    <>
      {
        !dataCars ? (
        <>
          {
            <div className={Styles.startAplication}>
                {
                  !cadastrar ? (
                      <FormLoggin data={setDataCars}
                                  cadastrarNovo={newUser}/>
                    ):(
                      <FormCadastro backToLogin={newUser}/>
                    )
                }
            </div>
          }
        </>
        ):(
          <>
            {
              dataCars.map(car => (
                <Conteiner>

                </Conteiner>
              ))
            }
          </>
        )
      }
     
    </>
  );
}

export default App;
