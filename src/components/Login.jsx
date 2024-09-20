import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className = "flex justify-center mt-48">
      
      <form onSubmit={handleSubmit}>
        <h1 className=" flex justify-center font-bold text-xl mb-2">Sign Up</h1>
 
        
        <p>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border"
          />
        </p>
        
        <p>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border "
          />
        </p>

        <button type="submit" className="border px-10 my-5 ">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
