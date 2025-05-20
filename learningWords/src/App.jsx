import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [words, setWords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWords = useCallback(() => {
    setLoading(true);
    setError(null);
    axios.post("/api/getWords.php")
      .then((response) => {
        if (response.data.valid) {
          setWords(response.data.words);
        } else {
          setError("Er ging iets fout bij het ophalen van de data. Probeer het later opnieuw. (" + response.data.error + ")");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Er ging iets fout bij het ophalen van de data. Probeer het later opnieuw.");
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getWords();
  }, [getWords]);

  if (loading) {
    return <div>Loading...</div>;  // Show a loading message while fetching
  }

  return (
    <React.Fragment>
      <div>
        <h1>Learning Words</h1>
        <h2>Woorden</h2>
        {error && <div className="error">{error}</div>}  {/* Display error if exists */}
        {words === null ? (
          <div>No words available</div>  // Show a fallback message if words is null
        ) : (
          <table className="results-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Translation</th>
              </tr>
            </thead>
            <tbody>
              {words.length > 0 ? (
                words.map((word) => (
                  <tr key={word.id}>
                    <td>{word.id}</td>
                    <td>{word.name}</td>
                    <td>{word.translation}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No words found</td> {/* Fallback if there are no words */}
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
