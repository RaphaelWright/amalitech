import { useState } from "react";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response  = await fetch('https://user-auth-server.onrender.com/api/v1/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({firstName, lastName, email, password}),
    });

    const data = await response.json();

    if (!response.ok) {
      throw  new Error(data.message || 'Signup Failed');
    } 
    } catch (err) {
      setError(err.message || 'Signup was not successful');
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className = "flex justify-center mt-48 ">
      
      <form onSubmit={handleSubmit} className="w-auto border-orange-400 border p-7">
        <h1 className=" flex justify-center font-bold text-xl mb-2">Sign Up</h1>
        <p>
          <label>First Name</label><br></br>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border "
          />
        </p>
        
        <p>
          <label>Last Name</label><br />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border "
          />
        </p>
        
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

        <button type="submit" className="w-full border px-10 my-5 bg-orange-400 hover:border hover:border-orange-400 hover:bg-white">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
