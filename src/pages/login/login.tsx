import { useState } from "react";
import { User, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import "./Login.css";
import { useLoginMutation } from "../../hooks/useLoginMutation";
import { useGlobalMessage } from "../../context/MessageContext";

const LoginPage = () => {
  const { showMessage } = useGlobalMessage();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutateAsync, isPending } = useLoginMutation();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync({ username, password });
      showMessage("success", `Login successfully`);
    } catch (error) {
      // @ts-ignore
      showMessage("error", error?.response?.data?.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Please sign in to continue</p>

        {/* Username */}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <div className="input-wrapper">
            <User className="input-icon" size={20} />
            <input
              type="text"
              id="username"
              autoComplete="off"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <Lock className="input-icon" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="off"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button disabled={isPending} type="submit" className="login-btn">
          <LogIn size={20} className="btn-icon" />
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
