import Head from 'next/head'
import { useState } from 'react';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
	const [keyword, setKeyword] = useState("");
	const filterdCountries = countries.filter(_c =>
		_c.name.toLowerCase().includes(keyword) || _c.region.toLowerCase().includes(keyword)
		|| _c.subregion.toLowerCase().includes(keyword)
	);

	const onInputChange = (e) => {
		e.preventDefault()
		setKeyword(e.target.value.toLowerCase());
	}

	return <Layout>
		<div className={styles.counts}>
			Found {countries.length} countries
		</div>
		<SearchInput placeholder="Filter by name, region, subregion ..." onChange={onInputChange} />

		<CountriesTable countries={filterdCountries} />
	</Layout>
}

export const getServerSideProps = async () => {
	const res = await fetch("https://restcountries.eu/rest/v2/all");
	const countries = await res.json();

	return {
		props: {
			countries
		}
	}
}
