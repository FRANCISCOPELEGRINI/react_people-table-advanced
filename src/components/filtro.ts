import { Person } from '../types/Person';
const centuries = [16, 17, 18, 19, 20];

export const filtro = (var1: Person[], searchParams: URLSearchParams) => {
  let people: Person[] = [];
  let newTodo = [...var1];

  if (searchParams.get('centuries')) {
    centuries.forEach(r => {
      if (searchParams.getAll('centuries').includes(r.toString())) {
        people.push(...newTodo.filter(a => Math.ceil(a.born / 100) === r));
      }
    });
  }

  if (people.length > 0) {
    switch (searchParams.get('sex')) {
      case 'm':
        people = people.filter(r => r.sex === 'm');
        break;
      case 'f':
        people = people.filter(r => r.sex === 'f');
        break;
    }
  } else {
    switch (searchParams.get('sex')) {
      case 'm':
        newTodo = newTodo.filter(r => r.sex === 'm');
        break;
      case 'f':
        newTodo = newTodo.filter(r => r.sex === 'f');
        break;
    }
  }

  const query = searchParams.get('query');

  if (query) {
    people = people.filter(r =>
      r.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
    newTodo = newTodo.filter(r =>
      r.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }

  return [people, newTodo];
};
