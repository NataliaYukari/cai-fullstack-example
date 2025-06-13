import React, { useState } from 'react';

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 

  const handleSubmit = async (event) => { 
    event.preventDefault(); 

    try {
      const response = await fetch("http://localhost:8080/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      if (response.ok) {
        setMessage("Novo usuário criado com sucesso!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        const errorData = await response.json();
        setMessage(`Falha ao criar novo usuário: ${errorData.error || response.statusText}`);
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      setMessage("Erro de conexão. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Create new user</h2>
          {message && (
            <div className={`alert ${message.includes("sucesso") ? "alert-success" : "alert-danger"}`} role="alert">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                value={name}
                onChange={(e) => setName(e.target.value)} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputPassword5" className="form-label">Password</label>
              <input
                type="password"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}