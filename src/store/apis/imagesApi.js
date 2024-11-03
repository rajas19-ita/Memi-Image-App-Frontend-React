import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const imagesApi = createApi({
    reducerPath: "images",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/images",
    }),
    endpoints(builder) {
        return {
            fetchImages: builder.query({
                providesTags: (result, error, args) => {
                    return [`page${args.page}`];
                },
                query: ({ user, page, pageSize, filters }) => {
                    return {
                        url: "/",
                        params: {
                            page,
                            pageSize,
                            ...(filters.title ? { title: filters.title } : {}),
                            sortBy: filters.sortBy,
                            order: filters.order,
                            ...(filters.tagId ? { tagId: filters.tagId } : {}),
                        },
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    };
                },
            }),
            addImage: builder.mutation({
                invalidatesTags: (result, error, args) => {
                    return ["page1"];
                },
                query: ({ user, formData }) => {
                    return {
                        url: "/add",
                        method: "post",
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                        body: formData,
                    };
                },
            }),
        };
    },
});

export const { useFetchImagesQuery, useAddImageMutation } = imagesApi;
export { imagesApi };
