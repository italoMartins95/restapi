import Styles from './FormLoggin.module.css'

import {Formik , Form , Field , ErrorMessage} from 'formik';
import * as yup from 'yup'
import Axios from 'axios'

import {useEffect, useState} from 'react'

function FormLoggin({data , cadastrarNovo}){

    const [dataCars , setDataCars] = useState()

    useEffect(() => {
        data(dataCars)
    } , [dataCars])

    function runLogin(values){
        Axios.post('http://localhost:3001/login' , {
            email: values.email,
            password: values.password
        }).then(response => {
            console.log(response)
            if(response.data.msg == "Usuário não encontrado"){
                window.alert("Usuário não encontrado")
            }else{
                setDataCars(response.data)
            }
        })
    }

    function newUser(){
        cadastrarNovo()
    }

    const validationLogin = yup.object().shape({
        email: yup.string().email(`Email inválido!`).required(`Campo obrigatório!`),
        password: yup.string().min(8 , `Senha com 8 caracteres.`).required(`Campo obrigatório!`)
    })

    return(
        <Formik initialValues={{}} onSubmit={runLogin} validationSchema={validationLogin}>
            <Form className={Styles.loginForm}>
                <h1>Login</h1>
                <div className={Styles.formGroup}>
                    <Field name='email' className={Styles.formField} placeholder='Email'/>
                    <ErrorMessage component='span' name='email' className={Styles.formError}/>
                </div>
                <div className={Styles.formGroup}>
                    <Field name='password' type='password' className={Styles.formField} placeholder='Senha'/>
                    <ErrorMessage component='span' name='password' className={Styles.formError}/>
                </div>
                <div className={Styles.buttons}>
                    <button type='button' onClick={newUser} className={Styles.button}>New user</button>
                    <button type='submit' className={Styles.button}>Sign in</button>
                </div>
            </Form>
        </Formik>
    )
}

export default FormLoggin