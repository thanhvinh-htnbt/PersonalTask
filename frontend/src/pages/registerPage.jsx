import RegisterForm from "../components/registerForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;