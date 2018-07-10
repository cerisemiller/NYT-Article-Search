import axios from 'axios';
import filterParams from './filterParams';

export default {
    //get articles from NYT
    getArticles: function(params) {
        return axios.get('/api/nyt', { params: filterParams(params) });
    },

    // save article to our database
    saveArticle: function(articleData) {
        return axios.post('/api/articles', articleData);
    },
    
    getSavedArticles: function() {
        return axios.get('/api/articles');
    },

    deleteArticle: function(id) {
        return axios.delete('/api/articles' + id);
    }
};