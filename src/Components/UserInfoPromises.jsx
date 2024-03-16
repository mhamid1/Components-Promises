import React, { useState, useEffect } from 'react';

function fetchUserDetails(userID) {
    return fetch(`https://jsonplaceholder.typicode.com/comments/${userID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            return response.json();
        });
}

function fetchUserPosts(userID) {
    return fetch(`https://jsonplaceholder.typicode.com/comments?userId=${userID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user posts');
            }
            return response.json();
        });
}

function UserInfoPromises({UserID}) {
    const [userInfo, setUserInfo] = useState(null);
    const [userPosts, setUserPosts] = useState(null);

    useEffect(() => {

        fetchUserDetails(UserID)
            .then(userDetails => {
                setUserInfo(userDetails);
                return fetchUserPosts(UserID);
            })
            .then(posts => {
                setUserPosts(posts);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, [UserID]);

    return (
        <div>
            {userInfo && (
                <div>
                    <h2>User Name: {userInfo.name}</h2>
                    <p>User Email: {userInfo.email}</p>
                </div>
            )}
            {userPosts && (
                <p>Number of Posts: {userPosts.length}</p>
            )}
        </div>
    );
}

export default UserInfoPromises;
