import { useState } from "react";
import CountriesTbales from "../components/CountriesTables";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );
  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className={styles.counts}>found {' '}{countries.length} countries</div>
      <SearchInput
        placeholder="Filter by name , Religon or SubReligon"
        onChange={onInputChange}
      />
      <CountriesTbales countries={filteredCountries} />
    </Layout>
  );
}
export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
