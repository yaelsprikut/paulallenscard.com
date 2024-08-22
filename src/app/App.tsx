"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Card from './components/Card';
import { getTopHeadlines } from './scripts/client';
import * as constants from './constants/dropdown-options';

// import styles from './Newsboard.module.css';  // Use CSS Modules

// Dynamically import the client-side script
dynamic(() => import('./scripts/dashboard'), { ssr: false });

const App = () => {
    const [articles, setArticles] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            const articleData = await getTopHeadlines('ca');
            console.log('articleData: ', articleData)
            articleData.articles.forEach((article: any) => {
                if (article.urlToImage) {
                    const shortt = article.urlToImage;
                    article.backupImage = article.urlToImage.includes('cloudfront')
                        ? shortt
                        : shortt;
                }
            });
            setArticles(articleData.articles);
        };
        fetchArticles();
    }, []);

    const change = async (e: any) => {
        const articleData = await getTopHeadlines(e.target.value);
        articleData.articles.forEach((article: any) => {
            if (article.urlToImage) {
                const shortt = article.urlToImage;
                article.backupImage = article.urlToImage.includes('cloudfront')
                    ? shortt
                    : shortt;
            }
        });
        setArticles(articleData.articles);
    };

    const getCountryName = (countryCode: any[]) => {
        return constants.isoCountries[countryCode] || countryCode;
    };

    const dropdownCountry = () => (
        <select
            name="pets"
            id="pet-select"
            onChange={change}
        >
            <option value="">--Please choose an option--</option>
            {constants.COUNTRIES.map((code: any) => (
                <option value={code} key={code}>{getCountryName(code)}</option>
            ))}
        </select>
    );

    if (!articles) return <div>Loading...</div>;

    return (
        <>
            <div>
                <br />
                <label>Choose a country:&nbsp;</label>
                {dropdownCountry()}
            </div>
            <div className={`dashboard display-animation`} style={{ margin: '0 auto', width: '1130px' }}>
                {articles.map((article: any, i: any) => (
                    <Card
                        key={i}
                        color={constants.COLOUR_ARRAY[i % constants.COLOUR_ARRAY.length]}
                        headline={article.title}
                        img={article.urlToImage || article.backupImage}
                        url={article.url}
                        source={article.author}
                    />
                ))}
            </div>
        </>
    );
};

export default App;
