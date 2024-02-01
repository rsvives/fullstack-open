const LoginForm = ({ user, pwd, submitAction }) => {
  const { username, handleUsernameChange } = user
  const { password, handlePasswordChange } = pwd

  return (
    <form onSubmit={submitAction}>
        <label htmlFor="username">username:</label><br />
        <input type="text" id="username" value={username} onChange={handleUsernameChange}/>
        <br /><br />
        <label htmlFor="password">password:</label><br />
        <input type="password" id="password"value={password} onChange={handlePasswordChange}/>
        <br /><br />
        <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
