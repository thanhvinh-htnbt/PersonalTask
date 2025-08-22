import LoginForm from "../components/loginForm";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="bg-red-500 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;