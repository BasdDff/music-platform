import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IComment, ITrack} from "../../types/ITrack";

//https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering

export const trackAPI = createApi({
    reducerPath: "trackAPI",
    baseQuery: fetchBaseQuery({baseUrl: `http://localhost:5000`}),
    tagTypes: ["Track"],
    endpoints: (build) => ({
        fetchTracks: build.query<ITrack[], number>({
            query: (count: number = 10, offset: number = 0) => ({
                url: "/tracks",
                params: {
                    count: count,
                    offset: offset
                }
            }),
            providesTags: result => ["Track"]
        }),
        createTrack: build.mutation({
            query: (track) => ({
                url: "/tracks",
                method: "POST",
                body: track,
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }),
            invalidatesTags: ["Track"]
        }),
        addComment: build.mutation({
           query: (comment) => ({
               url: "/tracks/comment",
               method: "POST",
               body: comment,
               headers: {
                   accept: 'application/json',
                   Authorization: `Bearer ${localStorage.getItem('token')}`,
               }
           })
        }),
        deleteTrack: build.mutation({
            query: (track) => ({
                url: `/tracks/${track._id}`,
                method: "DELETE",
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }),
            invalidatesTags: ["Track"]
        }),
    })
})