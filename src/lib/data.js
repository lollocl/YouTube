import { writable } from "svelte/store"
import { browser } from "$app/environment"

export const menuOpen = writable ( true )
export const login = writable ( false );
export const videoclick = writable ( true );
export const inputFocused = writable ( false );
export const searchQuery = writable ( "" );
export const nome = writable ( "" );
export const cognome = writable ( "" );
export const email = writable ( "" );
export const username = writable ( "" );
export const selectedIndex = writable ( -1 );
export const val = writable( 0 );
export const activeLinkIndex = writable ( 0 );
export const searchList = writable([])
export const like = writable ([]);
export const remove = writable ();
export const likedList = writable ([]);
export const accounts = writable ([]);
export const currentValueIndex = writable ();
export const comments = writable([]);
export const IsLike = writable ( false );
export const data = writable ([]);
export const users = writable ([]);

