import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useState, useEffect } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [todoTable, setTodoTable] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [server, setServer] = useState(false);
  const [loader, setLoader] = useState(true);
  const [currentUlr, setCurrentUrl] = useState(false);
  const { name } = useParams();
  const getData = async () => {
    try {
      const newTodo: Person[] = await getPeople();

      if (newTodo.length === 0) {
        setServer(true);
      }

      setLoader(false);
      setTodoTable(newTodo);
    } catch (e) {
      setError(true);
      setLoader(false);
      // throw new Error('Erro do getData' + e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (!(todoTable.find(r => r.slug === name) || name === undefined)) {
      setCurrentUrl(true);
    } else {
      setCurrentUrl(false);
    }
  }, [name, todoTable]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {server && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {currentUlr && (
                <p>There are no people matching the current search criteria</p>
              )}
              {(!error || !server || !currentUlr) && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
