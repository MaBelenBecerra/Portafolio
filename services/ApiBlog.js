const ApiBlog = {
    page: 0,

    async getNextBlogs(first = false) {
        const response = await fetch("/data/blogs.json");
        const data = await response.json();

        if(first)
            return data[0];

        if(this.page >= data.length){
            return null; 
        }

        const array = data[this.page];
        this.page  += 1;

        return array;
    },

    reset() {
        this.page = 0;
    }

    
}


export default ApiBlog;