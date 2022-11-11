import Styles from './FormCadastro.module.css'

import {Formik , Form , Field , ErrorMessage} from 'formik';
import * as yup from 'yup'
import Axios from 'axios'

function FormCadastro({backToLogin}){

    function handleCadastro(values){
        Axios.post('http://localhost:3001/cadastro' , {
            email: values.emailCadastro,
            password: values.passwordCadastro
        }).then(response => {
            console.log(response)
            if(response.data.msg == "Usuário já cadastrado"){
                window.alert("Usuário já cadastrado")
                back()
            }else{
                window.alert("Usuário cadastrado!")
                back()
            }
        })
    }

    const validationCadastro = yup.object().shape({
        emailCadastro: yup.string().email(`Email inválido!`).required(`Campo obrigatório!`),
        passwordCadastro: yup.string().min(8 , `Senha com 8 caracteres.`).required(`Campo obrigatório!`),
        passwordConfirm: yup.string().oneOf([yup.ref('passwordCadastro')] , "Senhas não batem!")
    })

    function back(){
        backToLogin()
    }

    return(
        <Formik initialValues={{}} onSubmit={handleCadastro} validationSchema={validationCadastro}>
                    <Form className={Styles.loginForm}>
                        <h1>Sign up</h1>
                        <div className={Styles.formGroup}>
                            <Field name='emailCadastro' className={Styles.formField} placeholder='Email'/>
                            <ErrorMessage component='span' name='emailCadastro' className={Styles.formError}/>
                        </div>
                        <div className={Styles.formGroup}>
                            <Field name='passwordCadastro' type='password' className={Styles.formField} placeholder='Senha'/>
                            <ErrorMessage component='span' name='passwordCadastro' className={Styles.formError}/>
                        </div>
                        <div className={Styles.formGroup}>
                            <Field name='passwordConfirm' type='password' className={Styles.formField} placeholder='Confirmar senha'/>
                            <ErrorMessage component='span' name='passwordConfirm' className={Styles.formError}/>
                        </div>
                        <div className={Styles.buttons}>
                            <button type='button' onClick={back} className={Styles.button}>Previus</button>
                            <button type='submit' className={Styles.button}>Let's go</button>
                        </div>
                    </Form>
                </Formik>
    )
}

export default FormCadastro