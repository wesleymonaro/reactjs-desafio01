import React, { useState, useEffect } from 'react';
import api from './services/api.js';

import './styles.css';

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then((repositories) => {
      setRepos(repositories.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositório novo - ${Date.now()}`,
      link: 'http://google.com',
    });

    const repo = response.data;

    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const index = repos.findIndex((repo) => repo.id === id);

    let reposCopy = repos;

    reposCopy.splice(index, 1);

    setRepos([...reposCopy]);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
