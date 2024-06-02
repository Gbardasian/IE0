import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";



function MyApp() {
	const [characters, setCharacters] = useState([]);
	
	function removeOneCharacter(index) {

		fetch( `http://localhost:8000/users/${characters[index].id}`, {method: 'DELETE'})
		.then((response) => {
			if(response.status === 204) {
			/*	const updated = characters.filter((character, i) => {
					return i !== index;
				  });
		  setCharacters(updated); 
		  alert('Error mom not found'); */
				setCharacters(characters.filter(character => character.id !== characters[index].id));
			} 
			else if (response.status === 404) {
				alert('Error ID not found');
			} 
			else {
				alert('Error which was uncounted for');
			}
		})
		    
		  }
	
		  function updateList(person) { 
			postUser(person)
			  .then(response => response.json())
			  .then(person => setCharacters([...characters, person]))
			  .catch((error) => {
				console.log(error);
			  })
		}
	function fetchUsers() {
		const promise = fetch("http://localhost:8000/users");
		return promise;
	}
	function postUser(person) {
		const promise = fetch("Http://localhost:8000/users", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(person),
		});
	
		return promise;
	  }


	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => { console.log(error); });
	  }, [] );

	return (
		  <div className="container">
		    <Table
		      characterData={characters}
		      removeCharacter={removeOneCharacter}
		    />
			<Form handleSubmit={updateList} />
		  </div>
		  );

}



/* return (
	  <div className="container">
	    <Table
	      characterData={characters}
	      removeCharacter={removeOneCharacter}
	    />
	  </div>
); */

export default MyApp;
