type Info = {
  count: number,
  pages: number,
  next: string | null,
  prev: string | null,
}

type Character = {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: Location,
  location: Location,
  image: string,
  episode: string[],
  url: string,
  created: string,
} 

type CharactersData = {
  info: Info,
  results: Character[],
}


const response = await fetch("https://rickandmortyapi.com/api/character/?name=rick&status=alive");

const data: CharactersData = await response.json();

const rick = data.results.map(char => {
  return {
    name: char.name,
    status: char.status,
    episode: char.episode,
  };
});

let next = data.info.next;

while (next) {
  const response = await fetch("https://rickandmortyapi.com/api/character/?name=rick&status=alive");

  const data: CharactersData = await response.json();

  const allRicks = data.results.map(char => {
    return {
      name: char.name,
      status: char.status,
      episode: char.episode,
    };
  });
  rick.push(...allRicks);
  next = data.info.next;
  
}

console.log(rick);