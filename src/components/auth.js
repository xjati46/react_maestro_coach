import React, { useState, useEffect, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import logo from '../mswim.png'
import API from '../api_service'
import { useCookies } from 'react-cookie'
import { ReducerContext } from '../index'
import { StateContext } from '../index'

function Auth() {

  const dispatch = useContext(ReducerContext)
  const state = useContext(StateContext)

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ token, setToken ] = useCookies(['msms-cookie'])

  const loginClicked = e => {
    e.preventDefault()
    API.loginUser({username, password})
    .then( resp => {
      dispatch({type: 'setUserId', payload: resp.user_id})
      dispatch({type: 'setUserName', payload: resp.user_name})
      localStorage.setItem('userId', JSON.stringify(resp.user_id))
      localStorage.setItem('userName', JSON.stringify(resp.user_name))
      setToken('msms-cookie', resp.token)
    })
    .catch( error => console.log(error))
  }

  useEffect(() => {
    if(token['msms-cookie'] && state.userId && state.userName) {
      window.location.href = '/admin'
    };
  }, [token])

  return (
    <div className='text-center mt-5'>
      <main className='form-signin'>
        <img className="mb-4" src={logo} alt="logo" height='200'/>
        <h1 className="h3 mb-3 fw-normal">Management System</h1>
        <Form onSubmit={loginClicked}>
          <Form.Group className='form-floating'>
            <Form.Control type="text" placeholder='Username' id='username' value={username} onChange={evt => setUsername(evt.target.value)} />
          </Form.Group>
          <Form.Group className='form-floating'>
            <Form.Control type="password" placeholder='Password' id='password' value={password} onChange={evt => setPassword(evt.target.value)} />
          </Form.Group>
          <Button variant="success" type='submit'>
            LOGIN
          </Button>
        </Form>
      </main>
      <footer className="mt-4 text-secondary">
        <p>&copy; Maestro Bisa | 2021</p>
      </footer>
    </div>
  )
}


export default Auth
