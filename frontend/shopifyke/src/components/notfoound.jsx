import  { useNavigate } from react-router-dom

export const NotFound = () => {
  
const navigate = useNavigate()

  return (
    <div className="erronous">
      <h2>ERROR OCCURRED</h2>
      <p>Page Not Found</p>
    </div>
  );
};
