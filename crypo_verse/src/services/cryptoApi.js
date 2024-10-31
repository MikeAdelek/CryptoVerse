import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://coinranking1.p.rapidapi.com";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_CRYPTO_RAPIDAPI_KEY);
      headers.set(
        "X-RapidAPI-Host",
        import.meta.env.VITE_CRYPTO_RAPIDAPI_HOST
      );
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
      transformResponse: (response) => {
        return {
          stats: response.data.stats,
          coins: response.data.coins
        };
      }
    })
  })
});

export const { useGetCryptosQuery } = cryptoApi;
