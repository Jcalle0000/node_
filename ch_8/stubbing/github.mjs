// send request to a 3rd party service

export async function getGitHubUser(username){
    const response = await fetch(`https://api.github.com/users/${username}`);
    return response.json() ; 
}

