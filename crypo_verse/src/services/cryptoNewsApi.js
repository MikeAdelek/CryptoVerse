import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://news-api14.p.rapidapi.com";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_CRYPTO_RAPIDAPI_KEY);
      headers.set("X-RapidAPI-Host", import.meta.env.VITE_NEWSAPI_HOST);
      return headers;
    }
  }),

  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ query = "cryptocurrency", count = 10 }) => ({
        url: "/v2/trendings",
        params: {
          topic: query,
          language: "en",
          limit: count
        }
      }),
      transformResponse: (response) => {
        console.log("Raw API Response:", response);

        if (!response || !response.success) {
          console.error("Invalid response received:", response);
          return [];
        }

        // Extract articles from the data array
        const articles = response.data || [];

        return articles.map((article) => ({
          title: article.title || "No title available",
          description:
            article.description ||
            article.content ||
            "No description available",
          url: article.link || "#",
          urlToImage: article.image || article.thumbnail,
          publishedAt: article.published_at || article.date,
          source: {
            name: article.source || "Unknown Source",
            image: null
          }
        }));
      },
      transformErrorResponse: (response) => {
        console.log("Error Response:", response);
        return {
          status: response.status,
          message:
            response.data?.message || "An error occurred while fetching news"
        };
      }
    })
  })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
