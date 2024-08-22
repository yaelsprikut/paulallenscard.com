"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import moment from "moment";
import { getTopHeadlines } from "./scripts/client";

const getTimeFromNow = (datestring: any) => {
  // Parse the date string using moment
  const targetTime = moment(datestring);

  // Get the current time
  const now = moment();

  // Calculate the difference in hours
  const hoursAgo = now.diff(targetTime, "hours");

  return hoursAgo + " hours ago";
};

export default function Home() {
  const [articles, setArticles] = useState(null) as any;
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const articleData = await getTopHeadlines("ca");
      console.log("articleData: ", articleData);
      articleData.articles.forEach((article: any) => {
        if (article.urlToImage) {
          const shortt = article.urlToImage;
          article.backupImage = article.urlToImage.includes("cloudfront")
            ? shortt
            : shortt;
        }
      });
      setArticles(articleData.articles);
    };
    fetchArticles();
  }, []);

  if (!articles) return <div>Loading...</div>;

  return (
    <main>
      <header className={styles.banner}>
        <h1>NEWS FEED</h1>
      </header>
      <ol className={styles.activityFeed}>
        {articles
          ? articles.map((article: any) => (
              <li
                className={styles.feedItem}
                data-content="&#xf00c;"
                data-time={getTimeFromNow(article.publishedAt)}
                data-color="green"
              >
                <section>
                  <label htmlFor="expand_1">
                    <a href={article.url}>{article.author}</a>
                  </label>
                  <main className="content">
                    <blockquote>
                      <a href={article.url}>
                        <b>{article.title}</b>
                      </a>
                    </blockquote>
                  </main>
                </section>
              </li>
            ))
          : "no object returned "}
      </ol>
    </main>
  );
}
