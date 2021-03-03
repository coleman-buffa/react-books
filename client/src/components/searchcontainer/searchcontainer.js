import React, { useState, useRef } from 'react';
import './searchcontainer.css';
import SearchCard from '../searchcard/searchcard'
import Searchbar from "../searchbar/searchbar";
import API from "../../utils/API";

function SearchContainer() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const inputRef = useRef("");

	// useEffect(() => {
	// 	getSearchResults(searchTerm);
	// }, [searchTerm])

	const getSearchResults = searchTerm => {
		API.searchBookName(searchTerm)
			.then(result => {
				setSearchResults(result);
			})
			.catch(err => console.log(err));
	}

	const handleInputSearch = e => {
		e.preventDefault();

		let str = inputRef.current.value;
		let replaced = str.split(' ').join('+');

		setSearchTerm(replaced);
		inputRef.current.value = "";
		getSearchResults(replaced);
	}

	const handleSaveButton = id => {
		//filter state for id
		let tempArr = searchResults.filter(book => book.id === id);
		console.log(tempArr);
		API.saveBook({
			title: tempArr[0].volumeInfo.title,
			authors: tempArr[0].volumeInfo.authors.toString(),
			description: tempArr[0].volumeInfo.description,
			image: tempArr[0].volumeInfo.imageLinks.thumbnail,
			link: tempArr[0].volumeInfo.infoLink
		})
			.then(result =>
				console.log(result)
			)
			.catch(err => console.log(err));

		setSearchResults([]);
	}



	return (
		<div>
			<div className="container is-widescreen">
				<div className="notification">
					<Searchbar
						inputRef={inputRef}
						value={searchTerm}
						handleInputSearch={handleInputSearch}
					/>
					<h1 className="resultsSearch">Results:</h1>
					{searchResults.map(book => (
						<SearchCard
							key={book.id}
							id={book.id}
							title={book.volumeInfo.title}
							authors={book.volumeInfo.authors}
							description={book.volumeInfo.description}
							image={book.volumeInfo.imageLinks.thumbnail}
							link={book.volumeInfo.infoLink}
							handleSaveButton={handleSaveButton}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SearchContainer;