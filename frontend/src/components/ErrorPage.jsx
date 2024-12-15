
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300 text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-700">Oops! Page not found.</p>
      <p className="p-4 text-orange-700 font-semibold"><i>please go back</i></p>
    </div>
  )
}

export default ErrorPage
