import React, { useReducer } from 'react'
import { ActionType, initialState, loginReducer } from '../state/reducer/loginReducer';

const Login = () => {
    const [state, dispatch] = useReducer(loginReducer, initialState);

    const { username, password, isLoading, error, isLoggedIn } = state;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: ActionType.LOGIN });
        try {
            await login({ username, password });
            dispatch({ type: ActionType.SUCCESS });
        } catch (error) {
            dispatch({ type: ActionType.ERROR });
        }
    }
    return (
        <div className='App'>
            <div className='login-container'>
                {isLoggedIn ? (
                    <>
                        <h1>Welcome {username}!</h1>
                        <button onClick={() => dispatch({ type: ActionType.LOGOUT })}>
                            Log Out
                        </button>
                    </>
                ) : (<div>
                    <form className='form' onSubmit={onSubmit}>
                        {error && <p className='error'>{error}</p>}
                        <p>Please Login!</p>
                        <input
                            type='text'
                            placeholder='username'
                            value={username}
                            onChange={(e) =>
                                dispatch({
                                    type: ActionType.FIELD,
                                    fieldName: 'username',
                                    payload: e.currentTarget.value,
                                })
                            }
                        />
                        <input
                            type='password'
                            placeholder='password'
                            autoComplete='new-password'
                            value={password}
                            onChange={(e) =>
                                dispatch({
                                    type: 'field',
                                    fieldName: 'password',
                                    payload: e.currentTarget.value,
                                })
                            }
                        />
                        <button className='submit' type='submit' disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                </div>)
                }
            </div>
        </div>
    )
}

export default Login
