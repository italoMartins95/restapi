import Styles from './Conteiner.module.css'

function Conteiner({props}){
    return(
        <div className={`${Styles.conteiner} ${Styles[props.customClass]}`}> 
            {props.children}
        </div>
    )
}

export default Conteiner