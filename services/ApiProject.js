const APIProject = {
    async getProjects() {
        try {
          const response = await fetch('../data/projects.json');
          
          if(!response.ok)
            throw new Error(response.status);

          const data = await response.json();
          
          return data;
        }  
        catch(error) {
            console.error(error);
        }
    }
}


export default APIProject;