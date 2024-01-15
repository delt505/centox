import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data, mutate, error } = useSWR('/api/auth/user', fetcher);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !data) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !data?.user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && data?.user)
    ) {
        Router.push(redirectTo);
    }
  }, [data, redirectIfFound, redirectTo]);

  return { user: data?.user, mutate, isLoading: !error && !data, isError: error };
}