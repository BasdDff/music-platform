import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ITrack} from "../../types/ITrack";


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
        })
    })
})