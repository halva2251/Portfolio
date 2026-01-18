import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Oops, this page doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
    );
};

export default NotFound;